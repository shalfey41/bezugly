import Link from "next/link";

export default function Blog() {
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
            <Link href="/blog/posts/abc" passHref>
              <a className="link">
                <h1 className="title">
                  <span className="link-underline">Обязательный initialValue при [].reduce</span>
                </h1>
              </a>
            </Link>
          </article>
          <article className="posts-article">
            <Link href="/blog/posts/abc" passHref>
              <a className="link">
                <h1 className="title">
                  <span className="link-underline">Сбросить балласт</span>
                </h1>
              </a>
            </Link>
          </article>
          <article className="posts-article">
            <Link href="/blog/posts/abc" passHref>
              <a className="link">
                <h1 className="title">
                  <span className="link-underline">Как еще использовать CSS-переменные</span>
                </h1>
              </a>
            </Link>
          </article>
          <article className="posts-article">
            <Link href="/blog/posts/abc" passHref>
              <a className="link">
                <h1 className="title">
                  <span className="link-underline">Краевые случаи</span>
                </h1>
              </a>
            </Link>
          </article>
          <article className="posts-article">
            <Link href="/blog/posts/abc" passHref>
              <a className="link">
                <h1 className="title">
                  <span className="link-underline">Гарантия трудоустройства на курсах</span>
                </h1>
              </a>
            </Link>
          </article>
          <article className="posts-article">
            <Link href="/blog/posts/abc" passHref>
              <a className="link">
                <h1 className="title">
                  <span className="link-underline">Ностальгирую о прошлом</span>
                </h1>
              </a>
            </Link>
          </article>
        </div>
      </main>
    </div>
  )
}
