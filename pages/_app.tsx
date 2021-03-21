import { Fragment, FC } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import 'normalize.css'

import '../styles/globals.css'
import { isDev } from '../helpers/env'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Fragment>
      <Head>
        <title>Дима Безуглый</title>
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ru_RU" />
        <meta name="twitter:card" content="summary_large_image" />

        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        {!isDev() && (
          <Fragment>
            <meta name="yandex-verification" content="892f090ef843257d" />
            {/* Yandex.Metrika counter */}
            <script
              dangerouslySetInnerHTML={{
                __html: `(function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter31371433 = new Ya.Metrika2({ id:31371433, clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true, trackHash:true }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = "https://mc.yandex.ru/metrika/tag.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks2");`,
              }}
            />
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<div><img src="https://mc.yandex.ru/watch/31371433" style="position:absolute; left:-9999px;" alt="" /></div>`,
              }}
            />
            {/* VK Pixel */}
            <script
              dangerouslySetInnerHTML={{
                __html: `!function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://vk.com/js/api/openapi.js?167",t.onload=function(){VK.Retargeting.Init("VK-RTRG-482648-b8E5X"),VK.Retargeting.Hit()},document.head.appendChild(t)}();`,
              }}
            />
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<img src="https://vk.com/rtrg?p=VK-RTRG-482648-b8E5X" style="position:fixed; left:-999px;" alt=""/>`,
              }}
            />
          </Fragment>
        )}
      </Head>

      <Component {...pageProps} />
    </Fragment>
  )
}

export default App
