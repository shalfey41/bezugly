import { FC } from 'react'
import Head from 'next/head'

import { NavList } from '../components/NavList/NavList'
import theme from '../styles/theme.module.css'
import style from '../styles/main-page.module.css'
import { useAllHeight } from '../helpers/useAllHeight'

const MainPage: FC = () => {
  useAllHeight()

  return (
    <div className={`${theme.page} ${style.page}`}>
      <Head>
        <title>Дима Безуглый</title>
        <meta property="og:title" content="Дима Безуглый, фронтенд-тимлид" />
        <meta property="og:site_name" content="Дима Безуглый, фронтенд-тимлид" />
        <meta name="twitter:title" content="Дима Безуглый, фронтенд-тимлид" />
        <meta
          property="og:description"
          content="Сейчас развиваю команду фронтенда в отделе рекламы и бизнеса ВКонтакте. До этого разрабатывал интерфейсы в Яндексе и ВКонтакте."
        />
        <meta
          name="twitter:description"
          content="Сейчас развиваю команду фронтенда в отделе рекламы и бизнеса ВКонтакте. До этого разрабатывал интерфейсы в Яндексе и ВКонтакте."
        />
        <meta property="og:image" content="https://bezugly.ru/images/main-page-avatar.jpg" />
        <meta
          property="twitter:image:src"
          content="https://bezugly.ru/images/main-page-avatar.jpg"
        />
      </Head>

      <header className={theme.header}>
        <div className={`${theme.pageContainer} ${style.headerInner}`}>
          <NavList className={style.navList} />
          <h1 className={`${theme.title} ${style.title}`}>
            Дима Безуглый,
            <br />
            фронтенд-тимлид
          </h1>
        </div>
      </header>
      <main>
        <div className={theme.pageContainer}>
          <div className={style.content}>
            <img
              className={style.avatar}
              src="/images/main-page-avatar.jpg"
              alt="Моя фотография"
              width="142"
            />
            <div className={style.textColumn}>
              <p className={`${theme.text} ${style.text}`}>
                Руковожу командой фронтенда в департаменте рекламных технологий ВК. До этого
                разрабатывал интерфейсы в Яндексе и ВКонтакте.
              </p>
              <p className={`${theme.text} ${style.text}`}>
                Пишу заметки, записываю курсы, запускаю проекты, помогаю разработчикам и вообще
                я молодец.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MainPage
