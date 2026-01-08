-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Events Table
create table events (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  join_code text unique,
  date date,
  budget text,
  creator_email text not null,
  status text default 'DRAFT' check (status in ('DRAFT', 'ACTIVE', 'COMPLETED', 'ARCHIVED')),
  settings jsonb default '{}'::jsonb
);

-- Participants Table
create table participants (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid references events(id) on delete cascade not null,
  name text not null,
  email text not null,
  magic_token uuid default uuid_generate_v4() not null,
  assigned_participant_id uuid references participants(id),
  wishlist text,
  status text default 'INVITED',
  is_organizer boolean default false
);

-- Security Note:
-- The 'assigned_participant_id' column contains sensitive information (who has whom).
-- Standard RLS should PREVENT public/anon access to this column.
-- We will use Server Actions with Service Role to manage assignments securely.

-- Indexes
create index idx_participants_event_id on participants(event_id);
create index idx_participants_magic_token on participants(magic_token);
