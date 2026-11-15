/** Smooth transition between pages (disabled with prefers-reduced-motion). */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
