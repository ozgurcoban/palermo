import {defineArrayMember, defineField, defineType} from 'sanity'
import {supportedLanguages} from './lang-config'

export default defineType({
  name: 'home',
  title: 'Home Page',
  type: 'document',
  fields: [
    // Define the gallery section
    defineField({
      name: 'gallery_section',
      title: 'Gallery Section',
      type: 'object',
      description: 'Enter the gallery section data',
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
            }),
          ),
        }),
        defineField({
          name: 'images',
          title: 'Gallery Images',
          type: 'array',
          description: 'Enter the gallery images',
          of: [
            defineArrayMember({
              type: 'image',
              name: 'image',
              title: 'Image',
              options: {
                hotspot: true,
              },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare(selection) {
      return {...selection, title: 'Home Page Content'}
    },
  },
})
