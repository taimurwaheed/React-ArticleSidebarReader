import { createContext, useContext, useState } from "react";

import { useGetArticles } from "../hooks/data-fetching/use-get-articles";
import { SidebarProvider } from "./sidebar-context";
import { SelectedArticleProvider } from "./selected-article-context";


const AppContext = createContext();

export function AppProvider({ children }) {
  const { articles, error, loading } = useGetArticles(); // Custom hook to fetch articles

  return (
    <AppContext.Provider
      value={{
        articles,
        articlesLoading: loading,
        articlesError: error,
      }}
    >
      <SidebarProvider>
        <SelectedArticleProvider>
          {children}
        </SelectedArticleProvider>
      </SidebarProvider>
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
