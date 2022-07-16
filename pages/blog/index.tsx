import { FC } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import style from '../../styles/posts.module.css'
import theme from '../../styles/theme.module.css'
import { Header } from '../../components/Header/Header'
import { getWord } from '../../helpers/post'
import { ArticlesStrapi } from '../../types/post'

interface Article {
  id: number
  title: string
  slug: string
}

type Props = {
  articles: Article[]
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

export const getServerSideProps: GetServerSideProps = async () => {
  let articles = []

  try {
    articles = await fetch(
      'https://bezugly-admin.herokuapp.com/api/articles?sort[0]=published:desc'
    )
      .then((response) => response.json())
      .then((response: ArticlesStrapi) => {
        return response.data.map((article) => ({
          id: article.id,
          title: article.attributes.title,
          slug: article.attributes.slug,
        }))
      })
  } catch (error) {
    //
  }

  return {
    props: {
      articles,
    },
  }
}

export default Blog
