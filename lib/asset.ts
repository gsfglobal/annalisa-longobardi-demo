/** Prefisso per gli asset statici: "" nel sito Next.js, "." nell'anteprima a pagina singola. */
export const BASE = process.env.NEXT_PUBLIC_BASE ?? "";
export const asset = (p: string) => `${BASE}${p}`;
