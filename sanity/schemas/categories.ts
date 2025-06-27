import { defineField, defineType } from "sanity";
import { supportedLanguages } from "./lang-config";

export default defineType({
  name: "categories",
  title: "Menykategorier",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Rubrik",
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
      name: "description",
      title: "Beskrivning",
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
      name: "sub_categories",
      title: "Underkategorier",
      description: "Lägg till listan med underkategorier (valfritt)",
      type: "array",
      of: [{ type: "reference", to: { type: "subcategories" } }],
    }),
    defineField({
      name: "menu_list",
      title: "Menylista",
      type: "array",
      of: [{ type: "reference", to: { type: "foods" } }],
      description:
        "Om du har maträtter som inte tillhör en underkategori (till exempel: Extra+) lägg till dem här",
    }),
  ],
  preview: {
    select: {
      title: "title.sv",
      subtitle: "description.sv",
    },
  },
});
