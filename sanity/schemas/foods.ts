import { defineField, defineType } from "sanity";
import { supportedLanguages } from "./lang-config";

export default defineType({
  name: "foods",
  title: "Foods List",
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
      fields: supportedLanguages.map((lang) =>
        defineField({
          title: lang.title,
          name: lang.id,
          type: "string",
          fieldset: lang.isDefault ? undefined : "translations",
          validation: (Rule) => Rule.required(),
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
      fields: supportedLanguages.map((lang) =>
        defineField({
          title: lang.title,
          name: lang.id,
          type: "string",
          fieldset: lang.isDefault ? undefined : "translations",
        })
      ),
    }),
    defineField({
      title: "Price",
      name: "price",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      fields: supportedLanguages.map((lang) =>
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
