import { defineArrayMember, defineField, defineType } from "sanity";
import { supportedLanguages } from "./lang-config";

export default defineType({
  name: "contact",
  title: "Contact Section",
  type: "document",
  fields: [
    defineField({
      name: "contact_infos",
      title: "Where to find us",
      type: "object",
      fields: [
        defineField({
          name: "address",
          title: "Address",
          type: "string",
        }),
        defineField({
          name: "telephone",
          title: "Telephone",
          type: "string",
        }),
        defineField({
          name: "email",
          title: "Email",
          type: "string",
        }),
        defineField({
          name: "facebook",
          title: "Facebook Link",
          type: "string",
        }),
        defineField({
          name: "instagram",
          title: "Instagram Link",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "opening_hours",
      title: "Opening Hours",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "day",
              title: "Day",
              description: "Enter the day, e.g: Mon or Tue - Fri",
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
              name: "time",
              title: "Time",
              description:
                "Enter the time, e.g: 11:00 - 01:00 or 11:00 - 03:00",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare(selection) {
      return { ...selection, title: "Contact Section Content" };
    },
  },
});
