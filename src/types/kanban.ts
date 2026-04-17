export type TPriority = 'low' | 'medium' | 'high'

export interface TTask {
  id: string
  title: string
  description?: string
  priority: TPriority
  columnId: string
  boardId: string
}

export interface TColumn {
  id: string
  title: string
  taskIds: string[]
}

export interface TBoardParticipant {
  user: string // User ID from PocketBase
  role: 'admin' | 'member'
}

export interface TBoard {
  id: string
  name: string
  color: string // Hex color code
  creator: string // Creator user ID
  participants: string[] // Array of user IDs (relation)
  columns: TColumn[]
}
