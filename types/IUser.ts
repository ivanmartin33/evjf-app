import { Activity } from './IActivity'

export interface User {
  id: string // UUID
  name: string
  isAdmin: boolean
  email?: string
  total?: number
  status?: string
  activities?: { id: string }[]
}

export const DEFAULT_USER = {
  id: "", // UUID
  name: "",
  email: "",
  total: 0,
  status: ""
}