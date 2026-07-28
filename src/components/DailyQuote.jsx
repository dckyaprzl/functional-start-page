import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getDailyQuote } from "../utils/quote";

export default function DailyQuote() {
    const [quote, setQuote] = useState(null);
    const [error, setError ] = useState(false);

    useEffect(() => {
        getDailyQuote()
        .then(setQuote)
        .catch(() => setError(true));
    }, []);

    if (error || !quote) return null;

    return (
        <motion.div
        className = "daily-quote"
        initial = {{ opacity: 0, y: -10}}
        animate = {{ opacity: 1, y: 0}}
        transition = {{ duration: 0.5 }}
        >
            <p className="quote-text">"{quote.text}"</p>
            <p className="quote-author">"{quote.author}"</p>
        </motion.div>
    )
}