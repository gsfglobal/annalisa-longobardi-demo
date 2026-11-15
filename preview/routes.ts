/** Mappa percorsi Next.js ⇄ hash dell'anteprima (#nome). */
export const toHash = (href: string) => {
  const clean = href.replace(/^\/+|\/+$/g, "");
  return clean ? `#${clean.replace(/\//g, "-")}` : "#home";
};
export const fromHash = (hash: string) => {
  const h = hash.replace(/^#/, "");
  if (!h || h === "home") return "/";
  if (h.startsWith("trattamenti-")) return `/trattamenti/${h.slice(12)}/`;
  if (h === "studio-experience") return "/studio/experience/";
  return `/${h}/`;
};
