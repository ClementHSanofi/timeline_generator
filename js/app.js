import { initiateForm, handleFormSubmit } from "./form.js";
import { initSideform } from "./sideform.js";
import { fakeData } from "./fakeData.js";
import { renderTimeline } from "./timeline.js";
import { exportTimelineAsPDF } from "./pdf.js";
import { exportFormData, importFormData } from "./export-import.js";

// Render the timeline with fake data on initial load
renderTimeline(fakeData());

document.addEventListener("DOMContentLoaded", () => {
    initiateForm();
    handleFormSubmit();
    initSideform();
    document.getElementById("export-pdf-btn").addEventListener("click", exportTimelineAsPDF);
    document.getElementById("export-json-btn").addEventListener("click", exportFormData);
    document.getElementById("import-json-btn").addEventListener("click", importFormData);
});