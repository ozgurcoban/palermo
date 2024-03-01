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
      validation: Rule =>
        Rule.custom(fields => {
          if (!fields?.isWine && !fields?.price) {
            return "Price per unit is required";
          } else if (fields?.price && fields?.isWine) {
            return "Delete the price per unit field if the food item is a wine";
          } else if (
            fields?.isWine &&
            !fields.bottlePrice &&
            !fields.glassPrice
          ) {
            return "Bottle price & glass price is required for wine items";
          } else if (fields?.isWine && fields.price) {
            return "Delete the price per unit field if the food item is a wine";
          } else if (
            fields.bottlePrice &&
            fields.glassPrice &&
            fields.price &&
            fields.carafePrice
          ) {
            return "Delete either price per unit or wine prices fields";
          }
          return true; // Return true if all validations pass
        }),
      fieldsets: [
        {
          title: "Prices",
          name: "prices",
        },
      ],
      fields: [
        defineField({
          title: "Price",
          description: "Enter the price per unit",
          name: "price",
          type: "number",
          hidden: ({ parent }) => parent?.isWine,
        }),
        defineField({
          title: "Takeaway price",
          description: "Enter the price per unit",
          name: "takeawayPrice",
          type: "number",
          hidden: ({ parent }) => parent?.isWine,
        }),
        defineField({
          title: "Is Wine",
          description: "Check this if the food item is a wine",
          name: "isWine",
          type: "boolean",
        }),
        defineField({
          title: "Price per bottle",
          description: "Enter the price per bottle",
          name: "bottlePrice",
          type: "number",
          hidden: ({ parent }) => !parent?.isWine,
        }),
        defineField({
          title: "Price per glass",
          description: "Enter the price per glass",
          name: "glassPrice",
          type: "number",
          // group: "wine",
          hidden: ({ parent }) => !parent?.isWine,
        }),
        defineField({
          title: "Price per carafe",
          description: "Enter the carafe price",
          name: "carafePrice",
          type: "number",
          hidden: ({ parent }) => !parent?.isWine,
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
