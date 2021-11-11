import { useState, FC } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import firebase from 'firebase/app'
import 'firebase/firestore'

import { Post, FirebasePost } from '../../types/post'

const firebaseConfig = {
  apiKey: 'AIzaSyCKsxIeItkyV4kkEYfv_19bc6sjXyT_6qU',
  authDomain: 'bezuglyru.firebaseapp.com',
  databaseURL: 'https://bezuglyru-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'bezuglyru',
  storageBucket: 'bezuglyru.appspot.com',
  messagingSenderId: '392066267342',
  appId: '1:392066267342:web:a6822134d568cb682e789f',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

type Props = {
  post: Post
}

const EditPost: FC<Props> = ({ post = {} }) => {
  const [id, setId] = useState(post.id)
  const [ogImageSrc, setOgImage] = useState(post.ogImageSrc)
  const [content, setContent] = useState(post.content)
  const onSubmit = async (event) => {
    event.preventDefault()

    const db = firebase.firestore()

    if (id) {
      await db.collection('posts').doc(id.trim()).update({ content, ogImageSrc })
    } else {
      await db.collection('posts').add({ content })
    }

    alert('ok')
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={id} onChange={({ currentTarget: { value } }) => setId(value)} />
      <textarea value={content} onChange={({ currentTarget: { value } }) => setContent(value)} />
      <input
        type="text"
        value={ogImageSrc}
        onChange={({ currentTarget: { value } }) => setOgImage(value)}
      />
      <button>Go</button>
    </form>
  )
}

export const getStaticProps: GetStaticProps = async ({ params: { id } }) => {
  const db = firebase.firestore()
  const post = await db
    .collection('posts')
    .where('slug', '==', id)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        console.log('empty')
      }

      const doc = querySnapshot.docs[0]
      const data = doc.data() as FirebasePost

      return {
        id: doc.id,
        title: data.title,
        content: data.content,
        ogImageSrc: data.ogImageSrc,
      }
    })

  return {
    props: {
      post,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const db = firebase.firestore()
  const paths = await db
    .collection('posts')
    .get()
    .then((querySnapshot) => {
      const posts = []

      querySnapshot.forEach((doc) => {
        const data = doc.data() as FirebasePost

        posts.push(`/edit/${data.slug}`)
      })

      return posts
    })

  return { paths, fallback: false }
}

export default EditPost
