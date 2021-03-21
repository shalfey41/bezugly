import { FC } from 'react'
import Link from 'next/link'

import { NavList } from '../NavList/NavList'
import style from './styles.module.css'
import theme from '../../styles/theme.module.css'

export const Header: FC = () => {
  return (
    <header className={theme.header}>
      <div className={`${theme.pageContainer} ${style.header}`}>
        <Link href="/" passHref>
          <a className={`${theme.link} ${style.logo}`}>
            <strong>Дима Безуглый</strong>
          </a>
        </Link>
        <NavList />
      </div>
    </header>
  )
}
