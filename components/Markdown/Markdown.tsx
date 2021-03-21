import { FC } from 'react';
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism } from "react-syntax-highlighter";
import highlighterStyle from "../../helpers/highlighterStyle";

import style from './styles.module.css';

const renderers = {
  code: ({ language, value }) => {
    if (language === 'idea') {
      return <p className={style.idea}>{value}</p>;
    }

    return <Prism style={highlighterStyle} language={language} children={value} />;
  },
  image: ({ src, alt }) => {
    return (
      <span className={`js-image ${style.imageContainer}`}>
        <img className={style.image} src={src} alt={alt} />
        {alt && <span className={style.signature} dangerouslySetInnerHTML={{ __html: alt }} />}
      </span>
    );
  }
};

export const Markdown: FC = ({ children }) => {
    return (
    <div className={style.markdown}>
      {/* @ts-ignore */}
      <ReactMarkdown allowDangerousHtml plugins={[gfm]} renderers={renderers}>{children}</ReactMarkdown>
    </div>
  )
}
