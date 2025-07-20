import Sidebar from "./Sidebar";
import ArticleViewer from "./ArticleViewer";

export default function Layout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <ArticleViewer />
      </div>
    </div>
  );
}
