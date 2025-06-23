import {defineArrayMember, defineField, defineType} from 'sanity'
import {supportedLanguages} from './lang-config'

export default defineType({
  name: 'contact',
  title: 'Kontakt & öppettider',
  type: 'document',
  fields: [
    defineField({
      name: 'contact_infos',
      title: 'Contact Us Information',
      type: 'object',
      validation: Rule => Rule.required(),
      fields: [
        defineField({
          name: 'address',
          title: 'Address',
          type: 'string',
        }),
        defineField({
          name: 'telephone',
          title: 'Telephone',
          type: 'string',
          description: 'Svenskt telefonnummer med landskod (t.ex. +46 18 13 18 20)',
          initialValue: '+46 ',
          validation: (Rule) =>
            Rule.required()
              .error('Telefonnummer är obligatoriskt')
              .custom((value) => {
                if (!value || value.trim() === '' || value.trim() === '+46') {
                  return 'Telefonnummer är obligatoriskt'
                }

                // Regex för svenskt telefonnummer med +46
                const phoneRegex = /^\+46\s?(\d{2,3}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}|\d{8,10})$/

                if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                  return 'Ange ett giltigt svenskt telefonnummer med +46 (t.ex. +46 70 123 45 67)'
                }

                return true
              }),
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          description: 'E-postadress (t.ex. info@palermo.se)',
          validation: Rule => Rule.required()
            .error('E-postadress är obligatorisk')
            .custom((value) => {
              if (!value || value.trim() === '') {
                return 'E-postadress är obligatorisk'
              }
              
              // Regex för email-validering
              const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
              
              if (!emailRegex.test(value)) {
                return 'Ange en giltig e-postadress (t.ex. info@palermo.se)'
              }
              
              return true
            }),
        }),
        defineField({
          name: 'facebook',
          title: 'Facebook Link',
          type: 'string',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram Link',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'opening_hours',
      title: 'Opening Hours',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'day',
              title: 'Day',
              description: 'Enter the day, e.g: Mon or Tue - Fri',
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
              name: 'time',
              title: 'Time',
              description: 'Enter the time, e.g: 11:00 - 01:00 or 11:00 - 03:00',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'happy_hours',
      title: 'Happy Hours',
      type: 'object',
      fields: [
        defineField({
          name: 'days',
          title: 'Days',
          description: 'When is Happy Hours? e.g. "Every day" or "Mon-Fri"',
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
          name: 'time',
          title: 'Time',
          description: 'Happy Hours time, e.g: 15:00 - 22:00',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          description: 'Short description of Happy Hours offers',
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
  preview: {
    prepare(selection) {
      return {...selection, title: 'Kontakt & öppettider innehåll'}
    },
  },
})
