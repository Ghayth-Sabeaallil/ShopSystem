// Copyright (c) 2025 Ghayth Sabeaallil
// All rights reserved.

export function getFormattedTimestamp() {
    const now = new Date();
    const year = String(now.getFullYear());
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const timestamp = `${year.slice(-2)}${month}${day}${hours}${minutes}${seconds}`;
    const checkDigit = calculateEAN13CheckDigit(timestamp);
    return `${timestamp}${checkDigit}`;
}
// Generate EAN-13 barcode from a 12-digit code
function calculateEAN13CheckDigit(code12: string) {
    let sum = 0;
    for (let i = 0; i < 12; i++) {
        const digit = parseInt(code12[i], 10);
        sum += (i % 2 === 0) ? digit : digit * 3;
    }
    const mod = sum % 10;
    return mod === 0 ? 0 : 10 - mod;
}

export function parseBarcodeDate(barcode: string) {
    const year = barcode.substring(0, 2);
    const month = barcode.substring(2, 4);
    const day = barcode.substring(4, 6);

    return `20${year}-${month}-${day}`; // Format: YYYY-MM-DD
}