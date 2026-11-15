"use client";
import { studioRooms, type StudioRoom } from "@/lib/studio-rooms";

export function RoomSelector({ current, onChange }: { current: StudioRoom["id"]; onChange: (id: StudioRoom["id"]) => void }) {
  return (
    <nav aria-label="Ambienti dello studio" className="pointer-events-auto">
      <ol className="flex gap-1 rounded-full border border-white/15 bg-black/55 p-1 backdrop-blur-xl">
        {studioRooms.map((r, i) => (
          <li key={r.id}>
            <button
              type="button"
              onClick={() => onChange(r.id)}
              aria-current={r.id === current ? "location" : undefined}
              className={`flex min-h-11 items-center gap-2 rounded-full px-4 text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors duration-500 ${
                r.id === current ? "bg-white text-black" : "text-white/80 hover:text-white"
              }`}
            >
              <span className={r.id === current ? "text-plum" : "text-white/50"}>0{i + 1}</span>
              <span className="max-sm:sr-only">{r.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
