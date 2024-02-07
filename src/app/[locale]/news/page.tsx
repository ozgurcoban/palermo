import News from "@/components/News";
import PageTransition from "@/components/ui/PageTransition";
import { getNews } from "@/lib/getNews";
import { INewsItem } from "@/types/generated";

export default async function NewsPage() {
  const news: INewsItem[] = await getNews();

  return (
    <PageTransition>
      <News news={news} />
    </PageTransition>
  );
}
