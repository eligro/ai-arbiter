import { supabase } from '../lib/supabaseClient';
import { Conflict } from '../types/database';

type ConflictCreationPayload = {
  title: string;
  description: string;
  inviteeEmail: string;
};

export const conflictsApi = {
  async createConflictAndInvite(payload: ConflictCreationPayload): Promise<string> {
    const { data, error } = await supabase.rpc('create_conflict_and_invite', {
      p_title: payload.title,
      p_description: payload.description,
      p_invitee_email: payload.inviteeEmail,
    });

    if (error) {
      // Provide a more user-friendly error message
      if (error.message.includes('You cannot invite yourself')) {
        throw new Error('You cannot invite yourself to a conflict.');
      }
      throw new Error(`Failed to create conflict: ${error.message}`);
    }
    return data;
  },

  async getConflictById(id: string): Promise<Conflict | null> {
    const { data, error } = await supabase
      .from('conflicts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching conflict by ID:', error);
      return null;
    }
    return data;
  },

  async getConflictsForUser(): Promise<Conflict[]> {
    // RLS policy `Allow members to view their conflicts` handles security.
    // We can just query the conflicts table directly.
    const { data, error } = await supabase
      .from('conflicts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user conflicts:', error);
      throw error;
    }
    return data || [];
  },
};
