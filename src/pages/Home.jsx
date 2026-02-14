import { useEffect, useMemo, useState } from "react";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import { createEvent } from "../interfaces/event";

export default function Home() {
    const STORAGE_KEY = "event_planner_events_v1";

    const [events, setEvents] = useState(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    }, [events]);

    const [editing, setEditing] = useState(null);
    const [query, setQuery] = useState("");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        const base = q
            ? events.filter((e) =>
                [e.title, e.location, e.notes].join(" ").toLowerCase().includes(q)
            )
            : events;

        return [...base].sort((a, b) => a.date.localeCompare(b.date));
    }, [events, query]);

    const stats = useMemo(() => {
        const today = new Date().toISOString().slice(0, 10);
        const upcoming = events.filter((e) => e.date >= today).length;
        return { total: events.length, upcoming };
    }, [events]);

    function handleAddOrUpdate(form) {
        if (editing) {
            setEvents((prev) =>
                prev.map((e) =>
                    e.id === editing.id
                        ? {
                            ...e,
                            title: form.title.trim(),
                            date: form.date,
                            location: form.location.trim(),
                            notes: form.notes.trim(),
                        }
                        : e
                )
            );
            setEditing(null);
            return;
        }
        setEvents((prev) => [createEvent(form), ...prev]);
    }

    function handleDelete(id) {
        setEvents((prev) => prev.filter((e) => e.id !== id));
        if (editing?.id === id) setEditing(null);
    }

    function handleReset() {
        const ok = confirm("Tüm etkinlikler silinsin mi?");
        if (!ok) return;

        setEvents([]);
        localStorage.removeItem(STORAGE_KEY);
    }

    return (
        <div className="min-h-screen bg-[#070A12] text-white">
            {/* arka plan glow */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-24 left-1/2 h-72 w-[56rem] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute top-40 left-10 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
            </div>

            <div className="relative max-w-5xl mx-auto px-4 py-10">
                <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-xs tracking-widest text-white/50">PERSONAL ORGANIZER</p>
                        <h1 className="text-3xl md:text-5xl font-bold mt-1">Event Planner</h1>
                        <p className="text-white/65 mt-2">
                            Etkinliklerini ekle, ara, düzenle ve sil.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={handleReset}
                            className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-red-200 hover:bg-red-500/20"
                        >
                            Tümünü Sil
                        </button>
                        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                            <div className="text-xs text-white/60">Toplam</div>
                            <div className="text-xl font-semibold">{stats.total}</div>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                            <div className="text-xs text-white/60">Yaklaşan</div>
                            <div className="text-xl font-semibold">{stats.upcoming}</div>
                        </div>
                    </div>
                </header>

                {/* arama */}
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-3">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ara: başlık, konum veya not..."
                        className="w-full bg-transparent outline-none placeholder:text-white/35 text-white px-2 py-2"
                    />
                </div>

                <div className="mt-6 grid lg:grid-cols-5 gap-5">
                    <div className="lg:col-span-2">
                        <EventForm
                            onSubmit={handleAddOrUpdate}
                            editingEvent={editing}
                            onCancel={() => setEditing(null)}
                        />
                    </div>

                    <div className="lg:col-span-3">
                        <EventList
                            events={filtered}
                            onEdit={(ev) => setEditing(ev)}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
