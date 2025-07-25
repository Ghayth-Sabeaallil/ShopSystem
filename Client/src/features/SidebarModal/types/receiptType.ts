// Copyright (c) 2025 Ghayth Sabeaallil
// All rights reserved.

export type receiptResponse = {
    _id: string,
    items: Items[];
    bar_code: string
};

type Items = {
    id: string;
    name: string;
    selling_price: number;
    sale_price?: number;
    amount: number;
}