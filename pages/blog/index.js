import Link from "next/link";

import style from '../../styles/posts.module.css';
import theme from '../../styles/theme.module.css';
import { getFirebase } from "../../helpers/firebase";
import { Header } from "../../components/Header/Header";
import { isDev } from "../../helpers/env";

export default function Blog({ articles = [] }) {
  return (
    <div className={theme.page}>
      <Header />
      <main>
        <div className={theme.pageContainer}>
          {articles.map(({ id, title, slug }) => (
            <article className={style.article} key={id}>
              <Link href={`/blog/posts/${slug}`} passHref>
                <a className={theme.link}>
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

export async function getStaticProps() {
  const db = getFirebase().firestore();
  const articles = await db.collection('posts').orderBy('published', 'desc').get()
    .then((querySnapshot) => {
      const posts = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        if (data.draft && isDev()) {
          return;
        }

        posts.push({
          id: doc.id,
          title: data.title,
          slug: data.slug,
        });
      });

      return posts;
    });

  return {
    props: {
      articles,
    },
  }
}
