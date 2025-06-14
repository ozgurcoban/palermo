import {groq} from 'next-sanity'

export const HOME_QUERY = groq`
  *[_type=='home'][0]
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
export const LUNCH_QUERY = groq`
 *[_type=='lunch'][0]{
    ...,
    monthlySpecial,
    lunchPizza{
      ...,
      subcategoryRef->{
        ...,
        menu_list[]->
      }
    }
  }
`

export const FAQ_QUERY = groq`
  *[_type=='faq'][0]{
    questions[]{
      question,
      answer,
      showCTA,
      ctaType,
      ctaText
    }
  }
`
