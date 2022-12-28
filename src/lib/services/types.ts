import type { ProjectDetails, ProjectListItem, TaskDetails, TaskListItem, WorkspaceListItem } from '$lib/types';


export interface IAppService {
  getWorkspaces: () => Promise<WorkspaceListItem[]>
  getProject: (id: ProjectListItem['id']) => Promise<ProjectDetails>

  getTasks: () => Promise<TaskListItem[]>
  getTask: (id: TaskDetails['id']) => Promise<TaskDetails>
  addTask: (task: TaskDetails) => Promise<void>
  updateTask: (task: TaskDetails) => Promise<void>
}
