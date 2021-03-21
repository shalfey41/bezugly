import { FC } from 'react'
import Link from 'next/link'
import Head from 'next/head'

import { NavList } from '../components/NavList/NavList'
import theme from '../styles/theme.module.css'
import style from '../styles/main-page.module.css'

const Custom404: FC = () => {
  return (
    <div className={`${theme.page} ${style.page}`}>
      <Head>
        <title>Страница не найдена — Дима Безуглый</title>
        <meta property="og:title" content="Страница не найдена — Дима Безуглый" />
        <meta property="og:site_name" content="Страница не найдена — Дима Безуглый" />
        <meta name="twitter:title" content="Страница не найдена — Дима Безуглый" />
        <meta property="og:description" content="Но когда-нибудь она обязательно найдется" />
        <meta name="twitter:description" content="Но когда-нибудь она обязательно найдется" />
        <meta property="og:image" content="https://bezugly.ru/images/main-page-avatar.jpg" />
        <meta
          property="twitter:image:src"
          content="https://bezugly.ru/images/main-page-avatar.jpg"
        />
      </Head>

      <header className={theme.header}>
        <div className={`${theme.pageContainer} ${style.headerInner}`}>
          <NavList className={style.navList} />
          <h1 className={`${theme.title} ${style.title}`}>Страница не найдена</h1>
        </div>
      </header>
      <main>
        <div className={theme.pageContainer}>
          <div className={style.content}>
            <Link href="/">
              <img
                className={style.avatar}
                src="/images/main-page-avatar.jpg"
                alt="Моя фотография"
                width="142"
                style={{ cursor: 'pointer' }}
              />
            </Link>
            <div className={style.textColumn}>
              <p className={`${theme.text} ${style.text}`}>
                Но когда-нибудь она обязательно найдется
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Custom404
