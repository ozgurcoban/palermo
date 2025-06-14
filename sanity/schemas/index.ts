import {type SchemaTypeDefinition} from 'sanity'
import homepage from './homepage'
import foods from './foods'
import subcategories from './subcategories'
import categories from './categories'
import contactSection from './contact-section'
import wines from './wines'
import lunchpage from './lunchpage'
import faq from './faq'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    homepage,
    lunchpage,
    foods,
    subcategories,
    categories,
    contactSection,
    wines,
    faq,
  ],
}
