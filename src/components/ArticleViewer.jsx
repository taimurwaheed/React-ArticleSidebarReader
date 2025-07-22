import { useAppContext } from "../context/AppContext";
import { useSelectedArticleContext } from "../context/selected-article-context";

export default function ArticleViewer() {
  const { articles, loading, error } = useAppContext()
  const { selectedArticleId } = useSelectedArticleContext()

  if (!selectedArticleId) return <div className="p-8">Please select an article!</div>

  // 🛡️ Safety check
  if (loading) {
    return <div className="p-8">Loading article...</div>;
  }

  if (error) {
    return <div className="text-red-500">Something went wrong while fetching articles</div>
  }

  const article = articles.find((a) => String(a.id) === String(selectedArticleId));

  if (!article) {
    return <div className="p-8">Article not found.</div>;
  }

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-semibold mb-4">{article.title}</h2>
      <p className="text-gray-700 leading-relaxed">{article.content}</p>
    </div>
  );
}

