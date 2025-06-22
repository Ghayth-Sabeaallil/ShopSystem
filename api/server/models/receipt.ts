import Mongoose from "mongoose";

interface Items {
    id: string;
    name: string;
    selling_price: number;
    sale_price?: number;
    amount: number;
}

interface Receipts {
    owner_id: string,
    items: Items[];
    bar_code: string;
}

// Define a Mongoose schema for Items
const ItemSchema = new Mongoose.Schema<Items>({
    id: { type: String, required: true },
    name: { type: String, required: true },
    selling_price: { type: Number, required: true },
    sale_price: { type: Number, required: false },
    amount: { type: Number, required: true },
});

// Use ItemSchema inside Receipts schema
const schema = new Mongoose.Schema<Receipts>({
    owner_id: { type: String, required: true },
    items: { type: [ItemSchema], required: true },
    bar_code: { type: String, required: true },
});

const ReceiptsModel = Mongoose.model("receipts", schema);

export { ReceiptsModel, Receipts };
