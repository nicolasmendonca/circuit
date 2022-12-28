import type { Id, ProjectDetails, TaskDetails, WorkspaceDetails } from '$lib/types';
import type { IAppService } from './types';

export class LocalService implements IAppService {
  private tasks: TaskDetails[] = [];
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

  addTask: IAppService['addTask'] = async (task) => {
    this.tasks.push(task);
  }

  getTasks: IAppService['getTasks'] = async () => this.tasks

  getTask: IAppService['getTask'] = async (id) => {
    const task = this.tasks.find((task) => task.id === id)
    if (!task) throw new Error('Task not found')
    return task
  }
  
  updateTask: IAppService['updateTask'] = async (task) => {
    const taskIndex = this.tasks.findIndex((taskItem) => taskItem.id === task.id)
    this.tasks.splice(taskIndex, 1, task)
  }
}
