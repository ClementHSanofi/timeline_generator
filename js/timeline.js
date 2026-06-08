import { formatDate } from "./utils.js";

export function renderTimeline(events) {
    const timelineContainer = document.getElementById("timeline");
    timelineContainer.innerHTML = "";

    events.forEach((event) => {
        const eventElement = document.createElement("div");
        eventElement.classList.add("timeline-event");
        if(event.isPrimary) eventElement.classList.add("timeline-event--primary");

        const eventDate = formatDate(event.date, event.time);
        
        eventElement.innerHTML = `
            <div class="event-date">${eventDate}</div>
            <div class="event-title">${event.title}</div>
            ${event.description ? `<div class="event-description">${event.description}</div>` : ""}
        `;
        
        timelineContainer.appendChild(eventElement);
    });
}