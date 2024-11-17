export const closeDialog = () => {
    const closeButton = document.getElementById("close-dialog");
    if (
        closeButton instanceof HTMLButtonElement &&
        closeButton.dataset.component === "dialog"
    ) {
        closeButton.click();
    }
};
