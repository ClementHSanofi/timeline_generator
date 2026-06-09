import { initiateForm, handleFormSubmit } from "./form.js";
import { initSideform } from "./sideform.js";
import { fakeData } from "./fakeData.js";
import { renderTimeline } from "./timeline.js";

// Render the timeline with fake data on initial load
renderTimeline(fakeData());

document.addEventListener("DOMContentLoaded", () => {
    initiateForm();
    handleFormSubmit();
    initSideform();
});