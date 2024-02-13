import { defineArrayMember, defineField, defineType } from "sanity";

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
              type: "string",
            }),
            defineField({
              name: "time",
              title: "Time",
              description:
                "Enter the time, e.g: 11:00 - 01:00 or 11:00 - 03:00",
              type: "string",
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
