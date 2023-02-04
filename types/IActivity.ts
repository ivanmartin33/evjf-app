export interface Activity {
  id: string // UUID
  name: string
  day: number
  price: string
  description: string
  image: string,
  userRelation?: { userId: string }[]
}