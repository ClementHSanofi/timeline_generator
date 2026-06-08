/**
 * Build a datetime ISO with date and time strings.
 * @param {string} dateStr - Date string in ISO format (YYYY-MM-DD).
 * @param {string} timeStr - Time string in HH:MM format.
 * @returns {Date}
 */
function toDateTime(dateStr, timeStr) {
    return new Date(timeStr ? `${dateStr}T${timeStr}` : `${dateStr}T00:00`);
}

/**
 * Sort a list of event objects by their date property in ascending order.
 * @param {TimelineEvent[]} events - Array of event objects to be sorted.
 * @return {TimelineEvent[]}
 */
export function sortEventsByDate(events) {
    return [...events].sort(
        (a, b) => toDateTime(a.date, a.time) - toDateTime(b.date, b.time)
    );
}

/**
 * Format a date string in ISO format (YYYY-MM-DD) to a more human-readable format
 * @param {string} dateStr - Date string in ISO format (YYYY-MM-DD).
 * @param {string} timeStr - Time string in HH:MM format (optional).
 * @return {string} 
 */
export function formatDate(dateStr, timeStr) {
    if (!dateStr) return "";

    //TODO: Proposer une option de changement de langue
    const fullDate = new Date(`${dateStr}T00:00`).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return timeStr ? `${fullDate} - ${timeStr}` : fullDate;
}

/**
 * Validate an event object.
 * @param {TimelineEvent} event - The event object to validate.
 * @return {boolean} 
 */
export function eventValidator(event) {
    return (
        event.date.trim() !== "" &&
        event.title.trim() !== "" 
    )
}