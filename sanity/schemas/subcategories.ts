import { defineField, defineType } from "sanity";
import { supportedLanguages } from "./lang-config";

export default defineType({
  name: "subcategories",
  title: "Menu Sub Categories",
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
      name: "menu_list",
      title: "Menu List",
      description: "Add the foods that belongs to this sub-category (optional)",
      type: "array",
      of: [{ type: "reference", to: { type: "foods" } }],
      validation: (Rule) =>
        Rule.custom((foods) =>
          (foods ?? []).length > 0
            ? true
            : {
                message:
                  "The menu list is required, please add at least one food",
              }
        ),
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "description.en",
    },
  },
});
