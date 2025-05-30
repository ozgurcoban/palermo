import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
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
                          .filter('_type == "home"'),
                      ),
                    S.listItem()
                      .title("Lunch Page")
                      .child(
                        S.documentList()
                          .title("Lunch Configuration")
                          .filter('_type == "lunch"'),
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
                                  .filter('_type == "sections"'),
                              ),
                            S.listItem()
                              .title("About Page")
                              .child(
                                S.documentList()
                                  .title("About Page")
                                  .filter('_type == "about"'),
                              ),
                          ]),
                      ),
                  ]),
              ),
            S.divider(),
            S.listItem()
              .title("Menu")
              .child(
                S.list()
                  .title("Menu")
                  .items([
                    S.listItem()
                      .title("Food Items")
                      .child(
                        S.documentList()
                          .title("Food Items")
                          .filter('_type == "foods"'),
                      ),
                    S.listItem()
                      .title("Wines")
                      .child(
                        S.documentList()
                          .title("Wine Item")
                          .filter('_type == "wines"'),
                      ),
                    S.listItem()
                      .title("Sub Categories")
                      .child(
                        S.documentList()
                          .title("Sub Categories List")
                          .filter('_type == "subcategories"'),
                      ),
                    S.listItem()
                      .title("Categories")
                      .child(
                        S.documentList()
                          .title("Categories List")
                          .filter('_type == "categories"'),
                      ),
                  ]),
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
                  "wines",
                  "lunch",
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

export default defineConfig([
  {
    basePath: "/studio/development",
    name: "PALERMO_STUDIO_DEVELOPMENT",
    title: "Palermo Studio Development",
    projectId,
    dataset: "development",
    schema,
    theme: myTheme,
    ...commonConfig,
    icon: RocketIcon,
  },
  {
    basePath: "/studio/production",
    name: "PALERMO_STUDIO_PRODUCTION",
    title: "Palermo Studio",
    projectId,
    dataset: "production",
    schema,
    theme: myTheme,
    ...commonConfig,
    icon: RobotIcon,
  },
]);
