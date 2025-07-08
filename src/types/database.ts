// Enums to be used in the frontend, mirroring the database types
export type ConflictStatus = 'pending' | 'active' | 'resolved' | 'archived';
export type MemberRole = 'initiator' | 'participant' | 'arbiter';
export type ArbiterType = 'human' | 'ai';
export type InvitationStatus = 'pending' | 'accepted' | 'declined';

// Interface for the `conflicts` table
export interface Conflict {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string | null;
  status: ConflictStatus;
  arbiter_type: ArbiterType;
  created_by: string | null;
}

// Interface for the `conflict_members` table
export interface ConflictMember {
  id: string;
  created_at: string;
  conflict_id: string;
  user_id: string;
  role: MemberRole;
}

// Interface for the `conflict_invitations` table
export interface ConflictInvitation {
  id: string;
  created_at: string;
  conflict_id: string;
  invited_by: string;
  invitee_email: string;
  status: InvitationStatus;
  token: string;
}

// The following types remain for future tasks
export interface Input {
  id: string;
  conflict_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export interface Question {
  id: string;
  conflict_id: string;
  question_text: string;
  created_at: string;
}

export interface Decision {
  id: string;
  conflict_id: string;
  decision_text: string;
  is_final: boolean;
  created_at: string;
}
