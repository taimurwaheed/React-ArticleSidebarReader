import { createContext, useContext, useState } from "react";

const SelectedArticleContext = createContext();

export function SelectedArticleProvider({ children }) {
    const [selectedArticleId, setSelectedArticleId] = useState(null);
    const [highlightedArticleId, setHighlightedArticleId] = useState(null);
    
    return (
        <SelectedArticleContext.Provider
            value={{ 
                selectedArticleId, 
                setSelectedArticleId,
                highlightedArticleId,
                setHighlightedArticleId
            }}
        >
            {children}
        </SelectedArticleContext.Provider>
    );
}

export const useSelectedArticleContext = () => {
    const context = useContext(SelectedArticleContext);
    if (!context) {
        throw new Error("useSelectedArticleContext must be used within a SelectedArticleProvider");
    }
    return context;
}