/*
  # Initial Schema Setup for Blue Collar Connect

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `full_name` (text)
      - `role` (text, either 'provider' or 'customer')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `providers`
      - `id` (uuid, primary key, references profiles)
      - `service_type` (text)
      - `location` (text)
      - `phone` (text)
      - `description` (text)
      - `availability` (text)
      - `image_url` (text)
      - `rating` (numeric)
      - `review_count` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users,
  full_name text,
  role text CHECK (role IN ('provider', 'customer')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create providers table
CREATE TABLE providers (
  id uuid PRIMARY KEY REFERENCES profiles,
  service_type text NOT NULL,
  location text NOT NULL,
  phone text,
  description text,
  availability text,
  image_url text,
  rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Providers policies
CREATE POLICY "Anyone can read provider profiles"
  ON providers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Providers can update their own profile"
  ON providers
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Providers can insert their own profile"
  ON providers
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);