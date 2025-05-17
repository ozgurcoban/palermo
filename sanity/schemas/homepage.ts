import {defineArrayMember, defineField, defineType} from 'sanity'
import {supportedLanguages} from './lang-config'

export default defineType({
  name: 'home',
  title: 'Home Page',
  type: 'document',
  fields: [
    // Define the banner section
    defineField({
      name: 'banner',
      title: 'Banner Section',
      type: 'array',
      description: 'Enter the banner texts',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Text',
          fieldsets: [
            {
              title: 'Translations',
              name: 'translations',
              options: {collapsible: true},
            },
          ],
          // Dynamically define one field per language
          fields: supportedLanguages.map((lang) =>
            defineField({
              title: lang.title,
              name: lang.id,
              type: 'string',
              fieldset: lang.isDefault ? undefined : 'translations',
            }),
          ),
        }),
      ],
    }),
    // Define the gallery section
    defineField({
      name: 'gallery_section',
      title: 'Gallery Section',
      type: 'object',
      description: 'Enter the gallery section data',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'object',
          fieldsets: [
            {
              title: 'Translations',
              name: 'translations',
              options: {collapsible: true},
            },
          ],
          // Dynamically define one field per language
          fields: supportedLanguages.map((lang) =>
            defineField({
              title: lang.title,
              name: lang.id,
              type: 'string',
              fieldset: lang.isDefault ? undefined : 'translations',
            }),
          ),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'object',
          fieldsets: [
            {
              title: 'Translations',
              name: 'translations',
              options: {collapsible: true},
            },
          ],
          // Dynamically define one field per language
          fields: supportedLanguages.map((lang) =>
            defineField({
              title: lang.title,
              name: lang.id,
              type: 'string',
              fieldset: lang.isDefault ? undefined : 'translations',
            }),
          ),
        }),
        defineField({
          name: 'images',
          title: 'Gallery Images',
          type: 'array',
          description: 'Enter the gallery images',
          of: [
            defineArrayMember({
              type: 'image',
              name: 'image',
              title: 'Image',
              options: {
                hotspot: true,
              },
            }),
          ],
        }),
      ],
    }),
    // Define the about us section
    defineField({
      name: 'story_section',
      title: 'About us section',
      description: 'Enter the about us section data',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'object',
          fieldsets: [
            {
              title: 'Translations',
              name: 'translations',
              options: {collapsible: true},
            },
          ],
          // Dynamically define one field per language
          fields: supportedLanguages.map((lang) =>
            defineField({
              title: lang.title,
              name: lang.id,
              type: 'string',
              fieldset: lang.isDefault ? undefined : 'translations',
            }),
          ),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'object',
          fieldsets: [
            {
              title: 'Translations',
              name: 'translations',
              options: {collapsible: true},
            },
          ],
          // Dynamically define one field per language
          fields: supportedLanguages.map((lang) =>
            defineField({
              title: lang.title,
              name: lang.id,
              type: 'string',
              fieldset: lang.isDefault ? undefined : 'translations',
            }),
          ),
        }),
        defineField({
          name: 'image',
          title: 'Story Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
          ],
        }),
        defineField({
          name: 'quickFacts',
          title: 'Quick Facts',
          type: 'object', // Change from 'array' to 'object'
          description: 'Enter the quick facts',
          fields: [
            // Add a title field at the object level
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'object',
              fieldsets: [
                {
                  title: 'Translations',
                  name: 'translations',
                  options: {collapsible: false},
                },
              ],
              // Dynamically define one field per language
              fields: supportedLanguages.map((lang) =>
                defineField({
                  title: lang.title,
                  name: lang.id,
                  type: 'string',
                  fieldset: lang.isDefault ? undefined : 'translations',
                }),
              ),
            }),
            // Now add the facts array
            defineField({
              name: 'facts',
              title: 'Facts',
              type: 'array',
              description: 'Enter individual facts',
              of: [
                defineArrayMember({
                  type: 'object',
                  title: 'Fact',
                  fields: [
                    // Define the fact title field
                    defineField({
                      name: 'title',
                      title: 'Title',
                      type: 'object',
                      fieldsets: [
                        {
                          title: 'Translations',
                          name: 'translations',
                          options: {collapsible: false},
                        },
                      ],
                      fields: supportedLanguages.map((lang) =>
                        defineField({
                          title: lang.title,
                          name: lang.id,
                          type: 'string',
                          fieldset: lang.isDefault ? undefined : 'translations',
                        }),
                      ),
                    }),
                    // Rest of the fields (description, icon)
                    defineField({
                      name: 'description',
                      title: 'Description',
                      type: 'object',
                      fieldsets: [
                        {
                          title: 'Translations',
                          name: 'translations',
                          options: {collapsible: false},
                        },
                      ],
                      fields: supportedLanguages.map((lang) =>
                        defineField({
                          title: lang.title,
                          name: lang.id,
                          type: 'string',
                          fieldset: lang.isDefault ? undefined : 'translations',
                        }),
                      ),
                    }),
                    defineField({
                      name: 'icon',
                      title: 'Icon',
                      type: 'string',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    // Define the wall section
    defineField({
      name: 'wall_section',
      title: 'Wall Section',
      type: 'object',
      description: 'Enter the wall section data',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'object',
          fieldsets: [
            {
              title: 'Translations',
              name: 'translations',
              options: {collapsible: true},
            },
          ],
          // Dynamically define one field per language
          fields: supportedLanguages.map((lang) =>
            defineField({
              title: lang.title,
              name: lang.id,
              type: 'string',
              fieldset: lang.isDefault ? undefined : 'translations',
            }),
          ),
        }),
        defineField({
          name: 'images',
          title: 'Wall Images',
          type: 'array',
          description: 'Enter the wall images',
          of: [
            defineArrayMember({
              type: 'image',
              name: 'image',
              title: 'Image',
              options: {
                hotspot: true,
              },
            }),
          ],
        }),
      ],
    }),
    // Define the testimonials section
    defineField({
      name: 'testimonials_section',
      title: 'Testimonials Section',
      description: 'Enter the testimonials section data',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'object',
          fieldsets: [
            {
              title: 'Translations',
              name: 'translations',
              options: {collapsible: true},
            },
          ],
          // Dynamically define one field per language
          fields: supportedLanguages.map((lang) =>
            defineField({
              title: lang.title,
              name: lang.id,
              type: 'string',
              fieldset: lang.isDefault ? undefined : 'translations',
            }),
          ),
        }),
        defineField({
          name: 'testimonials',
          title: 'Testimonials',
          description: 'Add the testimonials here',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'author',
                  title: 'Author',
                  type: 'string',
                }),
                defineField({
                  name: 'testimonial',
                  title: 'Testimonial',
                  type: 'object',
                  fieldsets: [
                    {
                      title: 'Translations',
                      name: 'translations',
                      options: {collapsible: true},
                    },
                  ],
                  // Dynamically define one field per language
                  fields: supportedLanguages.map((lang) =>
                    defineField({
                      title: lang.title,
                      name: lang.id,
                      type: 'string',
                      fieldset: lang.isDefault ? undefined : 'translations',
                    }),
                  ),
                }),
                defineField({
                  name: 'image',
                  title: 'Author Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative Text',
                    },
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare(selection) {
      return {...selection, title: 'Home Page Content'}
    },
  },
})
