import { FC } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import Head from 'next/head'

import theme from '../../styles/theme.module.css'
import style from '../../styles/post.module.css'
import { getFirebase } from '../../helpers/firebase'
import { Header } from '../../components/Header/Header'
import { Markdown } from '../../components/Markdown/Markdown'
import { canShowPost, formatDate } from '../../helpers/post'
import { Post, FirebasePost } from '../../types/post'

type Props = {
  post: Post
  prevPost: Post
  nextPost: Post
}

const Article: FC<Props> = ({ post = {}, prevPost, nextPost }) => {
  const title = post.title ? `${post.title} — блог Димы Безуглого` : 'Заметка Димы Безуглого'

  return (
    <div className={theme.page}>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={title} />
        <meta name="twitter:title" content={title} />
        {post.content.length && (
          <meta property="og:description" content={`${post.content.slice(0, 50)}…`} />
        )}
        {post.content.length && (
          <meta name="twitter:description" content={`${post.content.slice(0, 50)}…`} />
        )}
        {post.ogImageSrc && <meta property="og:image" content={post.ogImageSrc} />}
        {post.ogImageSrc && <meta property="twitter:image:src" content={post.ogImageSrc} />}
      </Head>

      <Header />
      <main>
        <div className={theme.pageContainer}>
          <article className={style.article}>
            <h1 className={`${theme.title} ${style.title}`}>{post.title}</h1>
            <Markdown>{post.content}</Markdown>
          </article>

          <p className={style.date}>{post.published}</p>
        </div>

        {prevPost || nextPost ? (
          <div className={theme.pageContainer}>
            <div className={style.recent}>
              <div className={style.recentItem}>
                {prevPost && (
                  <Link href={`/blog/${prevPost.slug}`} passHref>
                    <a className={style.recentLink}>
                      <p className={style.recentLabel}>Предыдущая заметка</p>
                      <p className={style.recentText}>{prevPost.title}</p>
                    </a>
                  </Link>
                )}
              </div>
              <div className={style.recentItem}>
                {nextPost && (
                  <Link href={`/blog/${nextPost.slug}`} passHref>
                    <a className={style.recentLink}>
                      <p className={style.recentLabel}>Следующая заметка</p>
                      <p className={style.recentText}>{nextPost.title}</p>
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params: { id } }) => {
  const db = getFirebase().firestore()
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

      if (!canShowPost(data)) {
        return null
      }

      return {
        id: doc.id,
        title: data.title,
        content: data.content,
        published: data.published,
        ogImageSrc: data.ogImageSrc || null,
      }
    })

  let prevPost = null
  let nextPost = null

  await db
    .collection('posts')
    .orderBy('published', 'desc')
    .get()
    .then((querySnapshot) => {
      const posts = []

      querySnapshot.forEach((doc) => {
        const data = doc.data() as FirebasePost

        if (!canShowPost(data)) {
          return null
        }

        posts.push({
          id: doc.id,
          title: data.title,
          slug: data.slug,
        })
      })

      const currentPostIndex = posts.findIndex((post) => post.slug === id)

      if (posts[currentPostIndex + 1]) {
        prevPost = posts[currentPostIndex + 1]
      }

      if (posts[currentPostIndex - 1]) {
        nextPost = posts[currentPostIndex - 1]
      }

      return posts
    })

  // @ts-ignore
  post.published = formatDate(post.published.toDate().toString())

  return {
    props: {
      post,
      prevPost,
      nextPost,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const db = getFirebase().firestore()
  const paths = await db
    .collection('posts')
    .get()
    .then((querySnapshot) => {
      const posts = []

      querySnapshot.forEach((doc) => {
        const data = doc.data() as FirebasePost

        if (!canShowPost(data)) {
          return
        }

        posts.push(`/blog/${data.slug}`)
      })

      return posts
    })

  return { paths, fallback: false }
}

export default Article
