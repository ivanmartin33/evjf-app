import { User, DEFAULT_USER } from '@/types/IUser'
import { Activity, DEFAULT_ACTIVITY_LIST } from '@/types/IActivity'

export const useStore = () => {
  const activities = useState<Activity[]>('activities', () => DEFAULT_ACTIVITY_LIST)

  const user = useState<User>('user', () => DEFAULT_USER)

  const total = useState<number>('total', () => 0)

  return { activities, user, total }
}