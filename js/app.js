import { initiateForm, handleFormSubmit } from "./form.js";
import { initSideform } from "./sideform.js";

document.addEventListener("DOMContentLoaded", () => {
    initiateForm();
    handleFormSubmit();
    initSideform();
});