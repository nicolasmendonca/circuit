import type { Handle } from '@sveltejs/kit';
import { appServices } from '$lib/services/appServices';
 
export const handle = (async ({ event, resolve }) => {
  event.locals.appService = appServices
  const response = await resolve(event);
  return response;
}) satisfies Handle;
