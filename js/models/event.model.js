/**
 * @typedef {Object} TimelineEvent
 * @property {string} id - Unique identifier for the event.
 * @property {string} date - Date of the event ISO format YYYY-MM-DD.
 * @property {string} title - Title of the event.
 * @property {string} description - Description of the event.
 * @property {boolean} isPrimary - Indicates if the event is a primary event.
 * @property {Object} format
 * @property {boolean} format.bold
 * @property {boolean} format.italic
 * @property {boolean} format.underline
 */

/**
 * Create a TimelineEvent object with default values.
 * @param {Partial<TimelineEvent>} eventData
 * @return {TimelineEvent}
 */
export function createTimelineEvent(data = {}) {
    return {
        id: data.id ?? crypto.randomUUID(),
        date: data.date ?? "",
        title: data.title ?? "",
        description: data.description ?? "",
        isPrimary: data.isPrimary ?? false,
        format: {
            bold: data.format?.bold ?? false,
            italic: data.format?.italic ?? false,
            underline: data.format?.underline ?? false,
        },
    };
}