import {type SchemaTypeDefinition} from 'sanity'
import homepage from './homepage'
import foods from './foods'
import subcategories from './subcategories'
import categories from './categories'
import sections from './sections'
import contactSection from './contact-section'
import aboutpage from './aboutpage'
import wines from './wines'
import lunchpage from './lunchpage'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    homepage,
    aboutpage,
    sections,
    lunchpage,
    foods,
    subcategories,
    categories,
    contactSection,
    wines,
  ],
}
