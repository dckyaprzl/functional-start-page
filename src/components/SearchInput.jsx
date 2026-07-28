import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useAutoFocus } from "../hooks/useAutoFocus";
import { resolveQuery } from "../utils/parseQuery";
import { CONFIG } from "../config";
import { addToHistory, getHistory } from "../utils/storage";
import Suggestions from "./Suggestions";

export default function SearchInput() {
    const [value, setValue] = useState("");
    const [activeIndex, setActiveIndex] = useState(-1);

    const inputRef = useAutoFocus(()=> {
        setValue("");
        setActiveIndex(-1);
    });

    const suggestions = useMemo(() => {
        if (!value.trim()) return [];
        const history = getHistory();
        return history
        .filter((item) => item.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5); // Batasi jumlah saran yang ditampilkan
    }, [value]);

    function navigateUrl(url) {
        window.location.href = url;
    }

    function submitQuery(query, ctrlPressed = false) {
        const trimmed = query.trim();
        if(!trimmed) return;

        const result = resolveQuery(trimmed, CONFIG, ctrlPressed);
        addToHistory(trimmed);
        navigateUrl(result.url);
    }

    function handleKeyDown(e) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
            return; 
        }
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex((prev) => Math.max(prev - 1, -1));
            return;
        }
        if (e.key === 'Enter') {
            const chosen = activeIndex >= 0 ? suggestions[activeIndex] : value;
            submitQuery(chosen, e.ctrlKey);
        }
    }

    function handleSelectSuggestion(item ) {
        submitQuery(item);
    }

    return (
    

        <motion.div 
            className="search-container"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <div className="search-input-wrapper">
                <i className="fa-solid fa-magnifying-glass search-input-icon" aria-hidden="true"></i>
                <input
                    ref={inputRef}
                    type="text"
                    className="search-input"
                    placeholder="Type a search or macro trigger..."
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                        setActiveIndex(-1); // Reset active index saat user mengetik
                    }}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    spellCheck="false"
                />
            </div>
            
            <Suggestions
                items={suggestions}
                activeIndex={activeIndex}
                onSelect={handleSelectSuggestion}
            />
        </motion.div   >
    )
}