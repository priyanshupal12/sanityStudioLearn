import { defineField, defineType } from 'sanity'

export const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'seoMetaTitle',
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'seoMetaDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'imageType',
    }),
    defineField({
      name: 'sitemap',
      title: 'Sitemap',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'lastModified',
      title: 'Last Modified',
      type: 'datetime',
      initialValue: new Date().toISOString(),
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      initialValue: 0.5,
      validation: (rule) => rule.min(0).max(1),
    }),
    defineField({
      name: 'changefreq',
      title: 'Change Frequency',
      type: 'string',
      initialValue: 'weekly',
      options: {
        list: [
          { title: 'Daily', value: 'daily' },
          { title: 'Weekly', value: 'weekly' },
          { title: 'Monthly', value: 'monthly' },
          { title: 'Yearly', value: 'yearly' },
        ],
      },
    }),
    defineField({
      name: 'robots',
      title: 'Robots',
      type: 'string',
      initialValue: 'index-follow',
      options: {
        list: [
          { title: 'Index-Follow', value: 'index-follow' },
          { title: 'Noindex-Follow', value: 'noindex-follow' },
          { title: 'Index-Nofollow', value: 'index-nofollow' },
          { title: 'Noindex-Nofollow', value: 'noindex-nofollow' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'seoMetaTitle',
      subtitle: 'cononicalUrl',
    },
    prepare: ({ title, subtitle }) => ({
      title: title,
      subtitle: subtitle,
    }),
  },
})
