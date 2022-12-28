import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
  const task = await locals.appService.getTask(params.taskId)
  return {
    task
  }
}) satisfies PageServerLoad;

export const actions: Actions = {
  setStatus: async ({ request, locals, params }) => {
    const formData = await request.formData()
    const status = formData.get('status') as 'completed' | 'pending'
    const task = await locals.appService.getTask(params.taskId)
    await locals.appService.updateTask({ ...task, isCompleted: status === 'completed' })
  }
};
