import { Activity } from './IActivity'

export interface User {
  id: string // UUID
  name: string
  email?: string
  total?: number
  status?: string
  activities?: { activityId: string }[]
}