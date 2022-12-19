import * as https from 'https'
import { Client } from '@notionhq/client'

export default async function fetchNotionAssetFromBlockId(req, res) {
  if (!req.query.block_id) {
    return res.status(404).end()
  }

  const notion = new Client({ auth: process.env.NOTION_KEY })

  try {
    const block = await notion.blocks.retrieve({
      block_id: req.query.block_id,
    })

    if (!('image' in block)) {
      return res.status(404).end()
    }

    if (block.image.type !== 'file') {
      return res.status(400).end()
    }

    return https.get(block.image.file.url, (getResponse) => {
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
      }

      getResponse
        .pipe(res)
        .on('end', () => {
          res.end()
        })
        .on('error', (error) => {
          res.writeHead(500, error.toString())
          res.end()
        })
    })
  } catch (error) {
    return res.status(500).end()
  }
}
