import { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { Prism } from 'react-syntax-highlighter'

import highlighterStyle from '../../helpers/highlighterStyle'
import style from './styles.module.css'

const renderers = {
  // eslint-disable-next-line react/display-name
  code: ({ language, value }) => {
    return <Prism style={highlighterStyle} language={language} children={value} />
  },
  // eslint-disable-next-line react/display-name
  blockquote: ({ children, node }) => {
    // Идея
    if (node?.children[0]?.children[0]?.value?.startsWith('💡')) {
      return (
        <p className={style.idea}>
          {node?.children[0]?.children[0]?.value.replace('💡', '').trim()}
        </p>
      )
    }

    return <blockquote>{children}</blockquote>
  },
  // eslint-disable-next-line react/display-name
  paragraph: ({ children, node }) => {
    try {
      // Если встроенное видео из ноушена
      if (
        node.children[0].children[0].value === 'image' &&
        node.children[0].url.startsWith('https://www.youtube.com/embed')
      ) {
        return (
          <iframe
            data-video="true"
            width="560"
            height="315"
            src={node.children[0].url}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )
      }
    } catch (error) {
      //
    }

    try {
      // Если встроенное embed codepen из ноушена
      if (
        node.children[0].children[0].value === 'bookmark' &&
        (node.children[0].url.startsWith('https://codepen.io/') ||
          node.children[0].url.startsWith('http://codepen.io/'))
      ) {
        return (
          <iframe
            data-video="true"
            height="300"
            scrolling="no"
            title="Codepen"
            src={node.children[0].url}
            frameBorder="no"
            loading="lazy"
          />
        )
      }
    } catch (error) {
      //
    }

    // Простое изображение
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
