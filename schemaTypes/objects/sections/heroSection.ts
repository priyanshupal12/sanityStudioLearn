import {defineField, defineType} from 'sanity'

export const heroSectionType = defineType({
  name: 'heroSection',
  title: 'Hero section',
  type: 'object',
  fields: [
    defineField({
      name: 'internalName',
      title: 'Internal Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'portableText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'portableText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'debugTableOutsidePortableText',
      title: 'Debug Table Outside Portable Text',
      type: 'tableType',
    }),
    defineField({
      name: 'highlight',
      title: 'Key Highlinghts',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required().min(1).max(4),
    }),
    defineField({
      name: 'heroImage',
      title: 'Image',
      type: 'imageType',
    }),
  ],
})
