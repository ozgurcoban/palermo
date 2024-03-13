import { defineField, defineType } from "sanity";
import { supportedLanguages } from "./lang-config";

export default defineType({
  name: "categories",
  title: "Menu Categories",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
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
      name: "description",
      title: "Description",
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
      name: "sub_categories",
      title: "Sub Categories",
      description: "Add the sub-categories list (optional)",
      type: "array",
      of: [{ type: "reference", to: { type: "subcategories" } }],
    }),
    defineField({
      name: "menu_list",
      title: "Menu List",
      type: "array",
      of: [{ type: "reference", to: { type: "foods" } }],
      description:
        "In case you have foods not belong to a sub-category (for example: Extra+) add them here",
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "description.en",
    },
  },
});
