import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { schema } from "./sanity/schemas";
import { getDefaultDocumentNode } from "./structur";
import { apiVersion, projectId, dataset } from "./sanity/env";
import { myTheme } from "./theme";
import { structureTool } from "sanity/structure";
import { RobotIcon, RocketIcon } from "@sanity/icons";

const commonConfig = {
  plugins: [
    structureTool({
      defaultDocumentNode: getDefaultDocumentNode,
      structure: (S) =>
        S.list()
          .title("Base")
          .items([
            S.listItem()
              .title("Sidor")
              .child(
                S.list()
                  .title("Sidor")
                  .items([
                    S.listItem()
                      .title("Home Page")
                      .child(
                        S.documentList()
                          .title("Home Page")
                          .filter('_type == "home"'),
                      ),
                    S.listItem()
                      .title("Lunch Page")
                      .child(
                        S.documentList()
                          .title("Lunch Configuration")
                          .filter('_type == "lunch"'),
                      ),
                  ]),
              ),
            S.divider(),
            S.listItem()
              .title("À la carte")
              .child(
                S.list()
                  .title("À la carte")
                  .items([
                    S.listItem()
                      .title("Menyobjekt")
                      .child(
                        S.documentList()
                          .title("Menyobjekt")
                          .filter('_type == "foods"'),
                      ),
                    S.listItem()
                      .title("Viner")
                      .child(
                        S.documentList()
                          .title("Viner")
                          .filter('_type == "wines"'),
                      ),
                    S.listItem()
                      .title("Subkategorier")
                      .child(
                        S.documentList()
                          .title("Subkategorier")
                          .filter('_type == "subcategories"'),
                      ),
                    S.listItem()
                      .title("Kategorier")
                      .child(
                        S.documentList()
                          .title("Kategorier")
                          .filter('_type == "categories"'),
                      ),
                  ]),
              ),
            S.divider(),
            S.listItem()
              .title("Kontakt & öppettider")
              .child(
                S.documentList()
                  .title("Kontakt & öppettider")
                  .filter('_type == "contact"')
              ),
            S.divider(),
            S.listItem()
              .title("FAQ - Vanliga frågor")
              .child(
                S.documentList()
                  .title("FAQ - Vanliga frågor")
                  .filter('_type == "faq"')
              ),
            S.divider(),

            ...S.documentTypeListItems().filter(
              (listItem) =>
                ![
                  "home",
                  "foods",
                  "subcategories",
                  "categories",
                  "wines",
                  "lunch",
                  "contact",
                  "faq",
                ].includes(listItem?.getId()!),
            ),
          ]),
    }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: "/api/draft",
        },
      },
    }),
  ],
};

const isDevelopment = dataset === "development";

export default defineConfig({
  basePath: isDevelopment ? "/studio/development" : "/studio/production",
  name: isDevelopment ? "PALERMO_STUDIO_DEVELOPMENT" : "PALERMO_STUDIO_PRODUCTION",
  title: isDevelopment ? "Palermo Studio Development" : "Palermo Studio",
  projectId,
  dataset,
  schema,
  theme: myTheme,
  ...commonConfig,
  icon: isDevelopment ? RocketIcon : RobotIcon,
});
