import {defineField, defineType} from 'sanity'
import {supportedLanguages} from './lang-config'

export default defineType({
  name: 'lunch',
  title: 'Lunchsida',
  type: 'document',
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
          initialValue: lang.id === 'sv' ? 'i kirens lunch' : 'Lunchins',
        }),
      ),
    }),
    defineField({
      name: 'timeInfo',
      title: 'Tidsinformation',
      type: 'object',
      fields: [
        defineField({
          name: 'days',
          title: 'Dagar',
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
              initialValue: lang.id === 'sv' ? 'Måndag - Fredag' : 'Monday - Friday',
            }),
          ),
        }),
        defineField({
          name: 'hours',
          title: 'Tider',
          type: 'string',
          initialValue: '11:00 - 15:00',
        }),
      ],
    }),
    // Dagens lunch
    defineField({
      name: 'dagensLunch',
      title: 'Dagens Lunch',
      type: 'object',
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
              initialValue: lang.id === 'sv' ? 'Dagens Lunch' : 'Lunch of the Day',
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
              type: 'string',
              fieldset: lang.isDefault ? undefined : 'translations',
              initialValue:
                lang.id === 'sv'
                  ? 'Välj mellan våra 9 dagliga specialiteter'
                  : 'Choose from our 9 daily specials',
            }),
          ),
        }),
        defineField({
          name: 'price',
          title: 'Pris',
          type: 'number',
          initialValue: 119,
          validation: (Rule) => Rule.required().positive(),
          description: 'Pris för dagens lunch',
        }),
        defineField({
          name: 'items',
          title: 'Lunchrätter',
          type: 'array',
          validation: (Rule) => Rule.required().min(1),
          of: [
            {
              type: 'object',
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
                      validation: (Rule) => Rule.required(),
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
                      type: 'string',
                      fieldset: lang.isDefault ? undefined : 'translations',
                    }),
                  ),
                }),
              ],
              preview: {
                select: {
                  title: 'title.sv',
                  subtitle: 'description.sv',
                },
                prepare({title, subtitle}) {
                  return {
                    title: title || 'Lunch rätt',
                    subtitle: subtitle || 'Ingen beskrivning',
                  }
                },
              },
            },
          ],
        }),
      ],
    }),

    // Lunchpizza
    defineField({
      name: 'lunchPizza',
      title: 'Lunchpizza',
      type: 'object',
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
              initialValue: lang.id === 'sv' ? 'Lunchpizza' : 'Lunch Pizza',
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
              type: 'string',
              fieldset: lang.isDefault ? undefined : 'translations',
              initialValue: lang.id === 'sv' ? 'Alla standardpizzor' : 'All standard pizzas',
            }),
          ),
        }),
        defineField({
          name: 'price',
          title: 'Pris',
          type: 'number',
          validation: (Rule) => Rule.required().positive(),
          initialValue: 119,
        }),
        defineField({
          name: 'subcategoryRef',
          title: 'Pizza underkategori',
          type: 'reference',
          to: [{type: 'subcategories'}],
          description: 'Välj standardpizza underkategori',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    // Månadens tips
    defineField({
      name: 'monthlySpecial',
      title: 'Månadens tips',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Rubrik',
          type: 'object',
          fields: supportedLanguages.map((lang) =>
            defineField({
              title: lang.title,
              name: lang.id,
              type: 'string',
              initialValue: lang.id === 'sv' ? 'Månadens tips' : 'Monthly Special',
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
              type: 'string',
              fieldset: lang.isDefault ? undefined : 'translations',
              initialValue:
                lang.id === 'sv'
                  ? 'Vår kocks specialrekommendation denna månad'
                  : "Our chef's special recommendation this month",
            }),
          ),
        }),
        defineField({
          name: 'price',
          title: 'Pris',
          type: 'number',
          validation: (Rule) => Rule.positive(), // Ta bort required
          initialValue: 159,
        }),
        defineField({
          name: 'dish',
          title: 'Rätt',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Rubrik',
              type: 'object',
              fields: supportedLanguages.map((lang) =>
                defineField({
                  title: lang.title,
                  name: lang.id,
                  type: 'string',
                  // INGEN validation här
                }),
              ),
            }),
            defineField({
              name: 'description',
              title: 'Beskrivning',
              type: 'object',
              fields: supportedLanguages.map((lang) =>
                defineField({
                  title: lang.title,
                  name: lang.id,
                  type: 'string',
                  // INGEN validation här
                }),
              ),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Lunchkonfiguration',
      }
    },
  },
})
