-- Create a function to atomically update participants and event status
create or replace function perform_shuffle(
  p_event_id uuid,
  p_assignments jsonb
) returns void as $$
declare
  item jsonb;
begin
  -- Lock the event row to prevent concurrent shuffles
  perform id from events where id = p_event_id for update;

  -- Check if event is already completed or locked? (Optional)
  
  -- Update Event Status
  update events set status = 'ACTIVE' where id = p_event_id;

  -- Update Participants
  -- Iterating over JSONB array
  for item in select * from jsonb_array_elements(p_assignments)
  loop
    update participants
    set 
      assigned_participant_id = (item->>'assigned_id')::uuid,
      status = 'JOINED'
    where id = (item->>'id')::uuid and event_id = p_event_id;
  end loop;
end;
$$ language plpgsql security definer;
