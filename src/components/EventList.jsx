export default function EventList({ events, onEdit, onDelete }) {
    if (!events.length) {
        return (
            <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-8 text-white/60">
                Henüz etkinlik yok. Soldan bir etkinlik ekle.
            </div>
        );
    }

    return (
        <div className="grid gap-3">
            {events.map((ev) => (
                <div
                    key={ev.id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/[0.07] transition"
                >
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold truncate">{ev.title}</h3>
                                <span className="text-xs px-2 py-0.5 rounded-lg bg-black/20 border border-white/10 text-white/70">
                                    {ev.date}
                                </span>
                            </div>

                            <div className="text-sm text-white/60 mt-1">
                                {ev.location ? ev.location : <span className="text-white/35">Konum yok</span>}
                            </div>

                            {ev.notes ? <p className="text-sm text-white/65 mt-3">{ev.notes}</p> : null}
                        </div>

                        <div className="flex gap-2 shrink-0">
                            <button
                                onClick={() => onEdit(ev)}
                                className="px-3 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10"
                            >
                                Düzenle
                            </button>
                            <button
                                onClick={() => onDelete(ev.id)}
                                className="px-3 py-2 rounded-xl border border-red-400/30 bg-red-500/10 hover:bg-red-500/20 text-red-200"
                            >
                                Sil
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
