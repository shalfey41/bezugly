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
};

export const Markdown = ({ children }) => {
  return (
    <div className={style.markdown}>
      <ReactMarkdown allowDangerousHtml plugins={[gfm]} renderers={renderers}>{children}</ReactMarkdown>
    </div>
  )
}
