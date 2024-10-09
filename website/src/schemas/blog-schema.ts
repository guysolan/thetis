export interface detailsI {
  title: string
  description: string
  created_time: Date
  last_edited_time: Date
  cover_image: string
  read_time: number
  author: string
  tags: string[]
  image_alt: string
  articleBody?: string
}

export const blogSchema = (details: detailsI): any => {
  const authorObject =
    details?.author === 'matt'
      ? {
          '@type': 'Person',
          name: 'Matthew Solan',
          url: 'https://www.londonfootandanklecentre.co.uk/staff/matthew-solan/',
        }
      : {}
  const schemaObject = {
    '@context': 'http://schema.org',
    '@type': 'BlogPosting',
    image: 'http://example.com/images/image.jpg',
    url: 'http://example.com/blog/post',
    headline: details?.title,
    dateCreated: details?.created_time,
    datePublished: details?.created_time,
    dateModified: details?.last_edited_time,
    inLanguage: 'en-US',
    isFamilyFriendly: 'true',
    copyrightYear: '2023',
    copyrightHolder: '',
    author: authorObject,
    publisher: {
      '@type': 'Organization',
      name: 'Thetis Medical',
      url: 'https://thetismedical.com',
      logo: {
        '@type': 'ImageObject',
        url: 'http://thetismedical.com/images/achilles-drawing-image.png',
        width: '400',
        height: '600',
      },
    },
    mainEntityOfPage: 'True',
    keywords: ['achilles', 'tendon', 'rupture', 'recovery'],
    genre: ['medical', 'physio'],
    articleSection: 'Blog',
    articleBody: details?.articleBody,
  }

  return schemaObject
}
