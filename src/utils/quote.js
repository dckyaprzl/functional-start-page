const QUOTE_CACHE_KEY = "startpage_daily_quote";

function getTodayString() {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}
export async function getDailyQuote() {
    try {
        const cached = localStorage.getItem(QUOTE_CACHE_KEY);

        if (cached) {
            const parsed = JSON.parse(cached);
            if (parsed.date === getTodayString()) {
                return parsed.quote;
            }
        }
    } catch (err) {
        console.warn("Cache quote rusak, akan fetch ulang:", err);
    }
    

    const response = await fetch("https://dummyjson.com/quotes/random");
    if (!response.ok) {
        throw new Error(`Fetch gagal, status: ${response.status}`);
    }

    const data = await response.json();
    const quote = { text: data.quote, author: data.author };

    localStorage.setItem(
        QUOTE_CACHE_KEY,
        JSON.stringify({ date: getTodayString(), quote })
    );
    return quote;
}
