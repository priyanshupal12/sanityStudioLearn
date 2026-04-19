import {defineField, defineType} from 'sanity'

export const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'seoMetaTitle',
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'seoMetaDiscription',
      title: 'SEO Meta Discription',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'cononicalUrl',
      title: 'Cononical URL',
      type: 'url',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
    }),
  ],
})
