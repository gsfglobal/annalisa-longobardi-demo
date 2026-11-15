import Link from "next/link";
export default function NotFound() {
  return (
    <section className="on-dark bg-black py-40 text-center text-white">
      <p className="display text-[96px]">404</p>
      <p className="mt-4 text-pearl">Pagina non trovata.</p>
      <Link href="/" className="btn btn-light mt-10"><span>Torna alla home</span></Link>
    </section>
  );
}
