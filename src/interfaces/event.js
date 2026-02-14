export const createEvent = ({ title, date, location, notes }) => ({
    id: crypto.randomUUID(),
    title: title.trim(),
    date,
    location: location.trim(),
    notes: notes.trim(),
    createdAt: Date.now(),
});
