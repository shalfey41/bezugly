import { FC } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import style from '../../styles/posts.module.css'
import theme from '../../styles/theme.module.css'
import { getFirebase } from '../../helpers/firebase'
import { Header } from '../../components/Header/Header'
import { canShowPost, getWord } from '../../helpers/post'
import { Post, FirebasePost } from '../../types/post'

type Props = {
  articles: Post[]
}

const Blog: FC<Props> = ({ articles = [] }) => {
  const title =
    articles.length > 0
      ? `${articles.length} ${getWord(articles.length, [
          'заметка',
          'заметки',
          'заметок',
        ])} Димы Безуглого`
      : 'Блог Димы Безуглого'

  return (
    <div className={theme.page}>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={title} />
        <meta name="twitter:title" content={title} />
        <meta property="og:description" content="Пишу о жизни и работе во фронтенде" />
        <meta name="twitter:description" content="Пишу о жизни и работе во фронтенде" />
        <meta property="og:image" content="https://bezugly.ru/images/main-page-avatar.jpg" />
        <meta
          property="twitter:image:src"
          content="https://bezugly.ru/images/main-page-avatar.jpg"
        />
      </Head>

      <Header />
      <main>
        <div className={theme.pageContainer}>
          {articles.map(({ id, title, slug }) => (
            <article className={style.article} key={id}>
              <Link href={`/blog/${slug}`} passHref>
                <a className={`${theme.link} ${style.link}`}>
                  <h1 className={theme.title}>
                    <span className={theme.linkUnderline}>{title}</span>
                  </h1>
                </a>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const db = getFirebase().firestore()
  const articles = await db
    .collection('posts')
    .orderBy('published', 'desc')
    .get()
    .then((querySnapshot) => {
      const posts = []

      querySnapshot.forEach((doc) => {
        const data = doc.data() as FirebasePost

        if (!canShowPost(data)) {
          return
        }

        posts.push({
          id: doc.id,
          title: data.title,
          slug: data.slug,
        })
      })

      return posts
    })

  return {
    props: {
      articles,
    },
  }
}

export default Blog
