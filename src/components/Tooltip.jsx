import { useState } from "react";

import { useAppContext } from "../context/AppContext";
import { useSelectedArticleContext } from "../context/selected-article-context"
import { useSidebarContext } from "../context/sidebar-context";

export default function Tooltip() {
  const {
    articles,
  } = useAppContext();

  const { selectedArticleId, setHighlightedArticleId } = useSelectedArticleContext()
  const { tooltipVisible, setTooltipVisible } = useSidebarContext()


  const [actionMessage, setActionMessage] = useState("");

  const article = articles.find((a) => String(a.id) === String(selectedArticleId));


  const showMessage = (msg) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(""), 5000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${article.title}\n\n${article.content}`);
    showMessage("✅ Article copied to clipboard");
    setTooltipVisible(false);
  };

  const handleShare = async () => {
    const shareData = {
      title: article.title,
      text: article.content,
      url: window.location.href + `#article-${article.id}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        showMessage("✅ Article shared successfully");
        setTooltipVisible(false);
      } catch (err) {
        alert("Sharing failed!");
      }
    } else {
      alert("Sharing is not supported in this browser.");
    }
  };

  const handleHighlight = () => {
    setHighlightedArticleId(article.id);
    showMessage("✅ Sidebar article highlighted");
    setTooltipVisible(false);
  };

  if (!tooltipVisible || !article) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-opacity-30 backdrop-blur-sm z-40"
        onClick={() => setTooltipVisible(false)}
      />

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-4 rounded shadow-lg z-50 w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4">Choose an Action</h2>
        <div className="flex flex-col gap-3">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={handleCopy}>
            Copy Article
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleShare}>
            Share Article
          </button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600" onClick={handleHighlight}>
            Highlight Sidebar
          </button>
        </div>
        {actionMessage && (
          <p className="mt-4 text-sm text-green-600 text-center font-medium">{actionMessage}</p>
        )}
      </div>
    </>
  );
}
