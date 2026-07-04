import {defineField, defineType, defineArrayMember} from 'sanity'
import {TableIcon} from '../../utils/portableTextIcon'

export const tableType = defineType({
  name: 'tableType',
  title: 'Table',
  type: 'object',
  icon: TableIcon,
  fields: [
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'row',
          fields: [
            defineField({
              name: 'isHeader',
              title: 'Header row?',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'cells',
              title: 'Cells',
              type: 'array',
              of: [{type: 'string'}],
            }),
          ],
          preview: {
            select: {cells: 'cells', isHeader: 'isHeader'},
            prepare({cells, isHeader}) {
              return {
                title: isHeader ? '(header row)' : (cells ?? []).join(' | '),
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {caption: 'caption', rows: 'rows'},
    prepare({caption, rows}) {
      return {
        title: caption || 'Table',
        subtitle: `${(rows ?? []).length} rows`,
        media: TableIcon,
      }
    },
  },
})
