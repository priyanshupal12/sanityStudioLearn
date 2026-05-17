import {defineField, defineType} from 'sanity'
import {imageValidator} from '../../utils/imageValidator'
import type {ImageParent} from '../../types'

export const imageType = defineType({
  name: 'imageType',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({
      name: 'imageType',
      title: 'Image Type',
      type: 'string',
      options: {
        list: [
          {title: 'Image Url', value: 'url'},
          {title: 'upload Image', value: 'upload'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'imageUrl',
      title: 'Image Url',
      type: 'url',
      hidden: ({parent}: {parent?: ImageParent}) => parent?.imageType !== 'url',
      validation: (rule) => rule.custom(imageValidator),
    }),

    defineField({
      name: 'imageUpload',
      title: 'Image Upload',
      type: 'image',
      hidden: ({parent}: {parent?: ImageParent}) => parent?.imageType !== 'upload',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as ImageParent
          if (parent?.imageType !== 'upload') {
            return true
          }
          if (!value?.asset?._ref) {
            return 'please! upload an image'
          }
          return true
        }),
    }),

    defineField({
      name: 'imageAlt',
      title: 'Image Atl',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
