export interface Participant {
  id?: string
  event_id?: string
  name: string
  email: string
  magic_token?: string
  assigned_participant_id?: string
  wishlist?: string
  status?: 'INVITED' | 'JOINED' | 'VIEWED'
  is_organizer?: boolean
}

export interface Event {
  id: string
  created_at: string
  name: string
  join_code?: string
  date: string | null
  budget: string | null
  creator_email: string
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'ARCHIVED'
  settings: Record<string, unknown>
  participants?: Participant[]
}
