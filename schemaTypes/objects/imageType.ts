import {defineField, defineType} from 'sanity'
import {imageValidator} from '../../utils/imageValidator'

export const imageType = defineType({
  name: 'imageType',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({
      name: 'imageUrl',
      title: 'Image Url',
      type: 'url',
      validation: (rule) => rule.required().custom(imageValidator),
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image Atl',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
