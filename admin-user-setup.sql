
-- Create admin user (run this in Supabase SQL editor)
-- Replace 'your-admin-email@example.com' and 'your-secure-password' with your actual credentials

INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@example.com', -- Change this to your admin email
  crypt('AdminPassword123!', gen_salt('bf')), -- Change this to your secure password
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"role":"admin"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Create a profile for admin user (optional)
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  (SELECT id FROM auth.users WHERE email = 'admin@example.com'),
  format('{"sub":"%s","email":"%s"}', (SELECT id FROM auth.users WHERE email = 'admin@example.com'), 'admin@example.com')::jsonb,
  'email',
  NOW(),
  NOW(),
  NOW()
);
