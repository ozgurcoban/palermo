import imageUrlBuilder from "@sanity/image-url";
import { getClient } from "../../sanity/lib/client";

const client = getClient();

const builder = imageUrlBuilder(client);

export default function urlFor(source: any) {
  return builder.image(source).auto('format').quality(85);
}
