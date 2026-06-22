/**
 * Generates a PDF of the entire timeline using html2canvas and jsPDF.
 * The PDF is saved with the name "timeline.pdf".
 */
export async function exportTimelineAsPDF() {
    const { jsPDF } = window.jspdf;
    const canvas = await convertTimelineToCanvas();
    if (!canvas) return;
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width / 2, canvas.height / 2]
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2);
    pdf.save("timeline.pdf");
}

export async function exportTimelineAsPNG() {
    const canvas = await convertTimelineToCanvas();
    if (!canvas) return;
    const imgData = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imgData;
    link.download = "timeline.png";
    link.click();
}

/**
 * Captures the full rendered timeline, including content outside the visible overflow area.
 * @returns {Promise<HTMLCanvasElement | undefined>} Captured timeline canvas.
 */
async function convertTimelineToCanvas() {
    const timeline = document.getElementById("timeline");
    if (!timeline) return;

    const fullWidth = Math.max(timeline.scrollWidth, timeline.offsetWidth);
    const fullHeight = Math.max(timeline.scrollHeight, timeline.offsetHeight);

    return html2canvas(timeline, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#fff",
        width: fullWidth,
        height: fullHeight,
        windowWidth: fullWidth,
        windowHeight: fullHeight,
        scrollX: 0,
        scrollY: 0
    });
}