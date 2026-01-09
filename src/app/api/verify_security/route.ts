
import { NextResponse } from 'next/server'
import { joinEvent, getEventData } from '@/app/actions'
import { signToken } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function GET() {
  const logs: string[] = []
  const log = (msg: string) => logs.push(msg)

  try {
    log('Starting Security Verification...')
    
    // Setup Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // 1. Setup Data
    const joinCode = 'TEST' + Math.floor(Math.random() * 1000)
    const creatorEmail = 'test-creator@example.com'
    const participantEmail = 'test-joiner@example.com'
    const participantName = 'Joiner'

    // Create Event
    const { data: event, error: eErr } = await supabase.from('events').insert({
        name: 'Security Test Event',
        join_code: joinCode,
        creator_email: creatorEmail,
        status: 'DRAFT'
    }).select().single()
    
    if (eErr || !event) throw new Error('Setup failed: ' + eErr?.message)
    log(`Bypassed createEvent, created DB Event directly: ${event.id} (Code: ${joinCode})`)

    // Add Participant
    await supabase.from('participants').insert({
        event_id: event.id,
        name: participantName,
        email: participantEmail,
        is_organizer: false
    })
    log('Added participant to DB')

    // 2. Test joinEvent (Success Case)
    log('Testing joinEvent (valid)...')
    const joinResult = await joinEvent(joinCode, participantName, participantEmail)
    if (joinResult.success) {
        log('✅ joinEvent Success')
    } else {
        log('❌ joinEvent Failed: ' + JSON.stringify(joinResult))
    }

    // 3. Test joinEvent (Fail: Wrong Name)
    log('Testing joinEvent (Invalid Name)...')
    try {
        await joinEvent(joinCode, 'WrongName', participantEmail)
        log('❌ joinEvent should have failed but passed')
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : 'Unknown error'
        log('✅ joinEvent correctly failed for name mismatch: ' + msg)
    }

    // 4. Test Token Verification (mocking the email link click)
    log('Testing Token Verification...')
    const eventId = event.id
    // We need the participant ID
    const { data: p } = await supabase.from('participants').select('id').match({email: participantEmail, event_id: eventId}).single()
    if (!p) throw new Error('Participant not found for token test')
    
    const validToken = await signToken({
        eventId: event.id,
        participantId: p.id,
        email: participantEmail,
        role: 'participant'
    })
    
    const data = await getEventData(event.id, validToken)
    if (data && data.participant.id === p.id) {
        log('✅ getEventData success with valid token')
    } else {
        log('❌ getEventData failed with valid token')
    }

    // 5. Test Invalid Token
    const invalidToken = await signToken({
        eventId: 'wrong-event-id', // tampering
        participantId: p.id,
        email: participantEmail,
        role: 'participant'
    })
    
    const badData = await getEventData(event.id, invalidToken)
    if (badData === null) {
        log('✅ getEventData rejected invalid eventId in token')
    } else {
        log('❌ getEventData accepted invalid token')
    }

    return NextResponse.json({ success: true, logs })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ success: false, logs, error: msg }, { status: 500 })
  }
}
