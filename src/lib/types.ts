export type Id = string
type WithId = { id: Id }

export type TaskListItem =  WithId & { isCompleted: boolean; title: string }
export type TaskDetails = TaskListItem & { description: string }

export type WorkspaceListItem = WithId & {
  icon: string;
  name: string;
  projects: ProjectListItem[]
}
export type WorkspaceDetails = WorkspaceListItem

export type ProjectListItem = WithId & {
  icon: string;
  title: string;
}
export type ProjectDetails = ProjectListItem & {
  contentBlocks: ContentBlock[]
}

export type ContentBlock = TextContentBlock

type TextContentBlock = WithId & {
  // This will be replaced by https://lexical.dev/ in the future
  type: 'text',
  content: string
}

