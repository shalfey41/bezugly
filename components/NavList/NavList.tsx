import { FC } from 'react'
import Link from 'next/link'
import classnames from 'classnames'

import style from './styles.module.css'
import theme from '../../styles/theme.module.css'

type Props = {
  className?: string
}

export const NavList: FC<Props> = ({ className }) => (
  <nav>
    <ul className={classnames(style.navList, className)}>
      <li className={style.navListItem}>
        <Link href="/blog" passHref>
          <a className={`${theme.link} ${style.navListItemLink}`}>
            <span className={theme.linkUnderline}>Блог</span>
          </a>
        </Link>
      </li>
      <li className={style.navListItem}>
        <a
          className={`${theme.link} ${style.navListItemLink}`}
          href="https://karpov.courses/frontend"
          target="_blank"
          rel="noreferrer"
        >
          <span className={theme.linkUnderline}>Курс по фронтенду</span>
        </a>
      </li>
      <li className={style.navListItem}>
        <a
          className={`${theme.link} ${style.navListItemLink}`}
          href="https://www.udemy.com/course/react-redux-2020/?referralCode=0C74053563423A398A3C"
          target="_blank"
          rel="noreferrer"
        >
          <span className={theme.linkUnderline}>Курс по реакту</span>
        </a>
      </li>
      <li className={style.navListItem}>
        <a
          className={`${theme.link} ${style.navListItemLink}`}
          href="https://t.me/sexy_frontend"
          target="_blank"
          rel="noreferrer"
        >
          <span className={theme.linkUnderline}>Канал в телеграме</span>
        </a>
      </li>
    </ul>
  </nav>
)
