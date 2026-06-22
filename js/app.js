import { initiateForm, autoRenderTimeline, loadFormData} from "./form.js";
import { initSideform } from "./sideform.js";
import { fakeData } from "./fakeData.js";
import { exportTimelineAsPDF, exportTimelineAsPNG } from "./exportTimeline.js";
import { exportFormData, importFormData } from "./export-import.js";

document.addEventListener("DOMContentLoaded", () => {
    initiateForm();
    autoRenderTimeline();
    // Inject demo data after init
    loadFormData(fakeData());
    // Trigger one auto render after loading demo data
    document.getElementById("event-form").dispatchEvent(new Event("input", { bubbles: true }));
    initSideform();
    document.getElementById("export-btn").addEventListener("click", () => {
        const format = document.getElementById("export-format").value;
        if (format === "png") {
            exportTimelineAsPNG();
            return;
        }
        exportTimelineAsPDF();
    });
    document.getElementById("export-json-btn").addEventListener("click", exportFormData);
    document.getElementById("import-json-btn").addEventListener("click", importFormData);
});