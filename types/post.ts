export interface ArticleItemStrapi {
  id: number
  attributes: {
    title: string
    slug: string
    published: string // // yyyy-mm-dd
    ogImageSrc: string
    content: string
    createdAt: string // yyyy-MM-ddTHH:mm:ss-0Z00
    updatedAt: string // yyyy-MM-ddTHH:mm:ss-0Z00
    publishedAt: string // yyyy-MM-ddTHH:mm:ss-0Z00
  }
}

export interface ArticlesStrapi {
  data: ArticleItemStrapi[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
