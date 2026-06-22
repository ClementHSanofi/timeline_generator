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


/**
 * Calculate the spacing between events based on their dates and times.
 * Maps time gaps to visual spacing in rem units (responsive).
 * @param {TimelineEvent[]} events - Array of event objects to calculate spacing for (must be sorted by date).
 * @param {Object} options - Configuration options.
 * @param {number} options.minSpacing - Minimum spacing in rem (default: 2).
 * @param {number} options.maxSpacing - Maximum spacing in rem (default: 8).
 * @return {number[]} Array of spacing values in rem for gaps between consecutive events.
 */
export function calculateEventSpacing(events, options = {}) {
    if (events.length < 2) return [];

    const { minSpacing = 2, maxSpacing = 8 } = options;
    
    // Calculate day differences between consecutive events
    const gaps = [];
    for (let i = 1; i < events.length; i++) {
        const prevDateTime = toDateTime(events[i - 1].date, events[i - 1].time);
        const currDateTime = toDateTime(events[i].date, events[i].time);
        const dayDiff = (currDateTime - prevDateTime) / (1000 * 60 * 60 * 24);
        gaps.push(Math.max(dayDiff, 0)); // Ensure non-negative
    }

    // Find min and max to normalize
    const minGap = Math.min(...gaps);
    const maxGap = Math.max(...gaps);

    // If all gaps are identical, return uniform spacing
    if (minGap === maxGap) {
        return gaps.map(() => (minSpacing + maxSpacing) / 2);
    }

    // Map gap range [minGap, maxGap] to spacing range [minSpacing, maxSpacing]
    return gaps.map(gap =>
        minSpacing + ((gap - minGap) / (maxGap - minGap)) * (maxSpacing - minSpacing)
    );
}