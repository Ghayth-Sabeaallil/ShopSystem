// Copyright (c) 2025 Ghayth Sabeaallil
// All rights reserved.

import type { CashierProduct } from "../features/Cashier/types/CashierType";

export function getRemovedAndReducedItems(
    original: CashierProduct[],
    updated: CashierProduct[]
): CashierProduct[] {
    const updatedMap = new Map(updated.map(item => [item.id, item]));
    const result: CashierProduct[] = [];

    for (const originalItem of original) {
        const updatedItem = updatedMap.get(originalItem.id);

        if (!updatedItem) {
            // Item completely removed
            result.push({ ...originalItem });
        } else if (originalItem.amount > updatedItem.amount) {
            // Amount was reduced
            result.push({
                ...originalItem,
                amount: originalItem.amount - updatedItem.amount,
            });
        }
        // else: no change or increase — skip
    }

    return result;
}