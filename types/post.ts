import firebase from 'firebase'
import Timestamp = firebase.firestore.Timestamp

export interface FirebasePost {
  id: string
  slug: string
  title: string
  content: string
  published: Timestamp
  ogImageSrc?: string
  draft?: boolean
}

export interface Post {
  id: string
  slug: string
  title: string
  content: string
  published: string
  ogImageSrc: string | null
  draft?: boolean
}
