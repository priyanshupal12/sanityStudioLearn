import { defineField, defineType } from 'sanity'

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
      name: 'supportingText',
      title: 'Supporting Text',
      type: 'portableText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'array',
      of: [{ type: 'links' }]
    }),
    defineField({
      name: 'heroImage',
      title: 'Image',
      type: 'imageType',
    }),
  ],
})
