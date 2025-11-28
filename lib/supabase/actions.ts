import { createClient } from './client';
import { Action } from '@/components/shared/ActionsList';
import { getStartOfTodayInTimezone } from '@/lib/date';

const supabase = createClient();

export interface ActionNode extends Action {
  completed_at?: string; // ISO timestamp
  children?: ActionNode[];
}

/**
 * Fetches the entire action tree for the specified user.
 * Applies "Next Day Clearing" logic based on the user's timezone.
 */
async function _fetchActions(userId: string, userTimezone: string = 'UTC'): Promise<ActionNode[]> {
  const { data, error } = await supabase
    .from('actions')
    .select('data')
    .eq('user_id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
        // No row found, return empty array (new user)
        return [];
    }
    console.error("Supabase Fetch Error:", JSON.stringify(error, null, 2));
    throw error;
  }

  const rawTree = (data?.data as ActionNode[]) || [];
  return applyNextDayClearing(rawTree, userTimezone);
}

/**
 * Updates the entire action tree for the specified user.
 */
async function _updateActions(userId: string, newTree: ActionNode[]): Promise<void> {
  const { error } = await supabase
    .from('actions')
    .upsert({ 
        user_id: userId, 
        data: newTree 
    }, { onConflict: 'user_id' });

  if (error) throw error;
}

// --- Helper Logic for Next Day Clearing ---

function applyNextDayClearing(nodes: ActionNode[], timezone: string): ActionNode[] {
  const startOfToday = getStartOfTodayInTimezone(timezone);
  return filterNodes(nodes, startOfToday);
}

function filterNodes(nodes: ActionNode[], startOfToday: number): ActionNode[] {
  const filtered: ActionNode[] = [];

  for (const node of nodes) {
    const filteredChildren = node.children ? filterNodes(node.children, startOfToday) : [];
    const hasVisibleChildren = filteredChildren.length > 0;

    let shouldClear = false;
    if (node.completed && node.completed_at) {
      const completedTime = new Date(node.completed_at).getTime();
      if (completedTime < startOfToday) {
        shouldClear = true;
      }
    }
    
    if (!shouldClear || hasVisibleChildren) {
      filtered.push({
        ...node,
        children: filteredChildren
      });
    }
  }

  return filtered;
}

export const fetchActions = _fetchActions;
export const updateActions = _updateActions;
