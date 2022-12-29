import type { Id, ListContentBlock, ProjectDetails, TaskDetails, WorkspaceDetails } from '$lib/types';
import type { IAppService } from './types';

export class LocalService implements IAppService {
  private workspaces: Array<Omit<WorkspaceDetails, 'projects'> & { projectIds: string[] }> = [
    {
      id: '1',
      icon: '🏠',
      name: 'Home',
      projectIds: ['1', '2']
    }
  ];
  private projects: Array<Omit<ProjectDetails, 'contentBlocks'> & { contentBlockIds: string[] }> = [
    {
      id: '1',
      icon: '📚',
      title: 'Reading',
      contentBlockIds: ['1']
    },
    {
      id: '2',
      icon: '🦷',
      title: 'Dentist',
      contentBlockIds: []
    }
  ];
  private contentBlocks: ProjectDetails['contentBlocks'] = [
    {
      id: '1',
      type: 'text',
      content: 'Hello world'
    }
  ];

  getWorkspaces: IAppService['getWorkspaces'] = async () => {
    return this.workspaces.map(workspace => {
      return {
        ...workspace,
        projects: workspace.projectIds.map(projectId => {
          const project = this.projects.find(project => project.id === projectId)
          if (!project) throw new Error('Project not found')
          return project
        })
      }
    });
  }

  getWorkspace: IAppService['getWorkspace'] = async (workspaceId) => {
    return this.getWorkspaces().then(workspaces => {
      const workspace = workspaces.find(workspace => workspace.id === workspaceId)
      if (!workspace) throw new Error('Workspace not found')
      return workspace
    })
  }

  createProject: IAppService['createProject'] = async (workspaceId, project) => {
    this.projects.push({...project, contentBlockIds: []})
    this.workspaces.find(workspace => workspace.id === workspaceId)?.projectIds.push(project.id)
  }

  getProject: IAppService['getProject'] = async ( id: Id ) => {
    const project = this.projects.find(project => project.id === id)
    if (!project) throw new Error('Project not found')
    return {
      ...project,
      contentBlocks: project.contentBlockIds.map(contentBlockId => {
        const contentBlock = this.contentBlocks.find(contentBlock => contentBlock.id === contentBlockId)
        if (!contentBlock) throw new Error('Content block not found')
        return contentBlock
      })
    }
  };

  createContentBlock: IAppService['createContentBlock'] = async (workspaceId, projectId, contentBlock) => {
    this.contentBlocks.push(contentBlock)
    this.projects.find(project => project.id === projectId)?.contentBlockIds.push(contentBlock.id)
  }

  getTask: IAppService['getTask'] = async (workspaceId, projectId, listId, taskId) => {
    const block = this.contentBlocks.find((block) => block.type ==='list' && block.id === listId);
    if (!block) throw new Error('List not found')
    const listBlock = block as ListContentBlock
    const task = listBlock.items.find(item => item.id === taskId)
    if (!task) throw new Error('Task not found')
    return task as TaskDetails
  }

  upsertTask: IAppService['upsertTask'] = async (workspaceId, projectId, listId, taskId, task) => {
    const block = this.contentBlocks.find((block) => block.type ==='list' && block.id === listId);
    if (!block) throw new Error('List not found')
    const listBlock = block as ListContentBlock
    const itemIndex = listBlock.items.findIndex(item => item.id === taskId)

    if (itemIndex > -1) {
      listBlock.items.splice(itemIndex, 1, task)
    } else {
      listBlock.items.push(task)
    }
  }
}
