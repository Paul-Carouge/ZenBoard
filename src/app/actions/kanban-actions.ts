'use server'

import { pb } from '@/lib/pb'
import { TTask, TColumn, TBoard } from '@/types/kanban'
import { revalidatePath } from 'next/cache'

export async function addTaskAction(boardId: string, columnId: string) {
  try {
    // In a real app, we would prompt the user via a form or modal before calling this.
    // For now, let's just add a dummy task to demonstrate it works.
    const newTask: Partial<TTask> = {
      title: 'Nouvelle tâche',
      description: '',
      priority: 'medium',
      columnId: columnId,
      boardId: boardId
    }

    await pb.collection('tasks').create(newTask as any);
    revalidatePath('/dashboard'); // Adjust path if necessary
    return { success: true };
  } catch (error: any) {
    console.error('Error adding task:', error);
    return { success: false, error: error.message };
  }
}

export async function addColumnAction(boardId: string, title: string) {
  try {
    // 1. Get the current board to get existing columns and structure
    const board = await pb.collection('boards').getOne<TBoard>(boardId);
    
    // 2. Create new column object
    const newColumn: TColumn = {
      id: crypto.randomUUID(), // Or let PB handle if it's a separate collection, but here it's embedded
      title: title,
      taskIds: []
    };

    // 3. Update the board with the new column in its list
    await pb.collection('boards').update(boardId, {
        columns: [...board.columns, newColumn]
    } as any);

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Error adding column:', error);
    return { success: false, error: error.message };
  }
}
