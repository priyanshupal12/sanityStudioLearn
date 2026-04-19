import {defineField, defineType} from 'sanity';

export const linkType = defineType({
  name: 'links',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      initialValue: 'internal',
      options: {
        list: [
          {title: 'Internal', value: 'internal'},
          {title: 'Extarnal', value: 'external'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'internalReference',
      title: 'Internal Reference',
      type: 'reference',
      to: [{type: 'PageType'}, {type: 'post'}],
      hidden: ({parent}) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      hidden: ({parent}) => parent?.linkType !== 'external',
      validation: (rule) =>
        rule
          .custom((value, context) => {
            const parent = context.parent as {linkType: string} | undefined
            if (parent?.linkType === 'external') {
              if (!value) return 'External Url is Required'
              if (!/^https:\/\//.test(value)) {
                return 'Must use https protocal'
              }
            }
            return true
          })
          .uri({
            scheme: ['http', 'https', 'mailto', 'tel'],
            allowRelative: false,
          }),
    }),
    defineField({
      name: 'openNewTab',
      title: 'Open New Tap',
      type: 'boolean',
      initialValue: false,
      validation: (rule) => rule.required(),
    }),
  ],
  validation: (rule) =>
    rule.custom((value) => {
      const link = value as
        | {
            linkType?: string
            internalReference: {_ref?: string}
            externalLink?: URL
          }
        | undefined

      if (!link) return true

      if (link.linkType === 'internal' && !link?.internalReference?._ref) {
        return 'Internal Link Required Internal Reference'
      }

      if (link.linkType === 'external' && !link?.externalLink) {
        return 'External Link Required External URL'
      }
      return true
    }),
  preview: {
    select: {
      label: 'label',
      linkType: 'linkType',
      internalReference: 'internalReference',
      externalUrl: 'externalUrl',
    },
    prepare: ({label, linkType, internalReference, externalUrl}) => ({
      title: label ?? 'Untitled Link',
      subtitle:
        linkType === 'internal'
          ? internalReference?._ref
            ? 'Internal reference selected'
            : 'No internal reference'
          : externalUrl || 'No external URL',
    }),
  },
})
