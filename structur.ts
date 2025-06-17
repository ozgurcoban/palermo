import { Iframe } from "sanity-plugin-iframe-pane";
import type { DefaultDocumentNodeResolver } from "sanity/structure";

export const getDefaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType },
) => {
  if (
    [
      "home",
      "foods",
      "subcategories",
      "categories",
      "wines",
      "lunch",
    ].includes(schemaType)
  ) {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .options({
          url: `${
            process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"
          }/api/draft`,
          defaultSize: "desktop",
          reload: {
            button: true,
          },
          attributes: {},
        })
        .title("Preview"),
    ]);
  }
};
