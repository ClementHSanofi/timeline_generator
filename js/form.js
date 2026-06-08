import { createTimelineEvent } from "./models/event.model.js";
import { renderTimeline } from "./timeline.js";
import { eventValidator, sortEventsByDate } from "./utils.js";
import { applyFormat, toggleWholeFieldFormat } from "./formatting.js";

/**
 * Initialize the event form with one line and set up the event listener for adding new lines.
 */
export function initiateForm() {
    setupFormButtons();
    resetForm();  
}

function setupFormButtons() {
    let eventCount = 1;

    document.getElementById("add-event-btn").addEventListener("click", () => {
        const form = document.getElementById("event-form");
        form.appendChild(createEventFormLine(eventCount++));
    });

    document.getElementById("clear-events-btn").addEventListener("click", () => {
        eventCount = 1;
        resetForm();
    });
}

/**
 * Reset the form by clearing all form lines and reinitializing the form.
 */
function resetForm() {
    const form = document.getElementById("event-form");
    form.innerHTML = "";
    form.appendChild(createEventFormLine(0));
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
        <div class="field-group field-group--datetime">
            <div class="field">
                <label for="event-date-${id}">Date</label>
                <input type="date" class="event-date" id="event-date-${id}" required>
            </div>
            <div class="field">
                <label for="event-time-${id}">Heure</label>
                <input type="time" class="event-time" id="event-time-${id}">
            </div>
        </div>

        <div class="field-group field-group--titled">
            <label for="event-title-${id}">Titre</label>
            <div class="editable-block">
                <div class="format-pills">
                    <button type="button" class="pill-btn" data-tag="strong"><b>G</b></button>
                    <button type="button" class="pill-btn" data-tag="em"><i>I</i></button>
                    <button type="button" class="pill-btn" data-tag="u"><u>S</u></button>
                </div>
                <div class="event-title" id="event-title-${id}" contenteditable="true" placeholder="Titre de l'événement"></div>
            </div>
        </div>

        <div class="field-group field-group--description">
            <label for="event-description-${id}">Description</label>
            <div class="editable-block">
                <div class="format-pills">
                    <button type="button" class="pill-btn" data-tag="strong"><b>G</b></button>
                    <button type="button" class="pill-btn" data-tag="em"><i>I</i></button>
                    <button type="button" class="pill-btn" data-tag="u"><u>S</u></button>
                </div>
                <div class="event-description" id="event-description-${id}" contenteditable="true" placeholder="Description de l'événement"></div>
            </div>
        </div>

        <div class="field-group field-group--options">
            <label class="checkbox-label">
                <input type="checkbox" id="event-primary-${id}" class="event-primary" name="isPrimary">
                Événement principal
            </label>
        </div>
    `;


    setupDescriptionFormatting(formLine, id);
    setupTitleFormatting(formLine, id);
    

    // Add event listener for primary checkbox to ensure only one can be selected
    formLine.querySelector(`#event-primary-${id}`)
        .addEventListener("change", primaryCheckboxHandler);

    // Add remove button for all lines except the first one
    if (id > 0) formLine.appendChild(createRemoveButton(id));
    
    return formLine;
}

/**
 * Collect data from all form lines and return an array of event objects.
 * @returns {TimelineEvent[]}
 */
function collectFormData() {
    return [...document.querySelectorAll(".form-line")].map(line => createTimelineEvent({
        date: line.querySelector(".event-date").value,
        time: line.querySelector(".event-time").value,
        title: line.querySelector(".event-title").innerHTML,
        description: line.querySelector(".event-description").innerHTML,
        isPrimary: line.querySelector(".event-primary").checked,
    }));
}

/**
 * Handle form submission by collecting data, validating it, and then processing it
 */
export function handleFormSubmit() {
    document.getElementById("event-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const validEvents = collectFormData().filter(eventValidator);

        if (validEvents.length === 0) {
            alert("Veuillez remplir au moins un événement avec une date et un titre valides.");
            return;
        }

        renderTimeline(sortEventsByDate(validEvents));
    });
}

/**
 * Create a remove button for a form line.
 * @param {number} id - The unique identifier for the form line.
 * @return {HTMLButtonElement}
 */
function createRemoveButton(id) {
    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "Supprimer";
    removeBtn.addEventListener("click", () => {
        document.querySelector(`.form-line[data-id="${id}"]`).remove();
    });
    return removeBtn;
}


/**
 * Handle the change event for primary event checkboxes.
 * Ensures that only one primary event can be selected at a time.
 * @param {Event} event - The change event triggered by a checkbox.
 */
function primaryCheckboxHandler(event) {
    document.querySelectorAll("input[name='isPrimary']").forEach(checkbox => {
        if (checkbox !== event.target) checkbox.checked = false;
    });
}

/**
 * Set up formatting buttons for the description field of a form line.
 * @param {HTMLElement} formLine - The form line element.
 * @param {number} id - The unique identifier for the form line.
 */
function setupDescriptionFormatting(formLine, id) {
    const field = formLine.querySelector(`#event-description-${id}`);

    formLine.querySelectorAll(".format-btn").forEach(btn => {
        let savedRange = null;

        btn.addEventListener("mousedown", (e) => {
            e.preventDefault();
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                savedRange = selection.getRangeAt(0).cloneRange();
            }
        });

        btn.addEventListener("click", (e) => {
            e.preventDefault();
            if (!savedRange) return;
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(savedRange);
            applyFormat(field, btn.dataset.tag);
            savedRange = null;
        });
    });
}

/**
 * Set up formatting buttons for the title field of a form line.
 * @param {HTMLElement} formLine - The form line element.
 * @param {number} id - The unique identifier for the form line.
 */
function setupTitleFormatting(formLine, id) {
    const field = formLine.querySelector(`#event-title-${id}`);

    formLine.querySelectorAll(".pill-btn").forEach(btn => {
        btn.addEventListener("mousedown", (e) => {
            e.preventDefault();
            toggleWholeFieldFormat(field, btn.dataset.tag);
        });
    });
}

