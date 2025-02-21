import {defineField, defineType} from 'sanity'
import {supportedLanguages} from './lang-config'

export default defineType({
  name: 'sections',
  title: 'About Sections',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fieldsets: [
        {
          title: 'Translations',
          name: 'translations',
          options: {collapsible: true},
        },
      ],
      // Dynamically define one field per language
      fields: supportedLanguages.map((lang) =>
        defineField({
          title: lang.title,
          name: lang.id,
          type: 'string',
          fieldset: lang.isDefault ? undefined : 'translations',
          validation: (Rule) => Rule.required(),
        }),
      ),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fieldsets: [
        {
          title: 'Translations',
          name: 'translations',
          options: {collapsible: true},
        },
      ],
      // Dynamically define one field per language
      fields: supportedLanguages.map((lang) =>
        defineField({
          title: lang.title,
          name: lang.id,
          type: 'string',
          fieldset: lang.isDefault ? undefined : 'translations',
          validation: (Rule) => Rule.required(),
        }),
      ),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'description.en',
      media: 'image',
    },
  },
})
