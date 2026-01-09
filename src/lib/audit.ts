import { SupabaseClient } from '@supabase/supabase-js'

export type AuditAction = 'CREATE_EVENT' | 'JOIN_EVENT' | 'SHUFFLE' | 'KICK' | 'RESEND' | 'CLOSE' | 'UPDATE_WISHLIST'

interface AuditEntry {
  eventId: string
  action: AuditAction
  actorId?: string
  actorEmail?: string
  metadata?: Record<string, unknown>
}

export async function logAudit(supabase: SupabaseClient, entry: AuditEntry) {
  try {
    const { error } = await supabase.from('audit_logs').insert({
        event_id: entry.eventId,
        action: entry.action,
        actor_id: entry.actorId || null,
        actor_email: entry.actorEmail || null,
        metadata: entry.metadata || {},
    })
    
    if (error) {
        console.error('Failed to write audit log:', error)
    }
  } catch (e) {
    console.error('Audit Log Exception:', e)
  }
}
