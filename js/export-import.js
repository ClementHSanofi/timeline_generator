import { loadFormData } from "./form.js";
import { renderTimeline } from "./timeline.js";
import { eventValidator, sortEventsByDate } from "./utils.js";

function collectRenderableEvents() {
    return [...document.querySelectorAll(".form-line")]
        .map(line => ({
            date: line.querySelector(".event-date").value,
            time: line.querySelector(".event-time").value,
            title: line.querySelector(".event-title").innerHTML,
            description: line.querySelector(".event-description").innerHTML,
            isPrimary: line.querySelector(".event-primary").checked,
        }))
        .filter(eventValidator);
}
/**
 * Export the current form data as a JSON file.
 */
export function exportFormData() {
    const events = [...document.querySelectorAll(".form-line")].map(line => ({
        date: line.querySelector(".event-date").value,
        time: line.querySelector(".event-time").value,
        title: line.querySelector(".event-title").innerHTML,
        description: line.querySelector(".event-description").innerHTML,
        isPrimary: line.querySelector(".event-primary").checked,
    }));

    const blob = new Blob([JSON.stringify(events, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "timeline-events.json";
    a.click();
    URL.revokeObjectURL(url);
}

/**
 * Import form data from a JSON file and populate the form with the imported events.
 */
export function importFormData() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json,.json";

    input.addEventListener("change", () => {
        const file = input.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            try {
                const events = JSON.parse(reader.result);
                if (!Array.isArray(events)) throw new Error("Format invalide");
                loadFormData(events);
                const validEvents = collectRenderableEvents();
                renderTimeline(sortEventsByDate(validEvents));
            } catch {
                alert("Fichier JSON invalide ou mal formaté.");
            }
        });
        reader.readAsText(file);
    });

    input.click();
}