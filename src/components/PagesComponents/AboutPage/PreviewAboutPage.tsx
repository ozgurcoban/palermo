"use client";
import { useLiveQuery } from "next-sanity/preview";
import { ABOUT_QUERY } from "../../../../sanity/lib/queries";
import AboutComponents from "./AboutComponents";

export default function PreviewAboutPage({
  aboutData,
}: {
  aboutData: AboutPage;
}) {
  const [data] = useLiveQuery<AboutPage>(aboutData, ABOUT_QUERY);

  return <AboutComponents aboutData={data} />;
}
