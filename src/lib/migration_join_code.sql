-- Add join_code to events
alter table events add column join_code text unique;

-- Index for fast lookup
create index idx_events_join_code on events(join_code);

-- Policy update (if needed): Ensure join_code is readable if we need to valid it? 
-- Actually, our server action uses Service Role, so RLS doesn't block the backend check.
