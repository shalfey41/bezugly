import { isDev } from './env'
import { FirebasePost } from '../types/post'

export const canShowPost = (post: FirebasePost) => {
  if (isDev()) {
    return true
  }

  return !post.draft
}
