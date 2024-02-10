import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { presentationTool } from "sanity/presentation";
import { schemaTypes } from './sanity/schemas'
import { getDefaultDocumentNode } from "./structur";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { myTheme } from "./theme";

export default defineConfig({
  basePath: "/studio",
  name: "PALERMO_STUDIO",
  title: "Palermo Studio",
  projectId,
  dataset,
  plugins: [deskTool({
    defaultDocumentNode: getDefaultDocumentNode,
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
  }),],
  schema: {
    types: schemaTypes,
  },
  theme: myTheme,

})
