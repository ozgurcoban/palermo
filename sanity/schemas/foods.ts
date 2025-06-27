import { defineField, defineType } from "sanity";
import { supportedLanguages } from "./lang-config";

export default defineType({
  name: "foods",
  title: "Maträtter",
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
      validation: Rule =>
        Rule.custom(fields => {
          if (!fields?.price) {
            return "Vänligen ange ett pris";
          }
          return true;
        }),
      fields: [
        defineField({
          title: "Pris",
          description: "Ange pris per enhet",
          name: "price",
          type: "number",
          validation: Rule => Rule.required(),
        }),
        defineField({
          title: "Hämtpris",
          description: "Ange pris per enhet",
          name: "takeawayPrice",
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
      description: "Ange ett speciellt märke för rätten",
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "description.en",
    },
  },
});
