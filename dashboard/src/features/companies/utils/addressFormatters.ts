export const formatAddress = (address: any) => {
    if (!address) return "";
    return [
        address.line_1,
        address.line_2,
        address.city,
        address.state,
        address.code,
        address.country,
    ]
        .filter(Boolean)
        .join(", ");
};
