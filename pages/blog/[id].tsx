import { FC } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Client, isFullPage } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import { getBlockChildren } from 'notion-to-md/build/utils/notion'
import Link from 'next/link'
import Head from 'next/head'

import theme from '../../styles/theme.module.css'
import style from '../../styles/post.module.css'
import { Header } from '../../components/Header/Header'
import { Markdown } from '../../components/Markdown/Markdown'
import { formatDate, isPublic } from '../../helpers/post'
import { ArticleItem } from '../../types/post'

interface Post {
  id: number
  title: string
  content: string
  published: string
  thumbnailSrc: string
}

interface PostPreview {
  id: number
  title: string
  slug: string
}

type Props = {
  post: Post | null
  prevPost: PostPreview | null
  nextPost: PostPreview | null
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
        <meta property="og:image" content={post.thumbnailSrc} />
        <meta property="twitter:image:src" content={post.thumbnailSrc} />
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
  const notion = new Client({ auth: process.env.NOTION_KEY })
  const n2m = new NotionToMarkdown({ notionClient: notion })
  const databaseId = process.env.NOTION_DATABASE_ID
  let articles: ArticleItem[] = []
  let post: ArticleItem | null = null
  let prevPost: ArticleItem = null
  let nextPost: ArticleItem = null

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

    articles = database.results
      .filter(isFullPage)
      .filter(isPublic)
      .map((page) => {
        const pageId = page.id
        const pageProps = page.properties
        const pageTitle = pageProps.Pages[pageProps.Pages.type][0].plain_text
        const slug = pageProps.Slug[pageProps.Slug.type][0].plain_text
        const date = pageProps.Date[pageProps.Date.type]?.start ?? new Date().toLocaleDateString()
        const thumbnail = pageProps['Files & media'][pageProps['Files & media'].type][0]
        const thumbnailSrc = thumbnail
          ? thumbnail[thumbnail.type].url
          : 'https://bezugly.ru/images/main-page-avatar.jpg'

        return {
          id: pageId,
          title: pageTitle,
          slug,
          thumbnailSrc,
          date,
        }
      })
  } catch (error) {
    console.error(error.body)
  }

  const postIndex = articles.findIndex((item) => item.slug === id)

  if (postIndex === -1) {
    return {
      notFound: true,
    }
  }

  post = articles[postIndex]
  prevPost = articles[postIndex + 1] || null
  nextPost = articles[postIndex - 1] || null

  // Подмена изображений из S3: https://bezugly.ru/blog/notion-api-files
  const pageBlocks = (await getBlockChildren(notion, post.id, null)).map((block) => {
    if (!('type' in block) || block.type !== 'image') {
      return block
    }

    if (block.image.type !== 'file') {
      return block
    }

    return {
      ...block,
      image: {
        ...block.image,
        file: {
          ...block.image.file,
          url: `/api/notion-file-blocks/${block.id}`,
        },
      },
    }
  })

  const notionBlocks = await n2m.blocksToMarkdown(pageBlocks)
  const content = n2m.toMarkdownString(notionBlocks)

  return {
    props: {
      post: {
        id: post.id,
        title: post.title,
        content,
        published: formatDate(post.date),
        thumbnailSrc: post.thumbnailSrc,
      },
      prevPost: prevPost
        ? {
            id: prevPost.id,
            title: prevPost.title,
            slug: prevPost.slug,
          }
        : null,
      nextPost: nextPost
        ? {
            id: nextPost.id,
            title: nextPost.title,
            slug: nextPost.slug,
          }
        : null,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = []
  const notion = new Client({ auth: process.env.NOTION_KEY })
  const databaseId = process.env.NOTION_DATABASE_ID

  try {
    const database = await notion.databases.query({
      database_id: databaseId,
    })

    paths = database.results
      .filter(isFullPage)
      .filter(isPublic)
      .map((page) => {
        const pageProps = page.properties
        const slug = pageProps.Slug[pageProps.Slug.type][0].plain_text

        return `/blog/${slug}`
      })
  } catch (error) {
    console.error(error.body)
  }

  return { paths, fallback: 'blocking' }
}

export default Article
