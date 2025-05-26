/*
  # Create contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `subject` (text) 
      - `message` (text)
      - `created_at` (timestamp with timezone)

  2. Security
    - Enable RLS
    - Add policy for inserting new submissions
    - Add policy for admin to read submissions
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow new submissions to be created
CREATE POLICY "Allow anonymous submissions" ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow admin to read submissions
CREATE POLICY "Allow admin to read submissions" ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (auth.role() = 'admin');