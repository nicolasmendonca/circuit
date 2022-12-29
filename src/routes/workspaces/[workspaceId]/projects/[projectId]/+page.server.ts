import type { BlockType, ContentBlock, ListContentBlock, TaskListItem, TextContentBlock } from '$lib/types';
import type { Actions } from './$types';

export const actions: Actions = {
  addTextContentBlock: async ({ request, params, locals }) => {
    const formData = await request.formData();
    const type = formData.get('type') as BlockType
    let contentBlock: ContentBlock | null = null;
    if (type === 'text') {
      const content = formData.get('content') as string;
      contentBlock = { id: crypto.randomUUID(), content, type: 'text' } satisfies TextContentBlock;
    } else if (type === 'list') {
      const title = formData.get('title') as string;
      const ids = formData.getAll('id[]') as string[];
      const tasks = formData.getAll('task[]') as string[];

      const filteredTasks = tasks.filter((task) => task !== '');
      const filteredTasksWithIds: TaskListItem[] = filteredTasks.map((task, taskIndex) => ({ id: ids[taskIndex], title: task, isCompleted: false }));
      contentBlock = { id: crypto.randomUUID(), items: filteredTasksWithIds, type: 'list', title } satisfies ListContentBlock;
    }
    if (contentBlock === null) throw new Error('Invalid block type')
    await locals.appService.createContentBlock(params.workspaceId, params.projectId, contentBlock);
  }
};
