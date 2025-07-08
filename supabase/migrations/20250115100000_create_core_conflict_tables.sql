/*
  # Create Core Conflict Tables & Logic

  This migration sets up the foundational tables for managing conflicts,
  their members, and invitations. It also includes a secure remote
  procedure call (RPC) to handle the creation of a new conflict and
  the invitation of the second party in a single, atomic transaction.

  1.  **New Tables**:
      - `conflicts`: Stores the core details of each conflict.
      - `conflict_members`: Links users to conflicts they are part of.
      - `conflict_invitations`: Manages invitations for users to join conflicts.

  2.  **Types**:
      - `conflict_status_enum`: 'pending', 'active', 'resolved', 'archived'.
      - `member_role_enum`: 'initiator', 'participant', 'arbiter'.
      - `invitation_status_enum`: 'pending', 'accepted', 'declined'.

  3.  **Security**:
      - Row Level Security (RLS) is enabled on all new tables.
      - Policies are added to ensure users can only access and manage data they are authorized to see.
      - A `user_is_member_of_conflict` helper function is created for reusable security logic.

  4.  **RPC Function**:
      - `create_conflict_and_invite`: A security-definer function that:
        1. Creates a new conflict.
        2. Adds the creator as the 'initiator' in `conflict_members`.
        3. Creates an invitation for the second party in `conflict_invitations`.
*/

-- Create custom types (enums) for status and roles
CREATE TYPE public.conflict_status_enum AS ENUM ('pending', 'active', 'resolved', 'archived');
CREATE TYPE public.member_role_enum AS ENUM ('initiator', 'participant', 'arbiter');
CREATE TYPE public.invitation_status_enum AS ENUM ('pending', 'accepted', 'declined');

-- Table: conflicts
CREATE TABLE IF NOT EXISTS public.conflicts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    title text NOT NULL CHECK (char_length(title) > 0),
    description text,
    status public.conflict_status_enum NOT NULL DEFAULT 'pending',
    arbiter_type public.arbiter_type NOT NULL DEFAULT 'ai',
    created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);
COMMENT ON TABLE public.conflicts IS 'Stores the core details of each conflict.';

-- Table: conflict_members
CREATE TABLE IF NOT EXISTS public.conflict_members (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamptz NOT NULL DEFAULT now(),
    conflict_id uuid NOT NULL REFERENCES public.conflicts(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role public.member_role_enum NOT NULL,
    UNIQUE(conflict_id, user_id)
);
COMMENT ON TABLE public.conflict_members IS 'Links users to the conflicts they are a part of.';

-- Table: conflict_invitations
CREATE TABLE IF NOT EXISTS public.conflict_invitations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamptz NOT NULL DEFAULT now(),
    conflict_id uuid NOT NULL REFERENCES public.conflicts(id) ON DELETE CASCADE,
    invited_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    invitee_email text NOT NULL,
    status public.invitation_status_enum NOT NULL DEFAULT 'pending',
    token text UNIQUE NOT NULL DEFAULT extensions.uuid_generate_v4()::text
);
COMMENT ON TABLE public.conflict_invitations IS 'Manages invitations for users to join conflicts.';

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_conflicts_created_by ON public.conflicts(created_by);
CREATE INDEX IF NOT EXISTS idx_conflict_members_user_id ON public.conflict_members(user_id);
CREATE INDEX IF NOT EXISTS idx_conflict_members_conflict_id ON public.conflict_members(conflict_id);
CREATE INDEX IF NOT EXISTS idx_conflict_invitations_invitee_email ON public.conflict_invitations(invitee_email);

-- RLS Policies
ALTER TABLE public.conflicts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conflict_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conflict_invitations ENABLE ROW LEVEL SECURITY;

-- Helper function to check if a user is a member of a conflict
CREATE OR REPLACE FUNCTION public.user_is_member_of_conflict(p_conflict_id uuid, p_user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.conflict_members
    WHERE conflict_id = p_conflict_id AND user_id = p_user_id
  );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Policies for `conflicts`
CREATE POLICY "Allow authenticated users to create conflicts" ON public.conflicts
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow members to view their conflicts" ON public.conflicts
  FOR SELECT TO authenticated USING (public.user_is_member_of_conflict(id, auth.uid()));

CREATE POLICY "Allow creator to update conflict before it is active" ON public.conflicts
  FOR UPDATE TO authenticated USING (created_by = auth.uid() AND status = 'pending');

-- Policies for `conflict_members`
CREATE POLICY "Allow members to see their own membership" ON public.conflict_members
  FOR SELECT TO authenticated USING (user_id = auth.uid());

-- Policies for `conflict_invitations`
CREATE POLICY "Allow involved users to see invitations" ON public.conflict_invitations
  FOR SELECT TO authenticated USING (invited_by = auth.uid() OR invitee_email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- RPC to create a conflict and invite a member
CREATE OR REPLACE FUNCTION public.create_conflict_and_invite(
    p_title text,
    p_description text,
    p_invitee_email text
)
RETURNS uuid AS $$
DECLARE
    new_conflict_id uuid;
    current_user_id uuid := auth.uid();
    current_user_email text;
BEGIN
    -- Get current user's email
    SELECT u.email INTO current_user_email FROM auth.users u WHERE u.id = current_user_id;

    -- Ensure user is not inviting themselves
    IF p_invitee_email = current_user_email THEN
        RAISE EXCEPTION 'You cannot invite yourself to a conflict.';
    END IF;

    -- Insert into conflicts table
    INSERT INTO public.conflicts (title, description, created_by)
    VALUES (p_title, p_description, current_user_id)
    RETURNING id INTO new_conflict_id;

    -- Insert the creator as the 'initiator'
    INSERT INTO public.conflict_members (conflict_id, user_id, role)
    VALUES (new_conflict_id, current_user_id, 'initiator');

    -- Insert an invitation for the other party
    INSERT INTO public.conflict_invitations (conflict_id, invited_by, invitee_email)
    VALUES (new_conflict_id, current_user_id, p_invitee_email);

    RETURN new_conflict_id;
END;
$$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;