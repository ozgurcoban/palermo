import News from "@/components/News";
import { getNews } from "@/lib/getNews";
import { INewsItem } from "@/types/generated";

export default async function NewsPage() {
  const news: { data: INewsItem[] } = await getNews();

  return <News news={news.data} />;
}
