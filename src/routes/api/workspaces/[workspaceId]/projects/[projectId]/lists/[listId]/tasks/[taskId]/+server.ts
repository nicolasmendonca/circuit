import type { RequestHandler } from './$types';
import type { TaskDetails } from '$lib/types';

export const PATCH = (async ({ params, locals, request }) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const task = await locals.appService.getTask(params.workspaceId, params.projectId, params.listId, params.taskId);
  const json = await request.json() satisfies Partial<TaskDetails>
  await locals.appService.upsertTask(params.workspaceId, params.projectId, params.listId, params.taskId, {
    ...task,
    ...json
  });
 
  
  return new Response(null)
}) satisfies RequestHandler
