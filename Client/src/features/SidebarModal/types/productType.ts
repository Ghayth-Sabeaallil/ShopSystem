export type productResponse = {
    _id: string,
    name: string
    bar_code: string
    buying_price: number
    selling_price: number
    buying_amount: number
    selling_amount: number
};

export type productRequest = {
    name: string,
    bar_code: string,
    buying_price: number,
    selling_price: number,
    buying_amount: number,
    selling_amount: number
};
