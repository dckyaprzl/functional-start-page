// config.js
// Data ini yang mendefinisikan seluruh perilaku startpage kamu.
// Nanti bisa dipindah ke localStorage biar bisa diedit dari UI Settings.

export const CONFIG = {
  // Search engine default (dipakai kalau query gak match macro manapun)
  engines: [
    {
      name: "Google",
      bgColor: "#4285F4",
      textColor: "#ffffff",
      types: {
        search: {
          template: "https://www.google.com/search?q={$}",
        },
      },
    },
    {
      name: "DuckDuckGo",
      bgColor: "#DE5833",
      textColor: "#ffffff",
      types: {
        search: {
          template: "https://duckduckgo.com/?q={$}",
        },
      },
    },
  ],

  defaultEngine: "Google",

  // Command global — bisa dipakai di semua macro
  // trigger '?' -> search di dalam situs macro tsb
  commands: [
    { type: "search", trigger: "?" },
  ],

  // Daftar macro (bookmark pintar)
  macros: [    
    {
      name: "ChatGPT",
      category: "dev",
      url: "https://chat.openai.com",
      normalisedURL: "chat.openai.com",
      triggers: ["cg", "chatgpt"],
      icon: "fa-brands fa-openai",
      commands: {
        search: {
          template: "https://chat.openai.com/search?q={$}",
          description: "Search ChatGPT",
        },
      },
      textColor: "#ffffff",
      pinned: true,
      key: "o", // Shift + O
    },
    {
      name: "Claude AI",
      category: "dev",
      url: "https://claude.ai",
      normalisedURL: "claude.ai",
      triggers: ["ca", "claude"],
      icon: "fa-brands fa-claude",
      commands: {
        search: {
          template: "https://claude.ai/search?q={$}",
          description: "Search Claude AI",
        },
      },
      textColor: "#ffffff",
      pinned: true,
      key: "c", // Shift + C
    },
    {
      name: "GitHub",
      category: "dev",
      url: "https://github.com",
      normalisedURL: "github.com",
      triggers: ["gh", "github"],
      icon: "fa-brands fa-github",
      commands: {
        search: {
          template: "https://github.com/search?q={$}",
          description: "Search GitHub repos",
        },
      },
      textColor: "#ffffff",
      pinned: true,
      key: "g", // Shift + G
    },
    {
      name: "YouTube",
      category: "media",
      url: "https://youtube.com",
      normalisedURL: "youtube.com",
      triggers: ["yt", "youtube"],
      icon: "fa-brands fa-youtube",
      commands: {
        search: {
          template: "https://www.youtube.com/results?search_query={$}",
        },
      },
      textColor: "#ffffff",
      pinned: true,
      key: "y",
    },
    {
      name: "Stack Overflow",
      category: "dev",
      url: "https://stackoverflow.com",
      normalisedURL: "stackoverflow.com",
      triggers: ["so"],
      icon: "fa-brands fa-stack-overflow",
      commands: {
        search: {
          template: "https://stackoverflow.com/search?q={$}",
        },
      },
      textColor: "#ffffff",
      pinned: true,
    },
    {
      name: "Font Awesome",
      category: "dev",
      url: "https://fontawesome.com",
      normalisedURL: "fontawesome.com",
      triggers: ["fa", "fontawesome"],
      icon: "fa-brands fa-font-awesome",
      commands: {
        search: {
          template: "https://fontawesome.com/search?q={$}",
          description: "Search Font Awesome icons",
        },
      },
      textColor: "#ffffff",
      pinned: true,
      key: "f", // Shift + F
    },

  ],
};