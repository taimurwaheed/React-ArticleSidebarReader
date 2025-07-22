import { useEffect, useState } from "react"

export const useGetArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = async () => {
    try {
      const res = await fetch("https://687c9f88918b6422432ed66a.mockapi.io/articles");
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return { articles, loading, error };
}
