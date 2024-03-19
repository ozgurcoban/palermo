import NewsDetails from "@/components/News/NewsDetails";
import PageTransition from "@/components/ui/PageTransition";
import { pathnames } from "@/config";
import { getNews } from "@/lib/getNews";
import { INewsItem } from "@/types/generated";
import { notFound, redirect } from "next/navigation";
import React from "react";

type Props = {
  params: { id: string };
};

const NewPage = async ({ params: { id } }: Props) => {
  const news: { data: INewsItem[] } = await getNews();

  const newsDetails = news.data.find((news) => news.id === id);

  if (!newsDetails) notFound();

  return (
    <PageTransition>
      <NewsDetails allNews={news.data} newsDetails={newsDetails} />
    </PageTransition>
  );
};

export default NewPage;
