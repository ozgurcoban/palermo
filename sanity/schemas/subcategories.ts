import { defineField, defineType } from "sanity";
import { supportedLanguages } from "./lang-config";

export default defineType({
  name: "subcategories",
  title: "Meny underkategorier",
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
      name: "menu_list",
      title: "Menylista",
      description: "Lägg till maträtter som tillhör denna underkategori (valfritt)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "foods" }, { type: "wines" }] }],
      validation: Rule =>
        Rule.custom(foods =>
          (foods ?? []).length > 0
            ? true
            : {
                message:
                  "Menylistan är obligatorisk, vänligen lägg till minst en artikel",
              }
        ),
    }),
  ],
  preview: {
    select: {
      title: "title.sv",
      subtitle: "description.sv",
    },
  },
});
