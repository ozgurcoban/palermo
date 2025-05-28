import {defineField, defineType} from 'sanity'
import {supportedLanguages} from './lang-config'

export default defineType({
  name: 'lunch',
  title: 'Lunch Page',
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
      title: 'Time Information',
      type: 'object',
      fields: [
        defineField({
          name: 'days',
          title: 'Days',
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
              initialValue: lang.id === 'sv' ? 'Måndag - Fredag' : 'Monday - Friday',
            }),
          ),
        }),
        defineField({
          name: 'hours',
          title: 'Hours',
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
              initialValue: lang.id === 'sv' ? 'Dagens Lunch' : 'Lunch of the Day',
            }),
          ),
        }),
        defineField({
          name: 'price',
          title: 'Price',
          type: 'number',
          initialValue: 119,
          validation: (Rule) => Rule.required().positive(),
          description: 'Pris för dagens lunch',
        }),
        defineField({
          name: 'items',
          title: 'Lunch Items',
          type: 'array',
          validation: (Rule) => Rule.required().min(1),
          of: [
            {
              type: 'object',
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
              initialValue: lang.id === 'sv' ? 'Lunchpizza' : 'Lunch Pizza',
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
              type: 'string',
              fieldset: lang.isDefault ? undefined : 'translations',
              initialValue: lang.id === 'sv' ? 'Alla standardpizzor' : 'All standard pizzas',
            }),
          ),
        }),
        defineField({
          name: 'price',
          title: 'Price',
          type: 'number',
          validation: (Rule) => Rule.required().positive(),
          initialValue: 119,
        }),
        defineField({
          name: 'subcategoryRef',
          title: 'Pizza Subcategory',
          type: 'reference',
          to: [{type: 'subcategories'}],
          description: 'Select the standard pizza subcategory',
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
              initialValue: lang.id === 'sv' ? 'Månadens tips' : 'Monthly Special',
            }),
          ),
        }),
        defineField({
          name: 'price',
          title: 'Price',
          type: 'number',
          validation: (Rule) => Rule.required().positive(),
          initialValue: 159,
        }),
        defineField({
          name: 'dish',
          title: 'Dish',
          type: 'object',
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
    prepare() {
      return {
        title: 'Lunch Configuration',
      }
    },
  },
})
