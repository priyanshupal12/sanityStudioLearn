import {defineField, defineType, defineArrayMember} from 'sanity'

export const siteHeader = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'brandLogo',
      title: 'Brand Logo',
      type: 'imageType',
    }),

    defineField({
      name: 'market',
      title: 'Market',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'locale',
      title: 'Locale',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'navigationItems',
      title: 'Navigation Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'links',
        }),
      ],
    }),
  ],
})
