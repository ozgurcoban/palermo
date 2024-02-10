import { getClient } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";

const client = getClient();

const builder = imageUrlBuilder(client);

export default function urlFor(source: any) {
  return builder.image(source);
}
