export const roundIfRequired = (value: number) => {
    return Number.isInteger(value) ? value : Number(value).toFixed(2);
};
