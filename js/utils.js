/**
 * Sort a list of event objects by their date property in ascending order.
 * @param {TimelineEvent[]} events - Array of event objects to be sorted.
 * @return {TimelineEvent[]}
 */
export function sortEventsByDate(events) {
    return [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
}

/**
 * Format a date string in ISO format (YYYY-MM-DD) to a more human-readable format
 * @param {string} dateStr - Date string in ISO format (YYYY-MM-DD).
 * @return {string} 
 */
export function formatDate(dateStr) {
    if (!dateStr) return "";

    //TODO: Proposer une option de changement de langue
    return new Date(dateStr).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
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

//TODO: Revoir optimisation du fichier (log n, mémoire etc)