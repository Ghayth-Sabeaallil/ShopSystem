import type { receiptResponse } from "../features/SidebarModal/types/receiptType";
import { parseBarcodeDate } from "./getReceiptBarcode";

export function getReceiptsPerDay(receipts: receiptResponse[]) {
    const counts: { [date: string]: number } = {};
    receipts.forEach((receipt) => {
        const date = parseBarcodeDate(receipt.bar_code);
        counts[date] = (counts[date] || 0) + 1;
    });
    const data = Object.entries(counts)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const xData = data.map((entry) => entry.date);
    const yData = data.map((entry) => entry.count);
    return { xData, yData };
}

export function getTopSellingItems(receipts: receiptResponse[]) {
    const itemCounts: { [key: string]: number } = {};
    receipts.forEach(receipt => {
        receipt.items.forEach(item => {
            const itemName = item.name;
            const itemAmount = item.amount;
            itemCounts[itemName] = (itemCounts[itemName] || 0) + itemAmount;
        });
    });
    const data = Object.entries(itemCounts)
        .map(([name, totalSold], index) => ({
            id: index,
            value: totalSold,
            label: name,
        }))
        .sort((a, b) => b.value - a.value);

    return data;
}

