import { useEffect, useMemo, useState } from "react";

const empty = { title: "", date: "", location: "", notes: "" };

export default function EventForm({ onSubmit, editingEvent, onCancel }) {
    const [form, setForm] = useState(empty);

    useEffect(() => {
        if (editingEvent) {
            setForm({
                title: editingEvent.title || "",
                date: editingEvent.date || "",
                location: editingEvent.location || "",
                notes: editingEvent.notes || "",
            });
        } else setForm(empty);
    }, [editingEvent]);

    const isEditing = !!editingEvent;
    const isValid = useMemo(() => form.title.trim().length >= 2 && !!form.date, [form]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!isValid) return;
        onSubmit(form);
        if (!isEditing) setForm(empty);
    }

    const input =
        "w-full px-3 py-2.5 rounded-xl bg-black/20 border border-white/10 " +
        "focus:outline-none focus:ring-2 focus:ring-white/15 focus:border-white/20 " +
        "placeholder:text-white/30 text-white";

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]"
        >
            <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                    <h2 className="text-lg font-semibold">
                        {isEditing ? "Etkinliği Güncelle" : "Yeni Etkinlik"}
                    </h2>
                    <p className="text-sm text-white/55">Başlık + tarih zorunlu.</p>
                </div>

                {isEditing && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-3 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10"
                    >
                        İptal
                    </button>
                )}
            </div>

            <div className="grid gap-3">
                <div className="grid gap-1">
                    <span className="text-xs text-white/60">Başlık *</span>
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className={input}
                        placeholder="Örn: GameX Fuarı"
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                    <div className="grid gap-1">
                        <span className="text-xs text-white/60">Tarih *</span>
                        <input type="date" name="date" value={form.date} onChange={handleChange} className={input} />
                    </div>
                    <div className="grid gap-1">
                        <span className="text-xs text-white/60">Konum</span>
                        <input
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            className={input}
                            placeholder="Örn: İstanbul / Ataşehir"
                        />
                    </div>
                </div>

                <div className="grid gap-1">
                    <span className="text-xs text-white/60">Not</span>
                    <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        rows={3}
                        className={input}
                        placeholder="Kısa not..."
                    />
                </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
                <button
                    type="submit"
                    disabled={!isValid}
                    className="px-4 py-2.5 rounded-xl bg-white text-black font-semibold
                     disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
                >
                    {isEditing ? "Kaydet" : "Ekle"}
                </button>

                {!isValid && <span className="text-xs text-white/45">Başlık en az 2 karakter + tarih.</span>}
            </div>
        </form>
    );
}
