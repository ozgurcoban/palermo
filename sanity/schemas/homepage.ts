import {defineArrayMember, defineField, defineType} from 'sanity'
import {supportedLanguages} from './lang-config'

export default defineType({
  name: 'home',
  title: 'Startsida',
  type: 'document',
  fields: [
    // Definiera introduktionssektionen
    defineField({
      name: 'intro_section',
      title: 'Introduktionssektion',
      type: 'object',
      description: 'Introduktionssektion med text och bild',
      fields: [
        defineField({
          name: 'title',
          title: 'Rubrik',
          type: 'object',
          fieldsets: [
            {
              title: 'Översättningar',
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
          title: 'Höjdpunkter',
          type: 'array',
          description: 'Lägg till 3 höjdpunkter med underrubrik och beskrivning',
          validation: Rule => Rule.required().min(3).max(3),
          of: [
            defineArrayMember({
              type: 'object',
              name: 'highlight',
              fields: [
                defineField({
                  name: 'subtitle',
                  title: 'Underrubrik',
                  type: 'object',
                  fieldsets: [
                    {
                      title: 'Översättningar',
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
                  title: 'Beskrivning',
                  type: 'object',
                  fieldsets: [
                    {
                      title: 'Översättningar',
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
          title: 'Bild',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternativ text',
              type: 'object',
              description: 'Viktigt för SEO och tillgänglighet.',
              fieldsets: [
                {
                  title: 'Översättningar',
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
    // Definiera gallerisektionen
    defineField({
      name: 'gallery_section',
      title: 'Gallerisektion',
      type: 'object',
      description: 'Ange data för gallerisektionen',
      fields: [
        defineField({
          name: 'title',
          title: 'Rubrik',
          type: 'object',
          fieldsets: [
            {
              title: 'Översättningar',
              name: 'translations',
              options: {collapsible: true},
            },
          ],
          // Definiera dynamiskt ett fält per språk
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
              title: 'Översättningar',
              name: 'translations',
              options: {collapsible: true},
            },
          ],
          // Definiera dynamiskt ett fält per språk
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
          title: 'Galleriblider',
          type: 'array',
          description: 'Lägg till galleriblider',
          of: [
            defineArrayMember({
              type: 'image',
              name: 'image',
              title: 'Bild',
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
      return {...selection, title: 'Startsidans innehåll'}
    },
  },
})
