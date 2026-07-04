import {defineArrayMember, defineField, defineType} from 'sanity'
import {
  SubscriptIcon,
  SuperscriptIcon,
  SmallTextIcon,
  HighlightIcon,
  MarkIcon,
  TextColorIcon,
  LinkIcon,
} from '../../utils/portableTextIcon'

export const portableText = defineType({
  name: 'portableText',
  title: 'Portable Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Underline', value: 'underline'},
          {title: 'Strike', value: 'strike-through'},
          {title: 'Code', value: 'code'},
          {title: 'Highlight', value: 'highlight', icon: HighlightIcon},
          {title: 'Subscript', value: 'sub', icon: SubscriptIcon},
          {title: 'Superscript', value: 'sup', icon: SuperscriptIcon},
          {title: 'Small', value: 'small', icon: SmallTextIcon},
          {title: 'Mark', value: 'mark', icon: MarkIcon},
        ],
        annotations: [
          defineField({
            name: 'link',
            title: 'Link',
            type: 'links',
            icon: LinkIcon,
          }),
          defineField({
            name: 'textColor',
            title: 'Text Color',
            type: 'color',
            icon: TextColorIcon,
          }),
        ],
      },
    }),
    defineArrayMember({
      type: 'imageType',
    }),
    defineArrayMember({
      type: 'tableType',
    }),
  ],
})
