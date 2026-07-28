import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function formatTime(date) {
    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}
    function formatDate(date) {
        return date.toLocaleDateString([], {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }

    export default function Clock() {
        const [now, setNow] = useState(new Date());

        useEffect(() => {
            const interval = setInterval(() => {
                setNow(new Date());
            }, 1000);

            return () => clearInterval(interval);
        }, []);
    
    return (
    <motion.div
      className="clock"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <p className="clock-time">{formatTime(now)}</p>
      <p className="clock-date">{formatDate(now)}</p>
    </motion.div>
  );
}