import { useEffect, useRef } from "react";

/**
 * Hook supaya user bisa langsung ngetik di mana saja di halaman,
 * dan otomatis fokus + terisi ke input field ini.
 *
 * Ini fitur khas startpage: gak perlu klik dulu ke search box.
 */
export function useAutoFocus(onEscape) {
  const inputRef = useRef(null);

  useEffect(() => {
    // Fokus ke input begitu halaman dibuka
    inputRef.current?.focus();

    function handleGlobalKeyDown(e) {
      const input = inputRef.current;
      if (!input) return;

      // Kalau user sedang fokus di elemen lain yang bukan input ini
      // (misal accidentally klik tempat lain), dan dia mulai ngetik karakter biasa,
      // alihkan fokus + karakter itu ke search input.
      const isTypingChar = e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
      const alreadyFocused = document.activeElement === input;

      if (isTypingChar && !alreadyFocused) {
        input.focus();
        // karakter yang baru ditekan akan otomatis masuk karena fokus sudah pindah
        // sebelum browser mengirim event input, jadi kita gak perlu manual inject
      }

      // Escape -> serahkan ke komponen pemanggil (biasanya untuk clear input)
      if (e.key === "Escape") {
        onEscape?.();
        input.focus();
      }
    }

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, [onEscape]);

  return inputRef;
}