const TAG_MAP = {
    strong: "strong", b: "strong",
    em: "em",         i: "em",
    u: "u"
};

/**
 * Normalize a tag name to its standard form.
 * @param {string} tag - The tag name to normalize.
 * @returns {string|null} - The normalized tag name or null if invalid.
 */
function normalizeTag(tag) {
    return TAG_MAP[tag?.toLowerCase()] ?? null;
}

/**
 * Unwrap a node by moving its children to its parent and removing the node.
 * @param {Node} node - The node to unwrap.
 */
function unwrapTag(node) {
    const parent = node.parentNode;
    while (node.firstChild) parent.insertBefore(node.firstChild, node);
    parent.removeChild(node);
}

/**
 * Find the closest ancestor of a node with a specific tag name.
 * @param {Node} node - The starting node.
 * @param {string} tagName - The tag name to search for.
 * @returns {Node|null} - The ancestor node with the specified tag name or null if not found.
 */
function findAncestorWithTag(node, tagName) {
    let current = node.nodeType === Node.TEXT_NODE ? node.parentNode : node;
    while (current) {
        if (current.tagName?.toLowerCase() === tagName) return current;
        current = current.parentNode;
    }
    return null;
}

/**
 * Set the selection range between two nodes.
 * @param {Node} startNode - The starting node of the selection.
 * @param {Node} endNode - The ending node of the selection.
 */
function setSelection(startNode, endNode) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.setStartBefore(startNode);
    range.setEndAfter(endNode);
    selection.removeAllRanges();
    selection.addRange(range);
}

/**
 * Select the contents of a node.
 * @param {Node} node - The node whose contents to select.
 */
function selectNodeContents(node) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
}

/**
 * Check if a range is already formatted with a specific tag.
 * @param {Range} range - The range to check.
 * @param {string} tagName - The tag name to check for.
 * @returns {boolean} - True if the range is already formatted, false otherwise.
 */
function isAlreadyFormatted(range, tagName) {
    return (
        range.cloneContents().querySelector?.(tagName) !== null ||
        (findAncestorWithTag(range.startContainer, tagName) &&
         findAncestorWithTag(range.endContainer, tagName))
    );
}

/**
 * Remove a specific formatting tag from a range.
 * @param {Range} range - The range from which to remove the formatting.
 * @param {string} tagName - The tag name of the formatting to remove.
 */
function removeFormat(range, tagName) {
    const ancestors = [range.startContainer, range.endContainer]
        .map(node => findAncestorWithTag(node, tagName))
        .filter(Boolean)
        .filter((node, i, arr) => arr.indexOf(node) === i); // unique

    if (ancestors.length === 0) return;

    const firstChild = ancestors[0].firstChild;
    const lastChild = ancestors[ancestors.length - 1].lastChild;

    ancestors.forEach(unwrapTag);
    setSelection(firstChild, lastChild);
}

/**
 * Apply a specific formatting tag to a range.
 * @param {Range} range - The range to format.
 * @param {string} tagName - The tag name of the formatting to apply.
 */
function applyTag(range, tagName) {
    const fragment = range.extractContents();
    const wrapper = document.createElement(tagName);
    wrapper.appendChild(fragment);
    range.insertNode(wrapper);
    selectNodeContents(wrapper);
}

/**
 * Apply a specific formatting tag to an element based on the current selection.
 * @param {HTMLElement} element - The element to format.
 * @param {string} tag - The tag name of the formatting to apply.
 */
export function applyFormat(element, tag) {
    const tagName = normalizeTag(tag);
    if (!tagName) return;

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    if (range.collapsed || !element.contains(range.commonAncestorContainer)) return;

    isAlreadyFormatted(range, tagName)
        ? removeFormat(range, tagName)
        : applyTag(range, tagName);
}

/**
 * Toggle a specific formatting tag for the entire content of a field.
 * @param {HTMLElement} field - The field to format.
 * @param {string} tag - The tag name of the formatting to toggle.
 */
export function toggleWholeFieldFormat(field, tag) {
    const tagName = normalizeTag(tag);
    if (!tagName || field.innerHTML.trim() === "") return;

    const temp = document.createElement("div");
    temp.innerHTML = field.innerHTML;

    if (temp.querySelector(tagName)) {
        temp.querySelectorAll(tagName).forEach(unwrapTag);
    } else {
        const wrapper = document.createElement(tagName);
        wrapper.append(...temp.childNodes);
        temp.appendChild(wrapper);
    }

    field.innerHTML = temp.innerHTML;
}
