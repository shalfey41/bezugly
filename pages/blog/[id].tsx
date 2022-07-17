import { FC } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import Head from 'next/head'

import theme from '../../styles/theme.module.css'
import style from '../../styles/post.module.css'
import { Header } from '../../components/Header/Header'
import { Markdown } from '../../components/Markdown/Markdown'
import { formatDate } from '../../helpers/post'
import { ArticlesStrapi, ArticleItemStrapi } from '../../types/post'

type Props = {
  post: {
    id: number
    title: string
    content: string
    published: string
    thumbnailSrc: string
  } | null
  prevPost: { id: number; title: string; slug: string } | null
  nextPost: { id: number; title: string; slug: string } | null
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
  let articles: ArticleItemStrapi[] = []
  let post: ArticleItemStrapi | null = null
  let prevPost: ArticleItemStrapi = null
  let nextPost: ArticleItemStrapi = null

  try {
    articles = await fetch(
      'https://bezugly-admin.herokuapp.com/api/articles?sort[0]=published:desc&populate=*'
    )
      .then((response) => response.json())
      .then((articles: ArticlesStrapi) => articles.data)
  } catch (error) {
    //
  }

  const postIndex = articles.findIndex((item) => item.attributes.slug === id)

  if (postIndex === -1) {
    return {
      notFound: true,
    }
  }

  post = articles[postIndex]
  prevPost = articles[postIndex + 1] || null
  nextPost = articles[postIndex - 1] || null

  let thumbnailSrc = 'https://bezugly.ru/images/main-page-avatar.jpg'

  if (post.attributes.thumbnail.data?.attributes?.url) {
    thumbnailSrc = post.attributes.thumbnail.data?.attributes?.url
  } else if (post.attributes.ogImageSrc) {
    thumbnailSrc = post.attributes.ogImageSrc
  }

  return {
    props: {
      post: {
        id: post.id,
        title: post.attributes.title,
        content: post.attributes.content,
        published: formatDate(post.attributes.published),
        thumbnailSrc,
      },
      prevPost: prevPost
        ? {
            id: prevPost.id,
            title: prevPost.attributes.title,
            slug: prevPost.attributes.slug,
          }
        : null,
      nextPost: nextPost
        ? {
            id: nextPost.id,
            title: nextPost.attributes.title,
            slug: nextPost.attributes.slug,
          }
        : null,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  let paths = []

  try {
    paths = await fetch('https://bezugly-admin.herokuapp.com/api/articles?sort[0]=published:desc')
      .then((response) => response.json())
      .then((response: ArticlesStrapi) => {
        return response.data.map((article) => `/blog/${article.attributes.slug}`)
      })
  } catch (error) {
    //
  }

  return { paths, fallback: 'blocking' }
}

export default Article
