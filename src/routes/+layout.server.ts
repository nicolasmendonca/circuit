import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
  return {
    workspaces: await locals.appService.getWorkspaces()
  }
}) satisfies LayoutServerLoad;
