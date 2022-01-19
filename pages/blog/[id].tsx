import { FC } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import Head from 'next/head'

import theme from '../../styles/theme.module.css'
import style from '../../styles/post.module.css'
import { Header } from '../../components/Header/Header'
import { Markdown } from '../../components/Markdown/Markdown'
import { formatDate } from '../../helpers/post'
import { ArticlesStrapi } from '../../types/post'

type Props = {
  post: {
    id: number
    title: string
    content: string
    published: string
    ogImageSrc: string
  }
  prevPost: { id: number; title: string; slug: string }
  nextPost: { id: number; title: string; slug: string }
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
  let articles = []
  let post = null
  let prevPost = null
  let nextPost = null

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
          content: article.attributes.content,
          published: article.attributes.published,
          ogImageSrc: article.attributes.ogImageSrc,
        }))
      })
  } catch (error) {
    //
  }

  const postIndex = articles.findIndex((item) => item.slug === id)

  if (postIndex === -1) {
    return {
      props: {
        post,
        prevPost,
        nextPost,
      },
    }
  }

  post = articles[postIndex]
  prevPost = articles[postIndex + 1] || null
  nextPost = articles[postIndex - 1] || null

  return {
    props: {
      post: {
        id: post.id,
        title: post.title,
        content: post.content,
        published: formatDate(post.published),
        ogImageSrc: post.ogImageSrc,
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

  return { paths, fallback: false }
}

export default Article
