import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classnames from 'classnames'

import style from './styles.module.css'
import theme from '../../styles/theme.module.css'

type Props = {
  className?: string
}

export const NavList: FC<Props> = ({ className }) => {
  const router = useRouter()
  const isBlog = router.pathname.startsWith('/blog')
  const isReactCourse = router.pathname.startsWith('/react-redux-2020')

  return (
    <nav>
      <ul className={classnames(style.navList, className)}>
        <li className={style.navListItem}>
          <Link href="/blog" passHref>
            <a
              className={classnames(theme.link, style.navListItemLink, {
                [style.navListItemLinkActive]: isBlog,
              })}
            >
              <span className={!isBlog ? theme.linkUnderline : ''}>Блог</span>
            </a>
          </Link>
        </li>
        <li className={style.navListItem}>
          <Link href="/react-redux-2020" passHref>
            <a
              className={classnames(theme.link, style.navListItemLink, {
                [style.navListItemLinkActive]: isReactCourse,
              })}
            >
              <span className={!isReactCourse ? theme.linkUnderline : ''}>Реакт для джунов</span>
            </a>
          </Link>
        </li>
        <li className={style.navListItem}>
          <a
            className={classnames(theme.link, style.navListItemLink)}
            href="https://karpov.courses/frontend"
            target="_blank"
            rel="noreferrer"
          >
            <span className={theme.linkUnderline}>Фронденд для миддлов</span>
          </a>
        </li>
        <li className={style.navListItem}>
          <a
            className={classnames(theme.link, style.navListItemLink)}
            href="https://t.me/sexy_frontend"
            target="_blank"
            rel="noreferrer"
          >
            <span className={theme.linkUnderline}>Телеграм-канал</span>
          </a>
        </li>
      </ul>
    </nav>
  )
}
