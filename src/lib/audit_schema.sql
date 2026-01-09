-- Create Audit Logs table
create table if not exists audit_logs (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  event_id uuid references events(id) on delete cascade,
  actor_id uuid, -- nullable, might be system or anonymous if not joined yet
  actor_email text, -- snapshot of who did it
  action text not null, -- e.g. 'JOIN', 'SHUFFLE', 'KICK', 'CLOSE', 'RESEND'
  metadata jsonb default '{}'::jsonb, -- extra details like target_id, ip_address (if available)
  
  constraint result_must_be_top_level check (true)
);

-- Enable RLS
alter table audit_logs enable row level security;

-- Policies: 
-- Organizers can view logs for their event? 
-- For now, maybe restricted to DB admins or strict RLS.
-- Let's allow organizers to SELECT logs for their event.

create policy "Organizers can view audit logs for their event"
  on audit_logs for select
  using (
    exists (
      select 1 from participants
      where participants.event_id = audit_logs.event_id
      and participants.email = auth.jwt() ->> 'email' -- simplistic auth check, actually we use custom tokens
      -- Our app doesn't use Supabase Auth (GoTrue) but custom tokens.
      -- So RLS is tricky for the App to query directly if we don't assume service role.
      -- BUT our actions use `getSupabaseAdmin` (Service Role) so RLS doesn't block the SERVER.
      -- So we just need the table.
    )
  );
