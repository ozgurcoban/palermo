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
    // Define the intro section
    defineField({
      name: 'intro_section',
      title: 'Intro Section',
      type: 'object',
      description: 'Intro section with text and image',
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
          name: 'highlights',
          title: 'Highlights',
          type: 'array',
          description: 'Add 3 highlights with subtitle and description',
          validation: Rule => Rule.required().min(3).max(3),
          of: [
            defineArrayMember({
              type: 'object',
              name: 'highlight',
              fields: [
                defineField({
                  name: 'subtitle',
                  title: 'Subtitle',
                  type: 'object',
                  fieldsets: [
                    {
                      title: 'Translations',
                      name: 'translations',
                      options: {collapsible: true},
                    },
                  ],
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
                  fields: supportedLanguages.map((lang) =>
                    defineField({
                      title: lang.title,
                      name: lang.id,
                      type: 'text',
                      rows: 3,
                      fieldset: lang.isDefault ? undefined : 'translations',
                    }),
                  ),
                }),
              ],
              preview: {
                select: {
                  title: 'subtitle.sv',
                  subtitle: 'description.sv'
                },
              },
            }),
          ],
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative text',
              type: 'object',
              description: 'Important for SEO and accessibility.',
              fieldsets: [
                {
                  title: 'Translations',
                  name: 'translations',
                  options: {collapsible: true},
                },
              ],
              fields: supportedLanguages.map((lang) =>
                defineField({
                  title: lang.title,
                  name: lang.id,
                  type: 'string',
                  fieldset: lang.isDefault ? undefined : 'translations',
                }),
              ),
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
