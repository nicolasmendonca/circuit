import type { Actions, PageServerLoad } from './$types';
import type { Task } from './types';

const tasks: Task[] = []

export const load = (async () => {
  return {
    tasks
  }
}) satisfies PageServerLoad;

export const actions: Actions = {
  addTask: async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    tasks.push({ title, isCompleted: false });
  }
};
