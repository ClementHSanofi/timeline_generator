import { createTimelineEvent } from "./models/event.model.js";
import { renderTimeline } from "./timeline.js";
import { eventValidator, sortEventsByDate } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
    initiateForm();
    handleFormSubmit();
});


/**
 * Initialize the event form with one line and set up the event listener for adding new lines.
 */
function initiateForm() {
    const form = document.getElementById("event-form");
    const addEventBtn = document.getElementById("add-event-btn");
    const clearEventsBtn = document.getElementById("clear-events-btn");
    let eventCount = 0;

    const initialFormLine = createEventFormLine(eventCount++);
    form.appendChild(initialFormLine);

    addEventBtn.addEventListener("click", () => {
        const newFormLine = createEventFormLine(eventCount++);
        form.appendChild(newFormLine);
    });

    clearEventsBtn.addEventListener("click", () => {
        resetForm();
    });
    
}

/**
 * Create a new form line for an event with input fields for date, time, title, and description.
 * @param {number} id - The unique identifier for the form line.
 * @return {HTMLDivElement}
 */
function createEventFormLine(id) {
    const formLine = document.createElement("div");
    formLine.classList.add("form-line");
    formLine.dataset.id = id;

    formLine.innerHTML = `
        <label for="event-date-${id}">Date:</label>
        <input type="date" class="event-date" id="event-date-${id}" required>
        <label for="event-time-${id}">Heure:</label>
        <input type="time" class="event-time" id="event-time-${id}">
        <label for="event-title-${id}">Titre:</label>
        <input type="text" class="event-title" id="event-title-${id}" placeholder="Titre de l'événement" required>
        <label for="event-description-${id}">Description:</label>
        <textarea class="event-description" id="event-description-${id}" placeholder="Description de l'événement"></textarea>
        <label><input type="checkbox" id="event-primary-${id}" class="event-primary" name="isPrimary">Événement principal</label>
    `;
    const isPrimarycheckbox = formLine.querySelector(`#event-primary-${id}`);
    isPrimarycheckbox.addEventListener("change", primaryCheckboxHandler);

    if (id > 0) {
        formLine.appendChild(removeButton(id));
    }
    return formLine;
}

/**
 * Collect data from all form lines and return an array of event objects.
 * @returns {TimelineEvent[]}
 */
function collectFormData() {
    const formLines = document.querySelectorAll(".form-line");
    const eventsData = [];
    formLines.forEach(line => {
        const date = line.querySelector(".event-date").value;
        const time = line.querySelector(".event-time").value;
        const title = line.querySelector(".event-title").value;
        const description = line.querySelector(".event-description").value;
        const isPrimary = line.querySelector(".event-primary").checked;

        eventsData.push(createTimelineEvent({ date, time, title, description, isPrimary }));
    });

    return eventsData;
}

/**
 * Handle form submission by collecting data, validating it, and then processing it
 */
function handleFormSubmit() {
    const form = document.getElementById("event-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const eventsData = collectFormData();
        const validEvents = eventsData.filter(eventValidator);
        if (validEvents.length === 0) {
            alert("Veuillez remplir au moins un événement avec une date et un titre valides.");
            return;
        }
        const sortedEvents = sortEventsByDate(validEvents);
        renderTimeline(sortedEvents);
    });
}

/**
 * Create a remove button for a form line.
 * @param {number} id - The unique identifier for the form line.
 * @return {HTMLButtonElement}
 */
function removeButton(id) {
    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "Supprimer";
    removeBtn.addEventListener("click", () => removeFormLine(id));
    return removeBtn;
}

/**
 * Remove a form line from the DOM based on its unique identifier.
 * @param {number} id - The unique identifier for the form line to be removed.
 */
function removeFormLine(id) {
    document.querySelector(`.form-line[data-id="${id}"]`).remove();
}

/**
 * Handle the change event for primary event checkboxes.
 * Ensures that only one primary event can be selected at a time.
 * @param {Event} event - The change event triggered by a checkbox.
 */
function primaryCheckboxHandler(event) {
    const checkboxes = document.querySelectorAll("input[name='isPrimary']");
    checkboxes.forEach(checkbox => {
        if (checkbox !== event.target) {
            checkbox.checked = false;
        }
    });
}

/**
 * Reset the form by clearing all form lines and reinitializing the form.
 */
function resetForm() {
    const form = document.getElementById("event-form");
    form.innerHTML = "";
    initiateForm();
}
