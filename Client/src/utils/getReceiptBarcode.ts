export function getFormattedTimestamp() {
    const now = new Date();
    const year = String(now.getFullYear());
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

export function parseBarcodeDate(barcode: string) {
    const year = barcode.substring(0, 4);
    const month = barcode.substring(4, 6);
    const day = barcode.substring(6, 8);

    return `${year}-${month}-${day}`; // Format: YYYY-MM-DD
}