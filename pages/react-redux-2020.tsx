import { FC } from 'react'
import Head from 'next/head'
import classnames from 'classnames'

import theme from '../styles/theme.module.css'
import style from '../styles/react-redux-2020.module.css'
import { Header } from '../components/Header/Header'

const ReactRedux2020: FC = () => {
  return (
    <div className={`${theme.page} ${style.page}`}>
      <Head>
        <title>Курс React + Redux 2020 от Димы Безуглого</title>
        <meta property="og:title" content="Курс React + Redux 2020 от Димы Безуглого" />
        <meta property="og:site_name" content="Курс React + Redux 2020 от Димы Безуглого" />
        <meta name="twitter:title" content="Курс React + Redux 2020 от Димы Безуглого" />
        <meta
          property="og:description"
          content="Бесплатный курс для верстальщиков, которые знают основы JavaScript и хотят стать хорошими фронтендерами, чтобы устроиться в крупную компанию или брать проекты посерьезнее."
        />
        <meta
          name="twitter:description"
          content="Бесплатный курс для верстальщиков, которые знают основы JavaScript и хотят стать хорошими фронтендерами, чтобы устроиться в крупную компанию или брать проекты посерьезнее."
        />
        <meta property="og:image" content="https://bezugly.ru/images/react-redux-2020-main.jpg" />
        <meta
          property="twitter:image:src"
          content="https://bezugly.ru/images/react-redux-2020-main.jpg"
        />
      </Head>

      <Header />
      <main>
        <section className={style.promo}>
          <div className={classnames(theme.pageContainer, style.container)}>
            <h1 className={style.promoTitle}>[React + Redux 2020]</h1>
            <p className={style.promoText}>
              Бесплатный курс для верстальщиков, которые знают основы JavaScript и&nbsp;хотят стать
              хорошими фронтендерами, чтобы устроиться в&nbsp;крупную компанию или брать проекты
              посерьезнее.
            </p>

            <div className={style.promoVideo}>
              <iframe
                className={style.video}
                src="https://player.vimeo.com/video/724085794?h=1326cc58b0&byline=0&portrait=0"
                width="1440"
                height="810"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Приглашаю на курс [React + Redux 2020]"
              ></iframe>
            </div>

            <div className={style.advantages}>
              <ol className={style.advantagesList}>
                <li className={style.advantagesItem}>
                  1. Научитесь создавать реальные сервисы самостоятельно с&nbsp;нуля с&nbsp;помощью
                  React, Redux и&nbsp;Firebase
                </li>
                <li className={style.advantagesItem}>
                  2. Станьте инженером, который сможет объяснить, как работает React и&nbsp;Redux
                  внутри
                </li>
                <li className={style.advantagesItem}>
                  3. Продвиньтесь по&nbsp;карьере, берите больше&nbsp;ЗП и&nbsp;более серьезные
                  проекты
                </li>
                <li className={style.advantagesItem}>
                  4. Заложите фундамент для развития в&nbsp;TypeScript, Jest, GraphQL
                </li>
              </ol>
            </div>

            <div>
              <blockquote className={style.blockquote}>
                <svg
                  className={style.blockquoteIcon}
                  width="60"
                  height="35"
                  viewBox="0 0 60 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M59.0274 0.467994C58.1994 4.056 57.3254 7.874 56.4054 11.922C55.5774 15.97 54.7954 19.926 54.0594 23.79C53.3234 27.562 52.7254 31.058 52.2654 34.278H33.3594L32.3934 32.76C33.2214 29.448 34.2794 25.952 35.5674 22.272C36.8554 18.592 38.2354 14.866 39.7074 11.094C41.2714 7.322 42.7894 3.77999 44.2614 0.467994H59.0274ZM27.5634 0.467994C26.7354 4.056 25.8614 7.874 24.9414 11.922C24.1134 15.97 23.3314 19.926 22.5954 23.79C21.8594 27.562 21.2614 31.058 20.8014 34.278H1.89544L0.929438 32.76C1.75744 29.448 2.81544 25.952 4.10344 22.272C5.39144 18.592 6.77144 14.866 8.24344 11.094C9.80744 7.322 11.3254 3.77999 12.7974 0.467994H27.5634Z"
                    fill="#F1F1F1"
                  />
                </svg>
                <div className={style.blockquoteImageContainer}>
                  <img
                    className={style.blockquoteImage}
                    src="/images/main-page-avatar.jpg"
                    alt="Аватар Димы Безуглого"
                  />
                </div>
                <p className={style.blockquoteText}>
                  Я&nbsp;записал этот курс в&nbsp;2020&nbsp;году, чтобы поделиться накопившимися
                  знаниями. Это была проба пера&nbsp;&mdash; записывал дома на&nbsp;фоне кухни без
                  профессиональной техники. Тем не&nbsp;менее, сил было вложено колоссально.
                </p>
                <p className={style.blockquoteText}>
                  Раньше я&nbsp;продавал курс за&nbsp;деньги, но&nbsp;у&nbsp;меня больше нет времени
                  его поддерживать, поэтому выкладываю его в&nbsp;открытый доступ на&nbsp;ютубе.
                  Большинство знаний из&nbsp;курса все еще актуальны, так что смело проходите.
                </p>
                {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
                <p className={style.blockquoteText}>
                  Надеюсь, вам будет полезно и&nbsp;вы&nbsp;откроете что-то новое для себя. Велкоме
                  😉
                </p>
              </blockquote>
            </div>
          </div>
        </section>

        <section>
          <div className={theme.pageContainer}>
            <h2 className={style.subtitle}>14&nbsp;занятий на&nbsp;ютубе + конспекты</h2>
            <p className={style.subtitleText}>
              23&nbsp;часа контента. Лайвкодим с&nbsp;нуля, объясняя каждый шаг.
            </p>

            <div className={style.program}>
              <div>
                <a
                  href="https://www.youtube.com/watch?v=HVMzhknQSjU&list=PLQFctfhVHn11vjOUp3dJn9Ihd26SkTt74"
                  target="_blank"
                  rel="noreferrer"
                  className={style.programLink}
                >
                  <img
                    src="https://i.ytimg.com/vi/7dv0mY-W9Ik/maxresdefault.jpg"
                    alt="Зачем нужны фреймворки и как подключить реакт"
                    className={style.programImage}
                  />
                  <p className={style.programText}>Зачем нужны фреймворки и как подключить реакт</p>
                </a>
              </div>

              <div>
                <a
                  href="https://www.youtube.com/watch?v=QQaMT5lD1OU&list=PLQFctfhVHn12D8zMZv_DCNF1TnFZ5mVNa&index=1"
                  target="_blank"
                  rel="noreferrer"
                  className={style.programLink}
                >
                  <img
                    className={style.programImage}
                    src="https://i.ytimg.com/vi/QQaMT5lD1OU/maxresdefault.jpg"
                    alt="JSX и компонентный подход: делаем компоненты бутстрапа"
                  />
                  <p className={style.programText}>
                    JSX и компонентный подход: делаем компоненты бутстрапа
                  </p>
                </a>
              </div>

              <div>
                <a
                  href="https://www.youtube.com/watch?v=Z-MEZ_c7OpU&list=PLQFctfhVHn12wd1M5G3aqxpG7fPCga-WC&index=1"
                  target="_blank"
                  rel="noreferrer"
                  className={style.programLink}
                >
                  <img
                    className={style.programImage}
                    src="https://i.ytimg.com/vi/Z-MEZ_c7OpU/maxresdefault.jpg"
                    alt="Как работает реакт, покоряем ребят на собеседовании"
                  />
                  <p className={style.programText}>
                    Как работает реакт, покоряем ребят на собеседовании
                  </p>
                </a>
              </div>

              <div>
                <a
                  href="https://www.youtube.com/watch?v=JvCnbQy790E&list=PLQFctfhVHn13w2m-QHodweR1MFbKO4Ytc&index=1"
                  target="_blank"
                  rel="noreferrer"
                  className={style.programLink}
                >
                  <img
                    className={style.programImage}
                    src="https://i.ytimg.com/vi/V0VHFGEm_IM/maxresdefault.jpg"
                    alt="Начинаем делать MVP канбана"
                  />
                  <p className={style.programText}>Начинаем делать MVP канбана</p>
                </a>
              </div>

              <div>
                <a
                  href="https://www.youtube.com/watch?v=Pvv6aYoBgZg&list=PLQFctfhVHn135MBnpZV9YO2QEQNLXywnR&index=1"
                  target="_blank"
                  rel="noreferrer"
                  className={style.programLink}
                >
                  <img
                    className={style.programImage}
                    src="https://i.ytimg.com/vi/igpAy7NVDIw/maxresdefault.jpg"
                    alt="Доделываем MVP"
                  />
                  <p className={style.programText}>Доделываем MVP</p>
                </a>
              </div>

              <div>
                <a
                  href="https://www.youtube.com/watch?v=50xaU3-U6CE&list=PLQFctfhVHn12pMw3XE0FQtdYvt_238u3v&index=1"
                  target="_blank"
                  rel="noreferrer"
                  className={style.programLink}
                >
                  <img
                    className={style.programImage}
                    src="https://i.ytimg.com/vi/p04xaFi23Zg/maxresdefault.jpg"
                    alt="Рефакторинг и архитектура"
                  />
                  <p className={style.programText}>Рефакторинг и архитектура</p>
                </a>
              </div>

              <div>
                <a
                  href="https://www.youtube.com/watch?v=D-jGF3li7Mo&list=PLQFctfhVHn11qpYYzBiwqb6USk2nXXjEz&index=1"
                  target="_blank"
                  rel="noreferrer"
                  className={style.programLink}
                >
                  <img
                    className={style.programImage}
                    src="https://i.ytimg.com/vi/ZnjczrZmwck/maxresdefault.jpg"
                    alt="Классовые компоненты против функциональных"
                  />
                  <p className={style.programText}>Классовые компоненты против функциональных</p>
                </a>
              </div>

              <div>
                <a
                  href="https://www.youtube.com/watch?v=c6LXNkfu3rQ&list=PLQFctfhVHn12Ytn9Hf5Z9BiUOBTlwixSq&index=1"
                  target="_blank"
                  rel="noreferrer"
                  className={style.programLink}
                >
                  <img
                    className={style.programImage}
                    src="https://i.ytimg.com/vi/LS7O-H5nyqo/maxresdefault.jpg"
                    alt="Роутер, router-5"
                  />
                  <p className={style.programText}>Роутер, router-5</p>
                </a>
              </div>

              <div>
                <a
                  href="https://www.youtube.com/watch?v=HXmgTXue18E&list=PLQFctfhVHn12ltUSgREZqT6ATU_QFbYQ2&index=1"
                  target="_blank"
                  rel="noreferrer"
                  className={style.programLink}
                >
                  <img
                    className={style.programImage}
                    src="https://i.ytimg.com/vi/JfoMJ3hA1vc/maxresdefault.jpg"
                    alt="Роутер, react-router"
                  />
                  <p className={style.programText}>Роутер, react-router</p>
                </a>
              </div>

              <div>
                <a
                  href="https://www.youtube.com/watch?v=3rZ4AKNAGqo&list=PLQFctfhVHn13pyVXuRB5qHHAAV2Mb5WVv&index=1"
                  target="_blank"
                  rel="noreferrer"
                  className={style.programLink}
                >
                  <img
                    className={style.programImage}
                    src="https://i.ytimg.com/vi/3rZ4AKNAGqo/maxresdefault.jpg"
                    alt="Redux"
                  />
                  <p className={style.programText}>Redux</p>
                </a>
              </div>

              <div>
                <a
                  href="https://www.youtube.com/watch?v=j2YCm6jh7BE&list=PLQFctfhVHn12MQid7h_-VcyM5TRvOANZ9&index=1"
                  target="_blank"
                  rel="noreferrer"
                  className={style.programLink}
                >
                  <img
                    className={style.programImage}
                    src="https://i.ytimg.com/vi/n8eerQrfzqc/maxresdefault.jpg"
                    alt="Рефакторинг и паттерны в реакте"
                  />
                  <p className={style.programText}>Рефакторинг и паттерны в реакте</p>
                </a>
              </div>

              <div>
                <a
                  href="https://www.youtube.com/watch?v=zGLeJpPM_Mo&list=PLQFctfhVHn10GycvDhjxlJGt-rDFarhBQ&index=1"
                  target="_blank"
                  rel="noreferrer"
                  className={style.programLink}
                >
                  <img
                    className={style.programImage}
                    src="https://i.ytimg.com/vi/vGHNDrub7j0/maxresdefault.jpg"
                    alt="Рефакторинг и архитектура"
                  />
                  <p className={style.programText}>Рефакторинг и архитектура</p>
                </a>
              </div>

              <div>
                <a
                  href="https://www.youtube.com/watch?v=7uMDeCIJL80&list=PLQFctfhVHn134vyOqd8xgxjZS2dHEf1ly&index=1"
                  target="_blank"
                  rel="noreferrer"
                  className={style.programLink}
                >
                  <img
                    className={style.programImage}
                    src="https://i.ytimg.com/vi/syGlah7Rz90/maxresdefault.jpg"
                    alt="Оптимизация и производительность"
                  />
                  <p className={style.programText}>Оптимизация и производительность</p>
                </a>
              </div>

              <div>
                <a
                  href="https://www.youtube.com/watch?v=e7eX-4CTLFg&list=PLQFctfhVHn125bnHIAcKpBNH9rh_Y2g9U&index=1"
                  target="_blank"
                  rel="noreferrer"
                  className={style.programLink}
                >
                  <img
                    className={style.programImage}
                    src="https://i.ytimg.com/vi/MpmlCCipEvA/maxresdefault.jpg"
                    alt="Финал"
                  />
                  <p className={style.programText}>Финал</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className={style.faq}>
          <div className={theme.pageContainer}>
            <h2 className={style.subtitle}>Ответы на&nbsp;вопросы</h2>

            <div className={style.faqGrid}>
              <div className={style.faqColumn}>
                <div>
                  <h3 className={style.faqTitle}>Что нужно знать, чтобы пройти курс?</h3>
                  <p className={style.faqText}>
                    Нужны базовые знания&nbsp;JS: таймауты, промисы, события, функции, запрос
                    на&nbsp;сервер. Реакт знать не&nbsp;обязательно.
                  </p>
                </div>

                <div>
                  <h3 className={style.faqTitle}>
                    Поможет&nbsp;ли этот курс устроиться на&nbsp;работу?
                  </h3>
                  <p className={style.faqText}>
                    Курс значительно увеличивает ваши шансы приема на&nbsp;работу, где нужен
                    фронтендер на&nbsp;реакте. Но&nbsp;гарантировать трудоустройство не&nbsp;могу,
                    потому что в&nbsp;приеме на&nbsp;работу важно не&nbsp;только умение
                    программировать.
                  </p>
                </div>

                <div>
                  <h3 className={style.faqTitle}>
                    Что, если у&nbsp;меня будут вопросы во&nbsp;время курса?
                  </h3>
                  <p className={style.faqText}>
                    Присылайте вопросы мне в&nbsp;телеграм. Отвечаю редко, но&nbsp;отвечаю.
                  </p>
                </div>

                <div>
                  <h3 className={style.faqTitle}>Будут&nbsp;ли тесты и&nbsp;тайпскрипт?</h3>
                  <p className={style.faqText}>
                    Нет, в&nbsp;этом курсе только реакт, редакс и&nbsp;роутер.
                  </p>
                </div>
              </div>

              <div className={style.faqColumn}>
                <div>
                  <h3 className={style.faqTitle}>
                    Правильно&nbsp;ли я&nbsp;понял, что это бесплатный курс на&nbsp;ютубе?
                  </h3>
                  <p className={style.faqText}>
                    Да, в&nbsp;описании под каждым видео есть ссылки на&nbsp;все занятия + конспект
                    текущего занятия.
                  </p>
                </div>

                <div>
                  <h3 className={style.faqTitle}>
                    Почему ты&nbsp;будешь учить меня реакту? Ты&nbsp;что, Дэн Абрамов?
                  </h3>
                  <p className={style.faqText}>
                    Я&nbsp;делаю сервисы на&nbsp;реакте c&nbsp;2016 года и&nbsp;постоянно смотрю
                    чужой код. Я&nbsp;вижу одни и&nbsp;те&nbsp;же ошибки, из-за которых потом сидишь
                    и&nbsp;ночами переделываешь. В&nbsp;этом курсе я&nbsp;поделюсь своим опытом
                    и&nbsp;расскажу, как делать так, чтобы потом не&nbsp;переделывать.
                  </p>
                </div>

                <div>
                  <h3 className={style.faqTitle}>
                    Есть&nbsp;ли домашние задания, сертификаты и&nbsp;обратная связь?
                  </h3>
                  <p className={style.faqText}>
                    Домашних заданий нет, сертификаты не&nbsp;выдаются. А&nbsp;вопросы присылайте
                    мне в&nbsp;телеграм.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className={style.ctaContainer}>
          <div className={theme.pageContainer}>
            <a
              className={style.cta}
              href="https://www.youtube.com/watch?v=HVMzhknQSjU&list=PLQFctfhVHn11vjOUp3dJn9Ihd26SkTt74"
              target="_blank"
              rel="noreferrer"
            >
              Открыть бесплатный урок
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ReactRedux2020
