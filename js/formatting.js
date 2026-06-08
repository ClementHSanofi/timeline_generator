/**
 * Applies formatting to the selected text in a contenteditable element.
 * @param {HTMLElement} field - The contenteditable element.
 * @param {string} tag - The HTML tag to wrap the selection with (e.g., "strong", "em", "u", "none").
 */
export function applyFormat(element, tag) {
    if (tag === "none") {
        removeFormat(element, tag);
        return;
    }


    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    if (range.collapsed) return;

    const selectedText = range.toString();
    range.deleteContents();
    const node = document.createElement(tag);
    node.textContent = selectedText;
    range.insertNode(node);

    // After inserting the formatted node, we need to restore the selection to it
    const newRange = document.createRange();
    newRange.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(newRange);
}

/**
 * Removes formatting from the selected text in a contenteditable element.
 * @param {HTMLElement} element - The contenteditable element.
 * @param {string} tag - The HTML tag to remove (e.g., "strong", "em", "u").
 */
function removeFormat(element, tag) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    if (range.collapsed) return;

    const formattingTags = ["STRONG", "EM", "U", "B", "I"];
    
    let container = range.commonAncestorContainer;
    if (container.nodeType === Node.TEXT_NODE) {
        container = container.parentNode;
    }

    // Go up the DOM tree and remove formatting tags until we exit all of them
    while (formattingTags.includes(container.tagName)) {
        const parent = container.parentNode;
        const text = document.createTextNode(container.textContent);
        container.replaceWith(text);
        container = parent;
        
        // After replacing, we need to restore the selection to the unformatted text
        const newRange = document.createRange();
        newRange.selectNode(text);
        selection.removeAllRanges();
        selection.addRange(newRange);
    }
}

