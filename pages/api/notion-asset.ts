import * as https from 'https'

export default function fetchNotionAssetOrGetFromCache(req, res) {
  if (!req.query.path) {
    res.status(404).end()
    return
  }

  const extraQuery = Object.entries(req.query)
    .filter(([name]) => name !== 'path')
    .map(([name, value]) => `${name}=${value}`)
    .join('&')
  const imagePath = `${req.query.path}&${extraQuery}`

  https.get(imagePath, (getResponse) => {
    const proxyHeader = (header: string) => {
      const value = getResponse.headers[header] || getResponse.headers[header.toLowerCase()]
      if (value) {
        res.setHeader(header, value)
      }
    }

    proxyHeader('Content-Type')
    proxyHeader('Content-Length')

    if (getResponse.statusCode === 200) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
      res.status(200)
    } else {
      res.status(getResponse.statusCode || 500)
    }

    getResponse
      .pipe(res)
      .on('end', () => {
        res.end()
      })
      .on('error', (err) => {
        res.writeHead(500, err.toString())
        res.end()
      })
  })
}
