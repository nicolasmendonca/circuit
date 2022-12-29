import type { TaskDetails } from '$lib/types';
import type { RequestHandler } from './$types';

export const PUT = (async ({ locals, request, params }) => {
  const task = await request.json() satisfies TaskDetails
  await locals.appService.upsertTask(params.workspaceId, params.projectId, params.listId, task.id, task);

  return new Response(null)
}) satisfies RequestHandler
