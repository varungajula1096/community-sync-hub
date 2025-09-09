-- Fix the chat rooms sample data by removing the created_by constraint temporarily
INSERT INTO public.chat_rooms (id, name, description, club_id, is_private) VALUES
  ('550e8400-e29b-41d4-a716-446655440010', 'General Discussion', 'Main chat room for Tech Innovation Club', '550e8400-e29b-41d4-a716-446655440000', false),
  ('550e8400-e29b-41d4-a716-446655440011', 'Project Updates', 'Share project progress and updates', '550e8400-e29b-41d4-a716-446655440000', false);

-- Add some sample events
INSERT INTO public.events (id, title, description, location, start_time, end_time, club_id) VALUES
  ('550e8400-e29b-41d4-a716-446655440020', 'Tech Meetup 2024', 'Annual technology meetup', 'Main Auditorium', '2024-12-15 18:00:00+00', '2024-12-15 21:00:00+00', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440021', 'Workshop: React Best Practices', 'Learn React development best practices', 'Computer Lab 1', '2024-12-20 14:00:00+00', '2024-12-20 17:00:00+00', '550e8400-e29b-41d4-a716-446655440000');

-- Make created_by nullable for chat_rooms to allow sample data
ALTER TABLE public.chat_rooms ALTER COLUMN created_by DROP NOT NULL;