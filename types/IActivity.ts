export interface Activity {
  id: string // UUID
  name: string
  day: number
  price: number
  description: string
  image: string,
  userRelation?: { id: string, name: string }[]
}

export const DEFAULT_ACTIVITY_LIST = [{
  id: "", // UUID
  name: "",
  day: 0,
  price: 0,
  description: "",
  image: ""
}]