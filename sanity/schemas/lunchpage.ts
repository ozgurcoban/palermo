import {defineField, defineType} from 'sanity'
import {supportedLanguages} from './lang-config'

export default defineType({
  name: 'lunch',
  title: 'Lunch Page',
  type: 'document',
  fields: [
    // Hero section med bilder (liknande about-sidan)
    defineField({
      name: 'hero_image',
      title: 'Hero Image',
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
    }),

    // Banner för öppettider eller specialerbjudanden
    defineField({
      name: 'banner',
      title: 'Banner Section',
      type: 'array',
      description: 'Enter banner texts (e.g., lunch hours)',
      of: [
        {
          type: 'object',
          title: 'Text',
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
        },
      ],
    }),

    // Introduktionstext
    defineField({
      name: 'introduction',
      title: 'Introduction Section',
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
              fieldset: lang.isDefault ? undefined : 'translations',
            }),
          ),
        }),
      ],
    }),

    // Pizza lunch pris
    defineField({
      name: 'pizza_price',
      title: 'Pizza Lunch Price',
      type: 'number',
      description: 'Price for pizzas during lunch',
      validation: (Rule) => Rule.required(),
    }),

    // Varmrätter
    defineField({
      name: 'warm_dishes',
      title: 'Warm Dishes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Dish Name',
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
            defineField({
              name: 'price',
              title: 'Price',
              type: 'number',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'available_days',
              title: 'Available Days',
              type: 'array',
              of: [{type: 'string'}],
              options: {
                list: [
                  {title: 'Monday', value: 'monday'},
                  {title: 'Tuesday', value: 'tuesday'},
                  {title: 'Wednesday', value: 'wednesday'},
                  {title: 'Thursday', value: 'thursday'},
                  {title: 'Friday', value: 'friday'},
                  {title: 'Saturday', value: 'saturday'},
                  {title: 'Sunday', value: 'sunday'},
                ],
              },
            }),
          ],
        },
      ],
      validation: (Rule) =>
        Rule.custom((dishes) =>
          (dishes ?? []).length === 8
            ? true
            : {
                message: 'You must add exactly 8 warm dishes',
              },
        ),
    }),

    // Månadens tips
    defineField({
      name: 'monthly_special',
      title: 'Monthly Special',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Dish Name',
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
              type: 'text',
              fieldset: lang.isDefault ? undefined : 'translations',
            }),
          ),
        }),
        defineField({
          name: 'price',
          title: 'Price',
          type: 'number',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'image',
          title: 'Dish Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),

    // Lunch hours info
    defineField({
      name: 'lunch_hours',
      title: 'Lunch Hours',
      type: 'object',
      fields: [
        defineField({
          name: 'weekdays',
          title: 'Weekdays',
          type: 'string',
          description: 'e.g., 11:00 - 14:00',
        }),
        defineField({
          name: 'weekends',
          title: 'Weekends',
          type: 'string',
          description: 'e.g., 12:00 - 15:00',
        }),
      ],
    }),
  ],
  preview: {
    prepare(selection) {
      return {...selection, title: 'Lunch Page Content'}
    },
  },
})
