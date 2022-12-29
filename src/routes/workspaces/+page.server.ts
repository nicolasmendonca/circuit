import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {

  const [firstWorkspace] = await locals.appService.getWorkspaces()
  if (firstWorkspace) {
    throw redirect(302, `/workspaces/${firstWorkspace.id}`)
  }
};
