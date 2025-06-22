export function getFormattedTimestamp() {
    const now = new Date();
    const year = String(now.getFullYear()).slice(-2); // YY
    const month = String(now.getMonth() + 1).padStart(2, '0'); // MM
    const day = String(now.getDate()).padStart(2, '0'); // DD
    const hours = String(now.getHours()).padStart(2, '0'); // HH
    const minutes = String(now.getMinutes()).padStart(2, '0'); // MM
    const seconds = String(now.getSeconds()).padStart(2, '0'); // SS

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}