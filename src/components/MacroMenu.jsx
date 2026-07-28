import { useState } from 'react';
import { CONFIG } from '../config';
import { AnimatePresence, motion } from 'framer-motion';

const ITEMS_PER_PAGE = 3;

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.06, delayChildren: 0.3 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 }
};

export default function MacroMenu() {
    const pinnedMacros = CONFIG.macros.filter((macro) => macro.pinned);
    const totalPages = Math.ceil(pinnedMacros.length / ITEMS_PER_PAGE);
    const [page, setPage] = useState(0);
    const start = page * ITEMS_PER_PAGE;
    const currentItems = pinnedMacros.slice(start, start + ITEMS_PER_PAGE);

    function goPrev() {
        setPage((prev) => Math.max(prev - 1, 0));
    }

    function goNext() {
        setPage((prev) => Math.min(prev + 1, totalPages - 1));
    }

    function handleMacroClick(macro) {
        window.location.href = macro.url;
    }

    if (pinnedMacros.length === 0) return null;

    return (
        <div className="macro-menu">
            <button
                className="macro-nav-btn"
                onClick={goPrev}
                disabled={page === 0}
                aria-label="Previous"
            >
                <i className="fa-solid fa-circle-arrow-left"></i>
            </button>
        <AnimatePresence mode="wait">
            <motion.div
                key={page}
                className="macro-list"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {currentItems.map((macro) => (
                    <motion.button
                        key={macro.name}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="macro-item"
                        style={{ backgroundColor: macro.bgColor, color: macro.textColor }}
                        onClick={() => handleMacroClick(macro)}
                        title={macro.key ? `Shift + ${macro.key.toUpperCase()}` : macro.name}
                    >
                        {macro.icon ? <i className={macro.icon}></i> : macro.name}
                    </motion.button>
                ))}
            </motion.div>
        </AnimatePresence>
            <button
                className="macro-nav-btn"
                onClick={goNext}
                disabled={page === totalPages - 1}
                aria-label="Next"
            >
                <i className="fa-solid fa-circle-arrow-right"></i>
            </button>
        </div>  
    );
}