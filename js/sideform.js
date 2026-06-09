function toggleSideform() {
    const sideform = document.getElementById("sideform");
    const isCollapsed = sideform.classList.toggle("collapsed");
    updateToggleIcon(isCollapsed);
}

export function initSideform() {
    const toggle = document.getElementById("sideform-toggle");
    const sideform = document.getElementById("sideform");

    updateToggleIcon(sideform.classList.contains("collapsed"));
    toggle.addEventListener("click", toggleSideform);
}

function updateToggleIcon(isCollapsed) {
    const icon = document.querySelector("#sideform-toggle .sidebar-icon");
    if (!icon) return;

    icon.src = isCollapsed ? "./assets/hamburger-icon.svg" : "./assets/close-icon.svg";
}

