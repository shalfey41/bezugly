import Link from "next/link";
import { getFirebase } from "../../helpers/firebase";

export default function Blog({ articles = [] }) {
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
          {articles.map(({ id, title, slug }) => (
            <article className="posts-article" key={id}>
              <Link href={`/blog/posts/${slug}`} passHref>
                <a className="link">
                  <h1 className="title">
                    <span className="link-underline">{title}</span>
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
