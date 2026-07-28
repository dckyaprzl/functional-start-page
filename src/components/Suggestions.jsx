import { motion, AnimatePresence } from "framer-motion";

export default function Suggestions({ items, activeIndex, onSelect }) {
  if (items.length === 0) return null;

  return (
    <AnimatePresence>
      {items.length > 0 && (
      <motion.ul 
        className="suggestions-list"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2 }}
      >
        {items.map((item, index) => (
          <motion.li
            key={item}
            layout
            className={index === activeIndex ? "suggestion-item active" : "suggestion-item"}
            onMouseDown={(e) => {
              e.preventDefault(); // supaya input gak kehilangan fokus sebelum onSelect jalan
              onSelect(item);
            }}
          >
            {item}
          </motion.li>
        ))}
      </motion.ul>
      )}
    </AnimatePresence>
  );
}