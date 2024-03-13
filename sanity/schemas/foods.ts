import { defineField, defineType } from "sanity";
import { supportedLanguages } from "./lang-config";

export default defineType({
  name: "foods",
  title: "Food Items",
  type: "document",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "object",
      fieldsets: [
        {
          title: "Translations",
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
      title: "Description",
      name: "description",
      type: "object",
      fieldsets: [
        {
          title: "Translations",
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
      title: "Prices",
      validation: Rule =>
        Rule.custom(fields => {
          if (!fields?.price) {
            return "Please add a price";
          }
          return true;
        }),
      fields: [
        defineField({
          title: "Price",
          description: "Enter the price per unit",
          name: "price",
          type: "number",
          validation: Rule => Rule.required(),
        }),
        defineField({
          title: "Takeaway price",
          description: "Enter the price per unit",
          name: "takeawayPrice",
          type: "number",
        }),
      ],
    }),

    defineField({
      title: "Badge",
      name: "badge",
      type: "object",
      fieldsets: [
        {
          title: "Translations",
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
      description: "Enter a special badge for the food",
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "description.en",
    },
  },
});
