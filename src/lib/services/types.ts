import type { ContentBlock, Id, ProjectDetails, ProjectListItem, TaskDetails, WorkspaceDetails, WorkspaceListItem } from '$lib/types';


export interface IAppService {
  getWorkspaces: () => Promise<WorkspaceListItem[]>
  getWorkspace: (id: Id) => Promise<WorkspaceDetails>
  getProject: (id: Id) => Promise<ProjectDetails>
  createProject: (workspaceId: Id, payload: ProjectListItem) => Promise<void>
  
  createContentBlock: (workspaceId: Id, projectId: Id, payload: ContentBlock) => Promise<void>

  getTask: (workspaceId: Id, projectId: Id, listId: Id, taskId: Id) => Promise<TaskDetails>
  upsertTask: (workspaceId: Id, projectId: Id, listId: Id, taskId: Id, task: TaskDetails) => Promise<void>
}
