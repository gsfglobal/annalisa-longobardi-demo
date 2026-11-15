"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { contacts, nav, social } from "@/lib/site";
import { chapters } from "@/components/experience/Chapter";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/Icons";

const norm = (p: string) => (p.endsWith("/") ? p : p + "/");

export function Header() {
  const pathname = norm(usePathname() || "/");
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const on = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setHidden(y > 400 && y > last.current + 4);
      if (y < last.current - 4) setHidden(false);
      last.current = y;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) closeRef.current?.focus();
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  const goChapter = (id: string) => {
    setOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 350);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color] duration-700 ease-[var(--ease-lux)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${scrolled ? "bg-black/70 backdrop-blur-xl" : "bg-transparent"}`}
      >
        <div className="wrap flex h-[72px] items-center justify-between md:h-[84px]">
          <Link href="/" aria-label="Dott.ssa Annalisa Longobardi — Home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/media/logo-640.png")} alt="Annalisa Longobardi — odontoiatra specialista ortognatodonzia" width={640} height={294} className="h-10 w-auto md:h-12" />
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/contatti/" className="pill pill-plum !min-h-11 !px-5 max-sm:!px-4 max-sm:!text-[11px]">
              Prenota<span className="hidden sm:inline">&nbsp;un appuntamento</span>
            </Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="group flex min-h-11 items-center gap-3 rounded-full border border-white/25 pl-4 pr-3 text-[12px] font-semibold uppercase tracking-[0.16em] transition hover:border-white"
            >
              <span className="hidden sm:inline">Menu</span>
              <span className="sr-only sm:hidden">Apri il menu</span>
              <span aria-hidden="true" className="flex w-5 flex-col items-end gap-[5px]">
                <span className="h-[1.5px] w-5 bg-white" />
                <span className="h-[1.5px] w-3 bg-white transition-all duration-500 group-hover:w-5" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-0 z-[60] overflow-y-auto bg-black text-white transition-[clip-path] duration-[1000ms] ease-[var(--ease-lux)] ${
          open ? "[clip-path:circle(150%_at_100%_0%)]" : "pointer-events-none [clip-path:circle(0%_at_100%_0%)]"
        }`}
      >
        <div className="wrap relative flex h-[72px] items-center justify-between md:h-[84px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/media/logo-640.png")} alt="" width={640} height={294} className="h-10 w-auto md:h-12" />
          <button ref={closeRef} type="button" onClick={() => { setOpen(false); toggleRef.current?.focus(); }} className="flex min-h-11 items-center gap-3 rounded-full border border-white/25 px-4 text-[12px] font-semibold uppercase tracking-[0.16em] hover:border-white">
            Chiudi <span aria-hidden="true" className="text-lg leading-none">×</span>
          </button>
        </div>
        <div className="wrap relative grid gap-14 pb-12 pt-6 lg:grid-cols-12 lg:pt-12">
          <nav aria-label="Navigazione principale" className="lg:col-span-7">
            <ul>
              {nav.map((n, i) => (
                <li key={n.href} className="overflow-hidden border-b border-white/10">
                  <Link
                    href={n.href}
                    aria-current={(n.href === "/" ? pathname === "/" : pathname.startsWith(n.href)) ? "page" : undefined}
                    className={`group flex items-baseline justify-between gap-4 py-3 transition-transform duration-700 ease-[var(--ease-lux)] md:py-4 ${open ? "translate-y-0" : "translate-y-full"}`}
                    style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
                  >
                    <span className="mega text-[clamp(40px,7vw,96px)] transition-colors duration-500 group-hover:text-plum group-aria-[current=page]:text-plum">{n.label}</span>
                    <span className="kicker text-white/45">0{i + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-10 lg:col-span-4 lg:col-start-9">
            {isHome && (
              <div>
                <p className="kicker text-white/55">Capitoli dell&apos;esperienza</p>
                <ul className="mt-4 space-y-1">
                  {chapters.map((c) => (
                    <li key={c.id}>
                      <button type="button" onClick={() => goChapter(c.id)} className="flex min-h-10 w-full items-center gap-4 text-left text-[15px] text-white/85 hover:text-white">
                        <span className="kicker text-plum">{c.n}</span> {c.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <p className="kicker text-white/55">Contatti</p>
              <div className="mt-4 grid gap-2">
                <a href={contacts.whatsappHref} target="_blank" rel="noopener" className="pill pill-plum"><WhatsAppIcon /> WhatsApp</a>
                <a href={contacts.phoneHref} className="pill pill-line">{contacts.phoneLabel}</a>
              </div>
              <div className="mt-6 flex gap-3">
                <a href={social.instagram.href} target="_blank" rel="noopener" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 hover:bg-white hover:text-black"><InstagramIcon /></a>
                <a href={social.tiktok.href} target="_blank" rel="noopener" aria-label="TikTok" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 hover:bg-white hover:text-black"><TikTokIcon /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
