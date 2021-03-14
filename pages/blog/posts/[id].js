import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import { Prism } from 'react-syntax-highlighter';
import gfm from 'remark-gfm';
import firebase from "firebase/app";

import highlighterStyle from "../../../helpers/highlighterStyle";
import { formatDate } from "../../../helpers/date";

const renderers = {
  code: ({ language, value }) => {
    if (language === 'idea') {
      return <p className="idea">{value}</p>;
    }

    return <Prism style={highlighterStyle} language={language} children={value} />;
  },
};

export default function Post({ post = {}, prevPost, nextPost }) {
  return (
    <div className="posts-page">
      <header className="header">
        <div className="page-container posts-page-header">
          <strong>Дима Безуглый</strong>
          <nav>
            <ul className="header-list">
              <li className="header-list-item">
                <Link href="/blog" passHref>
                  <a className="link"><span className="link-underline">Блог</span></a>
                </Link>
              </li>
              <li className="header-list-item">
                <a className="link" href="https://www.udemy.com/course/react-redux-2020/?referralCode=0C74053563423A398A3C" target="_blank"><span className="link-underline">Курс по реакту</span></a>
              </li>
              <li className="header-list-item">
                <a className="link" href="https://t.me/sexy_frontend" target="_blank"><span className="link-underline">Канал в телеграме</span></a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="main">
        <div className="page-container">
          <article className="posts-article">
            <h1 className="title">{post.title}</h1>
            <div className="markdown">
              <ReactMarkdown plugins={[gfm]} renderers={renderers}>{post.content}</ReactMarkdown>
            </div>
          </article>

          <p>{post.published}</p>
        </div>

        {prevPost || nextPost ? (
          <div className="page-container">
            <div className="post-recent-container">
              <div className="post-recent-item">
                {prevPost && (
                  <Link href={`/blog/posts/${prevPost.slug}`} passHref>
                    <a className="post-recent-item-link">
                      <p className="post-recent-item-label">Предыдущая заметка</p>
                      <p className="post-recent-item-text">{prevPost.title}</p>
                    </a>
                  </Link>
                )}
              </div>
              <div className="post-recent-item">
                {nextPost && (
                  <Link href={`/blog/posts/${nextPost.slug}`} passHref>
                    <a className="post-recent-item-link">
                      <p className="post-recent-item-label">Предыдущая заметка</p>
                      <p className="post-recent-item-text">{nextPost.title}</p>
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

export async function getStaticProps({ params: { id } }) {
  const db = firebase.firestore();
  const post = await db.collection('posts').where('slug', '==', id).get()
    .then((querySnapshot) => {
      if(querySnapshot.empty) {
        console.log('empty');
      }

      const doc = querySnapshot.docs[0];
      const data = doc.data();

      return {
        id: doc.id,
        title: data.title,
        content: data.content,
        published: data.published,
      };
    });

  const prevPostReq = db.collection('posts').orderBy('published', 'desc').startAfter(post.published).limit(1).get()
    .then((querySnapshot) => {
      if(querySnapshot.empty) {
        return null;
      }

      const doc = querySnapshot.docs[0];
      const data = doc.data();

      return {
        id: doc.id,
        title: data.title,
        slug: data.slug,
      };
    });
  const nextPostReq = db.collection('posts').orderBy('published').startAfter(post.published).limit(1).get()
    .then((querySnapshot) => {
      if(querySnapshot.empty) {
        return null;
      }

      const doc = querySnapshot.docs[0];
      const data = doc.data();

      return {
        id: doc.id,
        title: data.title,
        slug: data.slug,
      };
    });

  const [prevPost, nextPost] = await Promise.all([prevPostReq, nextPostReq]);

  post.published = formatDate(post.published.toDate().toString())

  return {
    props: {
      post,
      prevPost,
      nextPost,
    },
  }
}

export async function getStaticPaths() {
  const db = firebase.firestore();
  const paths = await db.collection('posts').get()
    .then((querySnapshot) => {
      const posts = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        posts.push(`/blog/posts/${data.slug}`);
      });

      return posts;
    });

  return { paths, fallback: false };
}
