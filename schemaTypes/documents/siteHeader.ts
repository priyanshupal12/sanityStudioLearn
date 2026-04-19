import {defineField, defineType} from 'sanity'

export const siteHeader = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'varients',
      title: 'Market-Locale Variants',
      type: 'array',
      of: [
        {
          type: 'varient',
        },
      ],
    }),
  ],
})
