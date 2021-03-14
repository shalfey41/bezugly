import Link from 'next/link';

export default function MainPage() {
  return (
    <div className="main-page">
      <header className="header">
        <div className="page-container header-container">
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
          <h1 className="title header-title">Дима Безуглый,<br/>фронтенд-тимлид</h1>
        </div>
      </header>
      <main className="main">
        <div className="page-container">
          <div className="main-page-content">
            <img
              className="main-page-image"
              src="/images/main-page-avatar.png"
              alt="Моя фотография"
              width="142"
            />
            <div className="main-page-content-text">
              <p className="text main-page-text">Сейчас развиваю команду фронтенда в отделе рекламы и бизнеса ВКонтакте. До этого разрабатывал интерфейсы в Яндексе и ВКонтакте.</p>
              <p className="text main-page-text">Пишу заметки, записываю курсы, запускаю проекты, помогаю разработчикам и вообще я молодец.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
