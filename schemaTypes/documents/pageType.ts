import {defineArrayMember, defineField, defineType} from 'sanity'
import {sectionArrayMember} from '../objects/sections/sectionArrayMember'

export const pageType = defineType({
  name: 'pageType',
  title: 'Page Type',
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'page',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishAt',
      title: 'Publish At (Read Only)',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'pageStatus',
      title: 'Page Status (Read Only)',
      type: 'string',
      initialValue: 'draft',
      readOnly: true,
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Published', value: 'published'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'section',
      title: 'Sections',
      type: 'array',
      of: [
        ...sectionArrayMember,
        defineArrayMember({
          name: 'sharedSection',
          title: 'Shared Sections',
          type: 'reference',
          to: [{type: 'sharedSection'}],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  validation: (rule) =>
    rule.custom((doc) => {
      if (!doc) return true
      if (doc.pageStatus === 'published' && !doc.publishAt)
        return 'publishAt required when published'
      return true
    }),
  preview: {
    select: {
      title: 'page',
      subtitle: 'pageStatus',
    },
    prepare: ({title, subtitle}) => ({
      title: title,
      subtitle: `Status ${subtitle ?? 'draft'}`
    }),
  },
})
