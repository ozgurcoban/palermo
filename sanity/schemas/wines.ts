import { defineField, defineType } from "sanity";
import { supportedLanguages } from "./lang-config";

export default defineType({
  name: "wines",
  title: "Viner",
  type: "document",
  fields: [
    defineField({
      title: "Rubrik",
      name: "title",
      type: "object",
      fieldsets: [
        {
          title: "Översättningar",
          name: "translations",
          options: { collapsible: true },
        },
      ],
      // Dynamically define one field per language
      fields: supportedLanguages.map(lang =>
        defineField({
          title: lang.title,
          name: lang.id,
          type: "string",
          fieldset: lang.isDefault ? undefined : "translations",
          validation: Rule => Rule.required(),
        })
      ),
    }),
    defineField({
      title: "Beskrivning",
      name: "description",
      type: "object",
      fieldsets: [
        {
          title: "Översättningar",
          name: "translations",
          options: { collapsible: true },
        },
      ],
      // Dynamically define one field per language
      fields: supportedLanguages.map(lang =>
        defineField({
          title: lang.title,
          name: lang.id,
          type: "string",
          fieldset: lang.isDefault ? undefined : "translations",
        })
      ),
    }),
    defineField({
      type: "object",
      name: "priceSection",
      title: "Priser",
      fields: [
        defineField({
          title: "Pris per flaska",
          description: "Ange pris per flaska",
          name: "bottlePrice",
          type: "number",
          validation: Rule => Rule.required(),
        }),
        defineField({
          title: "Pris per glas",
          description: "Ange pris per glas",
          name: "glassPrice",
          type: "number",
          validation: Rule => Rule.required(),
        }),
        defineField({
          title: "Pris per karaff",
          description: "Ange pris per karaff",
          name: "carafePrice",
          type: "number",
        }),
      ],
    }),

    defineField({
      title: "Märke",
      name: "badge",
      type: "object",
      fieldsets: [
        {
          title: "Översättningar",
          name: "translations",
          options: { collapsible: true },
        },
      ],
      // Dynamically define one field per language
      fields: supportedLanguages.map(lang =>
        defineField({
          title: lang.title,
          name: lang.id,
          type: "string",
          fieldset: lang.isDefault ? undefined : "translations",
        })
      ),
      description: "Ange ett speciellt märke för vinet",
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "description.en",
    },
  },
});
