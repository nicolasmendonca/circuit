import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
  return {
    workspace: locals.appService.getWorkspace(params.workspaceId),
    project: locals.appService.getProject(params.projectId)
  }
}) satisfies LayoutServerLoad;
