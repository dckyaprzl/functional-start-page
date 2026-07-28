import { useEffect } from "react";
import { CONFIG} from "../config";

export function useMacroHotKeys() {
    useEffect(() => {
        function handleKeyDown(e) {
            if (!e.shiftKey) return;

            const pressedKey = e.key.toLowerCase();

            const macro = CONFIG.macros.find(
                (m) => m.pinned && m.key?.toLowerCase() === pressedKey
            );

            if (macro) {
                e.preventDefault();
                window.location.href = macro.url;
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);
}