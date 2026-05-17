import {defineType, defineField} from 'sanity'
import {sectionArrayMember} from '../objects/sections/sectionArrayMember'

export const sharedSectionType = defineType({
  name: 'sharedSection',
  title: 'Shared Sections',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'description',
      type: 'text',
    }),
    defineField({
      name: 'section',
      title: 'Section Content',
      type: 'array',
      of: sectionArrayMember,
      validation: (rule) => rule.required().min(1)
    }),
  ],
})
