// parseQuery.js
// Logic murni JS, no React — sengaja dipisah biar gampang di-unit-test.

/**
 * Cari macro yang cocok berdasarkan trigger.
 * @returns {object|null} macro object atau null kalau gak ketemu
 */
function findMacroByTrigger(trigger, macros) {
  return macros.find((macro) => macro.triggers.includes(trigger)) || null;
}

/**
 * Parse raw query jadi hasil action: 'macro' | 'command' | 'search'
 *
 * Contoh input:
 *   "gh"              -> buka github.com langsung
 *   "gh?react hooks"  -> search "react hooks" di github
 *   "cara belajar react" -> fallback ke search engine
 */
export function parseQuery(rawQuery, config) {
  const query = rawQuery.trim();

  if (!query) return { type: "empty" };

  const { macros, commands, engines, defaultEngine } = config;

  // 1. Coba cocokkan dengan pattern "<trigger><commandTrigger><argument>"
  for (const cmd of commands) {
    const idx = query.indexOf(cmd.trigger);
    if (idx > 0) {
      const possibleTrigger = query.slice(0, idx);
      const argument = query.slice(idx + cmd.trigger.length);

      const macro = findMacroByTrigger(possibleTrigger, macros);
      if (macro && macro.commands?.[cmd.type]) {
        const template = macro.commands[cmd.type].template;
        return {
          type: "command",
          macro: macro.name,
          url: template.replace("{$}", encodeURIComponent(argument)),
        };
      }
    }
  }

  // 2. Coba cocokkan exact trigger tanpa command (langsung buka situsnya)
  const exactMacro = findMacroByTrigger(query, macros);
  if (exactMacro) {
    return {
      type: "macro",
      macro: exactMacro.name,
      url: exactMacro.url,
    };
  }

  // 3. Fallback: search engine default
  const engine = engines.find((e) => e.name === defaultEngine) || engines[0];
  const template = engine.types.search.template;

  return {
    type: "search",
    engine: engine.name,
    url: template.replace("{$}", encodeURIComponent(query)),
  };
}

/**
 * Helper untuk dipanggil dari komponen React saat user menekan Enter.
 * ctrlPressed = true -> paksa pakai search engine, skip macro (sesuai fitur Chevron)
 */
export function resolveQuery(rawQuery, config, ctrlPressed = false) {
  if (ctrlPressed) {
    const { engines, defaultEngine } = config;
    const engine = engines.find((e) => e.name === defaultEngine) || engines[0];
    const template = engine.types.search.template;
    return {
      type: "search",
      engine: engine.name,
      url: template.replace("{$}", encodeURIComponent(rawQuery.trim())),
    };
  }

  return parseQuery(rawQuery, config);
}