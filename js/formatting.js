/**
 * Applies formatting to the selected text in a contenteditable element.
 * @param {HTMLElement} field - The contenteditable element.
 * @param {string} tag - The HTML tag to wrap the selection with (e.g., "strong", "em", "u").
 */
export function applyFormat(field, tag) {
    const selection = window.getSelection();
    if (!selection.rangeCount || selection.isCollapsed) return;

    const range = selection.getRangeAt(0);
    const selectedContent = range.extractContents();

    const wrapper = document.createElement(tag);
    wrapper.appendChild(selectedContent);
    range.insertNode(wrapper);

    // Move cursor after the wrapper
    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.setStartAfter(wrapper);
    newRange.collapse(true);
    selection.addRange(newRange);
    field.focus();
}
