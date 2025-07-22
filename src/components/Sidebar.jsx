import { useAppContext } from "../context/AppContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSelectedArticleContext } from "../context/selected-article-context";
import { useSidebarContext } from "../context/sidebar-context";

export default function Sidebar() {
  const {
    articles
  } = useAppContext();

  const { selectedArticleId, setSelectedArticleId, highlightedArticleId } = useSelectedArticleContext()
  const {  isSidebarCollapsed, setIsSidebarCollapsed, setTooltipVisible } = useSidebarContext()

  return (
    <div
      className={`${isSidebarCollapsed ? "w-16" : "w-64"} bg-gray-800 text-white h-screen p-4 transition-all duration-300`}
    >
      <button
        onClick={() => {
          console.log("Toggling collapsed state");
          setIsSidebarCollapsed(!isSidebarCollapsed)
        }}
        className="mb-4 p-2 rounded hover:bg-gray-700 bg-gray-900"
      >
        {isSidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>

      <ul className="space-y-2">
        {articles.map((article) => (
          <li
            key={article.id}
            onClick={() => setSelectedArticleId(String(article.id))}
            onDoubleClick={() => {
              console.log("Double click triggered");
              setSelectedArticleId(String(article.id)); // ensures type match
              setTooltipVisible(true);
            }}

            className={`cursor-pointer p-2 rounded ${String(selectedArticleId) === String(article.id)
                ? String(highlightedArticleId) === String(article.id)
                  ? "bg-green-500"
                  : "bg-blue-500"
                : "hover:bg-gray-700"
              }`}

          >
            {isSidebarCollapsed ? article.title[0] : article.title}
          </li>
        ))}
      </ul>

    </div>
  );
}
