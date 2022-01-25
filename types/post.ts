export interface StrapiImageFormat {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: null
  size: number
  width: number
  height: number
  provider_metadata: {
    public_id: string
    resource_type: string
  }
}

export interface StrapiImage {
  id: number
  attributes: {
    name: string
    alternativeText: string
    caption: string
    width: number
    height: number
    formats: {
      large: StrapiImageFormat
      small: StrapiImageFormat
      medium: StrapiImageFormat
      thumbnail: StrapiImageFormat
    }
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: null
    provider: string
    provider_metadata: {
      public_id: string
      resource_type: string
    }
    createdAt: string // yyyy-MM-ddTHH:mm:ss-0Z00
    updatedAt: string // yyyy-MM-ddTHH:mm:ss-0Z00
  }
}

export interface ArticleItemStrapi {
  id: number
  attributes: {
    title: string
    slug: string
    published: string // // yyyy-mm-dd
    content: string
    createdAt: string // yyyy-MM-ddTHH:mm:ss-0Z00
    updatedAt: string // yyyy-MM-ddTHH:mm:ss-0Z00
    publishedAt: string // yyyy-MM-ddTHH:mm:ss-0Z00
    ogImageSrc?: string
    thumbnail?: {
      data: StrapiImage | null
    }
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
