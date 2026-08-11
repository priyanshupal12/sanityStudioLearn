import {defineArrayMember, defineField, defineType} from 'sanity'
import {sectionArrayMember} from '../objects/sections/sectionArrayMember'
import type {MarketCode} from '../../types'
import {MARKET_LANGUAGES} from '../../utils/helper/marketLangHelper'
import {LanguageSelect} from '../../componets/LanguageSelect'

const MARKET_OPTIONS = (Object.keys(MARKET_LANGUAGES) as MarketCode[]).map((value) => ({
  title: value.toUpperCase(),
  value,
}))

// const LANGUAGE_OPTIONS = Array.from(
//   new Map(
//     Object.values(MARKET_LANGUAGES)
//       .flatMap(({languages}) => languages)
//       .map((language) => [language.value, language]),
//   ).values(),
// )

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
      //singleton this slug must not repeat for other docs of this doc type
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'market',
      title: 'Market',
      type: 'string',
      options: {
        list: MARKET_OPTIONS,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      components: {
        input: LanguageSelect,
      },
      // options: {
      //   list: LANGUAGE_OPTIONS,
      // },
      //this lang and market should be singleton accross this doc type meaning only one doc should have same lang and market combo
      validation: (rule) =>
        rule.required().custom((value, context) => {
          const parent = context.parent as {market?: MarketCode} | undefined
          const market = parent?.market
          if (!market) return true
          if (!value) return true
          const {languages} = MARKET_LANGUAGES[market]
          return languages.some((l) => l.value === value) || 'invalid language'
        }),
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
      subtitle: `Status ${subtitle ?? 'draft'}`,
    }),
  },
})
