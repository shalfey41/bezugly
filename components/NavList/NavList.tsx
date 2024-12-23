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
              <span className={!isReactCourse ? theme.linkUnderline : ''}>
                Реакт для джунов (2020)
              </span>
            </a>
          </Link>
        </li>
        <li className={style.navListItem}>
          <Link href="https://www.linkedin.com/in/bezugly/" target="_blank" passHref>
            <a
              className={classnames(theme.link, style.navListItemLink, {
                [style.navListItemLinkActive]: isReactCourse,
              })}
            >
              <span className={!isReactCourse ? theme.linkUnderline : ''}>LinkedIn</span>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
