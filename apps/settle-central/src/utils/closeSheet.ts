export const closeSheet = () => {
    const closeButton = document.getElementById("close-sheet");
    if (
        closeButton instanceof HTMLButtonElement &&
        closeButton.dataset.component === "sheet"
    ) {
        closeButton.click();
    }
};
