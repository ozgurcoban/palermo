import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { presentationTool } from "sanity/presentation";
import { schema } from "./sanity/schemas";
import { getDefaultDocumentNode } from "./structur";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { myTheme } from "./theme";
import { structureTool } from "sanity/structure";

export default defineConfig({
  basePath: "/studio",
  name: "PALERMO_STUDIO",
  title: "Palermo Studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      defaultDocumentNode: getDefaultDocumentNode,
      structure: (S) =>
        S.list()
          .title("Base")
          .items([
            S.listItem()
              .title("Pages")
              .child(
                S.list()
                  .title("Pages")
                  .items([
                    S.listItem()
                      .title("Home Page")
                      .child(
                        S.documentList()
                          .title("Home Page")
                          .filter('_type == "home"')
                      ),
                    S.listItem()
                      .title("About Page")
                      .child(
                        S.list()
                          .title("About Page")
                          .items([
                            S.listItem()
                              .title("About Sections")
                              .child(
                                S.documentList()
                                  .title("About Sections")
                                  .filter('_type == "sections"')
                              ),
                            S.listItem()
                              .title("About Page")
                              .child(
                                S.documentList()
                                  .title("About Page")
                                  .filter('_type == "about"')
                              ),
                          ])
                      ),
                  ])
              ),
            S.divider(),
            S.listItem()
              .title("Menu")
              .child(
                S.list()
                  .title("Menu")
                  .items([
                    S.listItem()
                      .title("Foods List")
                      .child(
                        S.documentList()
                          .title("Foods List")
                          .filter('_type == "foods"')
                      ),
                    S.listItem()
                      .title("SubCategories List")
                      .child(
                        S.documentList()
                          .title("SubCategories List")
                          .filter('_type == "subcategories"')
                      ),
                    S.listItem()
                      .title("Categories List")
                      .child(
                        S.documentList()
                          .title("Categories List")
                          .filter('_type == "categories"')
                      ),
                  ])
              ),
            S.divider(),

            ...S.documentTypeListItems().filter(
              (listItem) =>
                ![
                  "home",
                  "about",
                  "sections",
                  "foods",
                  "subcategories",
                  "categories",
                ].includes(listItem.getId())
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
  schema,
  theme: myTheme,
});
