function toggleSideform() {
    const sideform = document.getElementById('sideform');
    sideform.classList.toggle('collapsed');
}

export function initSideform() {
    const toggle = document.getElementById('sideform-toggle');
    toggle.addEventListener('click', toggleSideform);
}

