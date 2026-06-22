import { formatDate, calculateEventSpacing } from "./utils.js";

/**
 * Render the timeline with the given events. Each event is displayed with its date, title, and description.
 * Primary events are highlighted with a different style.
 * @param {Array} events - The list of events to render on the timeline.
 */
export function renderTimeline(events) {
    const timelineContainer = document.getElementById("timeline");
    timelineContainer.innerHTML = "";
    const rowElement = document.createElement("div");
    rowElement.classList.add("timeline-row");
    const spacings = calculateEventSpacing(events, { minSpacing: 1, maxSpacing: 8 });

    events.forEach((event, index) => {
        const eventElement = document.createElement("div");
        eventElement.classList.add("timeline-event");
        if (event.isPrimary) eventElement.classList.add("timeline-event--primary");

        // Apply spacing horizontally if not the first event
        if (index > 0 && spacings[index - 1]) {
            eventElement.style.marginLeft = `${spacings[index - 1]}rem`;
        }

        const eventDate = formatDate(event.date, event.time);

        eventElement.innerHTML = `
            <div class="event-dot"></div>
            <div class="event-connector"></div>
        `;
        eventElement.innerHTML += `
            <div class="event-card">
                <div class="event-date">${eventDate}</div>
                <div class="event-title">${event.title}</div>
                ${event.description ? `<div class="event-description">${event.description}</div>` : ""}
            </div>
        `;

        rowElement.appendChild(eventElement);
    });

    timelineContainer.appendChild(rowElement);
}