import {defineArrayMember, defineField, defineType} from 'sanity'
import {supportedLanguages} from './lang-config'

export default defineType({
  name: 'faq',
  title: 'FAQ - Vanliga frågor',
  type: 'document',
  description: 'Här hanterar du vanliga frågor som visas på hemsidan. Du måste ha mellan 5-7 frågor. I svaren kan du använda {{openingHours}} eller {{lunchInfo}} för att automatiskt visa aktuella öppettider eller lunchpriser.',
  fields: [
    defineField({
      name: 'questions',
      title: 'Frågor och svar',
      type: 'array',
      description: 'Lägg till 5-7 vanliga frågor här. Dra för att ändra ordning. I svaren kan du använda {{openingHours}} eller {{lunchInfo}} för automatisk information.',
      validation: (Rule) => Rule.min(5).max(7).error('Du måste ha mellan 5 och 7 frågor'),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
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
              name: 'answer',
              title: 'Answer',
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
                  rows: 4,
                  fieldset: lang.isDefault ? undefined : 'translations',
                  validation: (Rule) => Rule.required(),
                  description: lang.id === 'sv' 
                    ? 'Tips: Använd {{openingHours}} för öppettider eller {{lunchInfo}} för lunchinfo var som helst i texten'
                    : 'Tip: Use {{openingHours}} for opening hours or {{lunchInfo}} for lunch info anywhere in the text',
                }),
              ),
            }),
            defineField({
              name: 'showCTA',
              title: 'Visa knapp',
              type: 'boolean',
              description: 'Visa en klickbar knapp under svaret',
              initialValue: false,
            }),
            defineField({
              name: 'ctaType',
              title: 'Knapptyp',
              type: 'string',
              description: 'Välj vart knappen ska leda',
              options: {
                list: [
                  {title: 'Lunchmeny', value: 'lunch'},
                  {title: 'Leveransalternativ', value: 'delivery'},
                  {title: 'Meny', value: 'menu'},
                  {title: 'Kontakt', value: 'contact'},
                ],
              },
              hidden: ({parent}) => !parent?.showCTA,
            }),
            defineField({
              name: 'ctaText',
              title: 'Knapptext',
              type: 'object',
              description: 'Text som visas på knappen',
              hidden: ({parent}) => !parent?.showCTA,
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
          preview: {
            select: {
              title: 'question.sv',
              subtitle: 'answer.sv',
            },
            prepare({title, subtitle}) {
              return {
                title: title || 'Ny fråga',
                subtitle: subtitle ? subtitle.substring(0, 60) + '...' : '',
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'FAQ - Vanliga frågor',
        subtitle: 'Hantera vanliga frågor som visas på hemsidan'
      }
    },
  },
})