import type { Locale } from "./config";
import { en } from "./dictionaries/en";
import { es, type Dictionary } from "./dictionaries/es";

export * from "./config";
export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}

/** Only the strings the client-side store needs, to keep the payload small. */
export function pickStoreDict(t: Dictionary) {
  const { store, categories, categoryShort, statuses, actions, common } = t;
  return { store, categories, categoryShort, statuses, actions, common };
}
