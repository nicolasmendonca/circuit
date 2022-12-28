import type { RequestHandler } from '@sveltejs/kit';

export const PATCH = (async ({ params, locals, request }) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const task = await locals.appService.getTask(params.taskId!);
  const json = await request.json()
  await locals.appService.updateTask({ ...task, ...json });
 
  
  return new Response(null)
}) satisfies RequestHandler
