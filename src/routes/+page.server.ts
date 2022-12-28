import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
  return {
    tasks: locals.appService.getTasks()
  }
}) satisfies PageServerLoad;

export const actions: Actions = {
  addTask: async ({ request, locals }) => {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    await locals.appService.addTask({ id: crypto.randomUUID(), title, isCompleted: false, description: '' });
  }
};
