// app/(restrictedAccount)/admin/news/new/page.tsx
import NewsForm from "@/components/restricted/news/newsForm";

export default function Page() {
  return <NewsForm initial={{ title: "", excerpt: "", content: "", game: "", coverImage: "", coverUrl: "", coverAlt: "" }} />;
}