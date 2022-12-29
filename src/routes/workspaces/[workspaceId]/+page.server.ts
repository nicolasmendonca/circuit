import type { Actions, PageServerLoad } from './$types';
import * as unicodeEmoji from 'unicode-emoji';

export const load = (async ({ locals, params }) => {
  return {
    workspace: await locals.appService.getWorkspace(params.workspaceId),
  }
}) satisfies PageServerLoad;

export const actions: Actions = {
  createProject: async ({ locals, request, params }) => {
    const formData = await request.formData()
    const title = formData.get('title') as string
    const emojiList = unicodeEmoji.getEmojis()
    // pick random emoji
    const icon = emojiList[Math.floor(Math.random() * emojiList.length)]?.emoji

    await locals.appService.createProject(params.workspaceId, {
      id: crypto.randomUUID(),
      icon,
      title,
    })
  }
};
