import type { LayoutServerLoad } from './tasks/$types';

export const load = (async ({ locals, params }) => {
  return {
    project: locals.appService.getProject(params.projectId)
  }
}) satisfies LayoutServerLoad;
