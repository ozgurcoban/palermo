import {groq} from 'next-sanity'

export const HOME_QUERY = groq`
  *[_type=='home'][0]
`

export const ABOUT_QUERY = groq`
  *[_type=='about']{
    ...,
    sections[]->
  }[0]
`

export const CATEGORIES_QUERY = groq`
  *[_type=='categories']{
    ...,
    sub_categories[]->{...,menu_list[]->},
    menu_list[]->
  } | order(_createdAt asc)
`

// export const SUBCATEGORIES_QUERY = groq`
//   *[_type=='subcategories']{
//     ...,
//     menu_list[]->
//   } | order(_createdAt asc)
// `;

export const CONTACT_QUERY = groq`
  *[_type=='contact'][0]
`
