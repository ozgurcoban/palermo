type Base = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
};

interface AboutPage extends Base {
  images: Image[];
  banner?: LocalizedText[];
  sections: AboutSections[];
}

interface AboutSections extends Base {
  title: LocalizedText;
  description: LocalizedText;
  image: Image[];
}

interface Homepage extends Base {
  banner?: LocalizedText[];
  gallery_section?: GallerySection;
  story_section?: StorySection;
  testimonials_section?: TestimonialSection;
}

interface GallerySection {
  title: LocalizedText;
  description?: LocalizedText;
  images: Image[];
}

interface StorySection {
  title: LocalizedText;
  description: LocalizedText;
  images: Image;
}

interface WallSection {
  title: LocalizedText;
  images: Image[];
}

interface TestimonialSection {
  title: LocalizedText;
  testimonials: {
    author: string;
    testimonial: LocalizedText;
    image?: Image;
  }[];
}

interface Image {
  _type: "image";
  asset: Reference;
}

interface Reference {
  _ref: string;
  _type: "reference";
}

interface Category extends Base {
  title: LocalizedText;
  description?: LocalizedText;
  sub_categories?: SubCategory[];
  menu_list?: Food[];
}

interface SubCategory extends Base {
  title: LocalizedText;
  description?: LocalizedText;
  menu_list: Food[];
}

interface Food extends Base {
  title: LocalizedText;
  price: string;
  description?: LocalizedText;
  badge?: LocalizedText;
}

interface LocalizedText {
  sv?: string;
  en?: string;
}
