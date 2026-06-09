/**
 * Handles the sideform toggle functionality, allowing users to collapse or expand the sideform.
 * The toggle button's icon changes based on the state of the sideform (collapsed or expanded).
 */
function toggleSideform() {
    const sideform = document.getElementById("sideform");
    const isCollapsed = sideform.classList.toggle("collapsed");
    updateToggleIcon(isCollapsed);
}

/**
 * Initializes the sideform functionality by setting up the event listener for the toggle button and updating the icon based on the initial state of the sideform.
 */
export function initSideform() {
    const toggle = document.getElementById("sideform-toggle");
    const sideform = document.getElementById("sideform");

    updateToggleIcon(sideform.classList.contains("collapsed"));
    toggle.addEventListener("click", toggleSideform);
}

/**
 * Updates the toggle button icon based on the state of the sideform (collapsed or expanded).
 * @param {boolean} isCollapsed - Indicates whether the sideform is collapsed.
 */
function updateToggleIcon(isCollapsed) {
    const icon = document.querySelector("#sideform-toggle .sidebar-icon");
    if (!icon) return;

    icon.src = isCollapsed ? "./assets/hamburger-icon.svg" : "./assets/close-icon.svg";
}

