"use client";
import { useLiveQuery } from "next-sanity/preview";
import { LUNCH_QUERY } from "../../../../sanity/lib/queries";
import LunchComponents from "./LunchComponents";

export default function PreviewLunchPage({
  lunchData,
}: {
  lunchData: LunchConfiguration;
}) {
  const [data] = useLiveQuery<LunchConfiguration>(lunchData, LUNCH_QUERY);
  return <LunchComponents lunchData={data} />;
}
