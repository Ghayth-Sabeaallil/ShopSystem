import type { CashierProduct } from "../features/Cashier/types/CashierType";
import type { receiptResponse } from "../features/SidebarModal/types/receiptType";

export async function printReceipt(
    items: CashierProduct[],
    barcodeText: string,
    lang: string,
    marketName: string,
    marketAddress: string,
    marketPhone: string
): Promise<receiptResponse> {
    try {
        const response = await fetch('http://localhost:4000/print', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items,
                barcodeText,
                lang,
                marketName,
                marketAddress,
                marketPhone,
            }),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        const data: receiptResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Print request failed:', error);
        throw error;
    }
}