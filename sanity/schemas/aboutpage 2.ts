import { defineArrayMember, defineField, defineType } from "sanity";
import { supportedLanguages } from "./lang-config";

export default defineType({
  name: "about",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      validation: (Rule) =>
        Rule.custom((images) =>
          (images ?? []).length <= 3 
            ? true
            : {
                message: "You can't add more than 3 images to the About hero",
              }
        ),
      of: [
        defineArrayMember({
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "banner",
      title: "Banner Section",
      type: "array",
      description: "Enter the banner texts",
      of: [
        defineArrayMember({
          type: "object",
          title: "Text",
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
      ],
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      description: "Add in order just 4 about sections ",
      of: [defineArrayMember({ type: "reference", to: { type: "sections" } })],
      validation: (Rule) =>
        Rule.custom((sections) =>
          (sections ?? []).length <= 4
            ? true
            : {
                message: "You can't add more than 4 sections to the About page",
              }
        ),
    }),
  ],
  preview: {
    prepare(selection) {
      return { ...selection, title: "About Page Content" };
    },
  },
});
