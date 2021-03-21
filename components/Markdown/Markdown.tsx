import { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { Prism } from 'react-syntax-highlighter'

import highlighterStyle from '../../helpers/highlighterStyle'
import style from './styles.module.css'

const renderers = {
  // eslint-disable-next-line react/display-name
  code: ({ language, value }) => {
    if (language === 'idea') {
      return <p className={style.idea}>{value}</p>
    }

    return <Prism style={highlighterStyle} language={language} children={value} />
  },
  // eslint-disable-next-line react/display-name
  paragraph: ({ children, node }) => {
    if (node?.children[0]?.type === 'image') {
      return children
    }

    return <p>{children}</p>
  },
  // eslint-disable-next-line react/display-name
  image: ({ src, alt }) => {
    return (
      <span className={style.imageContainer}>
        <img className={style.image} src={src} alt={alt} />
        {alt && <span className={style.signature} dangerouslySetInnerHTML={{ __html: alt }} />}
      </span>
    )
  },
}

export const Markdown: FC = ({ children }) => {
  return (
    <div className={style.markdown}>
      <ReactMarkdown allowDangerousHtml plugins={[gfm]} renderers={renderers}>
        {/* @ts-ignore */}
        {children}
      </ReactMarkdown>
    </div>
  )
}
