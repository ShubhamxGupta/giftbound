'use server'

import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { signToken, verifyToken } from '@/lib/auth'
import { sendMagicLink } from '@/lib/email'
import { logAudit } from '@/lib/audit'
import { deriveDerangement } from '@/lib/shuffle'
import { log } from '@/lib/logger'

// Initialize Supabase Admin Client for Server Actions
// Initialize Supabase Admin Client for Server Actions
function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase Environment Variables. Check .env.local')
  }
  return createClient(supabaseUrl, supabaseServiceKey)
}

export async function kickParticipant(token: string, participantId: string) {
  const supabaseAdmin = getSupabaseAdmin()
  const payload = await verifyToken(token)
  
  if (!payload || payload.role !== 'organizer') throw new Error('Unauthorized')

  // Cannot kick self
  if (payload.participantId === participantId) throw new Error('Cannot kick yourself')

  // Prevent kicking if event is ACTIVE (shuffled) to avoid breaking chain?
  // Or allow it but warn? For simplicity, we block it if shuffled, as it breaks the cycle.
  const { data: event } = await supabaseAdmin.from('events').select('status').eq('id', payload.eventId).single()
  if (event?.status !== 'DRAFT') throw new Error('Cannot kick after shuffle. Reset event first.')

  await supabaseAdmin.from('participants').delete().eq('id', participantId).eq('event_id', payload.eventId)

  await logAudit(supabaseAdmin, {
    eventId: payload.eventId,
    action: 'KICK',
    actorId: payload.participantId,
    actorEmail: payload.email,
    metadata: { kicked_id: participantId }
  })
  
  revalidatePath(`/event/${payload.eventId}`)
  return { success: true }
}

export async function resendInvite(token: string, participantId: string) {
  const supabaseAdmin = getSupabaseAdmin()
  const payload = await verifyToken(token)
  
  if (!payload || payload.role !== 'organizer') throw new Error('Unauthorized')
  
  const { data: participant } = await supabaseAdmin
    .from('participants')
    .select('*, events(name)')
    .eq('id', participantId)
    .single()
    
  if (!participant) throw new Error('Participant not found')

  const eventName = (participant.events as unknown as { name: string }).name
  
  // Generate new token or reuse? 
  // Let's generate a fresh one to be safe/extend expiry.
  const newToken = await signToken({
    eventId: payload.eventId,
    participantId: participant.id,
    email: participant.email,
    role: participant.is_organizer ? 'organizer' : 'participant'
  })

  // Send Email
  const magicLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/event/${payload.eventId}?token=${newToken}`
  await sendMagicLink(participant.email, magicLink, eventName)

  await logAudit(supabaseAdmin, {
    eventId: payload.eventId,
    action: 'RESEND',
    actorId: payload.participantId,
    actorEmail: payload.email,
    metadata: { target_id: participantId }
  })
  
  return { success: true }
}

export async function closeEvent(token: string) {
  const supabaseAdmin = getSupabaseAdmin()
  const payload = await verifyToken(token)
  
  if (!payload || payload.role !== 'organizer') throw new Error('Unauthorized')

  await supabaseAdmin
    .from('events')
    .update({ status: 'COMPLETED' })
    .eq('id', payload.eventId)

  await logAudit(supabaseAdmin, {
    eventId: payload.eventId,
    action: 'CLOSE',
    actorId: payload.participantId,
    actorEmail: payload.email
  })

  revalidatePath(`/event/${payload.eventId}`)
  return { success: true }
}


export async function createEvent(formData: {
  name: string
  date: string
  budget: string
  participants: { name: string; email: string }[]
}) {
  const supabaseAdmin = getSupabaseAdmin()
  const creator = formData.participants[0]
  
  const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase()

  // 1. Create Event
  const { data: event, error: eventError } = await supabaseAdmin
    .from('events')
    .insert({
      name: formData.name,
      join_code: joinCode,
      date: formData.date || null,
      budget: formData.budget || null,
      creator_email: creator.email,
      status: 'DRAFT'
    })
    .select()
    .single()

  if (eventError || !event) {
    log.error('Error creating event', { error: eventError })
    throw new Error('Failed to create event')
  }

  // Audit Log
  await logAudit(supabaseAdmin, {
    eventId: event.id,
    action: 'CREATE_EVENT',
    actorEmail: creator.email,
    metadata: { name: event.name }
  })

  // 2. Add Participants
  const participantsData = formData.participants.map((p, index) => ({
    event_id: event.id,
    name: p.name,
    email: p.email,
    is_organizer: index === 0,
    status: index === 0 ? 'JOINED' : 'INVITED'
  }))

  const { data: participants, error: partError } = await supabaseAdmin
    .from('participants')
    .insert(participantsData)
    .select()

  if (partError) {
    log.error('Error adding participants', { error: partError })
    throw new Error('Failed to add participants')
  }

  // 3. Generate Trusted Token for Creator
  const creatorParticipant = participants.find(p => p.is_organizer)
  if (!creatorParticipant) throw new Error('Creator not found')

  const token = await signToken({
    eventId: event.id,
    participantId: creatorParticipant.id,
    email: creatorParticipant.email,
    role: 'organizer'
  })

  // 4. Redirect
  redirect(`/event/${event.id}?token=${token}`)
}

export async function joinEvent(joinCode: string, name: string, email: string) {
  const supabaseAdmin = getSupabaseAdmin()

  // ARTIFICIAL DELAY to prevent enumeration
  await new Promise(resolve => setTimeout(resolve, 500))

  // 1. Find Event
  const { data: event } = await supabaseAdmin
    .from('events')
    .select('id, name')
    .eq('join_code', joinCode.toUpperCase())
    .single()

  if (!event) throw new Error('Invalid Room Code')
  
  // 2. Lookup existing participant
  const { data: participant } = await supabaseAdmin
    .from('participants')
    .select('*')
    .eq('event_id', event.id)
    .eq('email', email)
    .single()

  if (!participant) {
    // Return generic success logic or throw to prevent enumeration?
    // Plan said: "Add email ownership verification"
    throw new Error('Access Denied. Check your details.') 
  }

  // 3. Name Check (Strict)
  if (participant.name.toLowerCase().trim() !== name.toLowerCase().trim()) {
      throw new Error('Access Denied. Details do not match.')
  }

  // Generate Token and Send Email
  // ... existing code ...

  // Audit Log (Before verify/send)
  await logAudit(supabaseAdmin, {
    eventId: event.id,
    action: 'JOIN_EVENT',
    actorEmail: email,
    metadata: { name: name }
  })

  // 4. Generate Magic Link with JWT
  const token = await signToken({
    eventId: event.id,
    participantId: participant.id,
    email: participant.email,
    role: participant.is_organizer ? 'organizer' : 'participant'
  })

  // 5. Send Email
  const magicLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/event/${event.id}?token=${token}`
  await sendMagicLink(email, magicLink, event.name)

  return { success: true, message: 'Check your email for the magic link!' }
}

export async function getEventData(eventId: string, token: string) {
  const supabaseAdmin = getSupabaseAdmin()

  // 1. Verify JWT
  const payload = await verifyToken(token)
  if (!payload || payload.eventId !== eventId) {
    return null // Unauthorized
  }

  // 2. Verify Participant Exists in DB (Security: Check consistency)
  const { data: participant } = await supabaseAdmin
    .from('participants')
    .select('*')
    .eq('id', payload.participantId)
    .single()

  if (!participant) return null

  // 3. Get Event
  const { data: event } = await supabaseAdmin
    .from('events')
    .select('*')
    .eq('id', eventId)
    .single()
    
  if (!event) return null
    
  // 4. Get Assignment (if exists)
  let assignment = null
  if (participant.assigned_participant_id) {
    const { data: target } = await supabaseAdmin
      .from('participants')
      .select('name, wishlist')
      .eq('id', participant.assigned_participant_id)
      .single()
    assignment = target
  }

  // 5. Get all participants
  const { data: allParticipants } = await supabaseAdmin
    .from('participants')
    .select('id, name, status, is_organizer') // Exclude sensitive info
    .eq('event_id', eventId)

  return { event, participant, assignment, allParticipants }
}

export async function shuffleEvent(eventId: string, token: string) {
  const supabaseAdmin = getSupabaseAdmin()
  
  // 1. Verify Auth & Role
  const payload = await verifyToken(token)
  if (!payload || payload.role !== 'organizer' || payload.eventId !== eventId) {
    throw new Error('Unauthorized')
  }

  // Check Event Status (Prevent Reshuffle)
  const { data: event } = await supabaseAdmin.from('events').select('status').eq('id', eventId).single()
  if (event?.status === 'ACTIVE' || event?.status === 'COMPLETED') {
    throw new Error('Event already shuffled! Contact support to reset.')
  }

  const { data: participants } = await supabaseAdmin
    .from('participants')
    .select('id')
    .eq('event_id', eventId)

  if (!participants || participants.length < 2) {
    throw new Error('Need at least 2 participants to shuffle')
  }


  const ids = participants.map(p => p.id)
  
  // 2. Derangement Shuffle
  const shuffled = deriveDerangement(ids)

  // 3. Update DB (Atomic RPC)
  const assignments = ids.map((id, index) => ({
    id: id,
    assigned_id: shuffled[index]
  }))

  const { error } = await supabaseAdmin.rpc('perform_shuffle', {
    p_event_id: eventId,
    p_assignments: assignments
  })

  if (error) {
    log.error('RPC Shuffle failed, falling back to batch update', { error })
    // Fallback if RPC not exists
    await Promise.all(ids.map((id, index) => 
       supabaseAdmin.from('participants').update({
          assigned_participant_id: shuffled[index]
       }).eq('id', id)
    ))
    await supabaseAdmin.from('events').update({ status: 'ACTIVE' }).eq('id', eventId)
  }
  
  await logAudit(supabaseAdmin, {
    eventId: eventId,
    action: 'SHUFFLE',
    actorId: payload.participantId,
    actorEmail: payload.email
  })

  revalidatePath(`/event/${eventId}`)
  return { success: true }
}

export async function updateWishlist(token: string, wishlist: string) {
  const supabaseAdmin = getSupabaseAdmin()
  
  const payload = await verifyToken(token)
  if (!payload) throw new Error('Invalid token')

  await supabaseAdmin
    .from('participants')
    .update({ wishlist })
    .eq('id', payload.participantId)

  revalidatePath(`/event/${payload.eventId}`)
  return { success: true }
}

export async function checkUpdates(token: string, currentAssignmentId: string | null, currentStatus: string) {
  const supabaseAdmin = getSupabaseAdmin()
  
  const payload = await verifyToken(token)
  if (!payload) return { changed: false }
  
  const { data: p } = await supabaseAdmin
    .from('participants')
    .select('assigned_participant_id, events(status)')
    .eq('id', payload.participantId)
    .single()
    
  if (!p) return { changed: false }
  
  const newStatus = (p.events as unknown as { status: string }).status
  const newAssignmentId = p.assigned_participant_id
  
  const statusChanged = newStatus !== currentStatus
  const assignmentChanged = newAssignmentId !== currentAssignmentId
  
  return { 
    changed: statusChanged || assignmentChanged,
    status: newStatus
  }
}
