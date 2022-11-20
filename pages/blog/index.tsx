import { FC } from 'react'
import { GetStaticProps } from 'next'
import { Client, isFullPage } from '@notionhq/client'
import Head from 'next/head'
import Link from 'next/link'

import style from '../../styles/posts.module.css'
import theme from '../../styles/theme.module.css'
import { Header } from '../../components/Header/Header'
import { getWord } from '../../helpers/post'

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

export const getStaticProps: GetStaticProps = async () => {
  const notion = new Client({ auth: process.env.NOTION_KEY })
  const databaseId = process.env.NOTION_DATABASE_ID
  const articles = []

  try {
    const database = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    })

    database.results.forEach((page) => {
      const pageId = page.id

      if (isFullPage(page)) {
        const pageProps = page.properties
        const pageTitle = pageProps.Pages[pageProps.Pages.type][0].plain_text
        const slug = pageProps.Slug[pageProps.Slug.type][0].plain_text

        articles.push({
          id: pageId,
          title: pageTitle,
          slug,
        })
      }
    })
  } catch (error) {
    console.error(error.body)
  }

  return {
    props: {
      articles,
    },
    revalidate: 10,
  }
}

export default Blog
