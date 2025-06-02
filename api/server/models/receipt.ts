import Mongoose from "mongoose";

interface Receipts {
    date_create: string,
    time: string,
    items: string[],
    bar_code: number,
}

const schema = new Mongoose.Schema<Receipts>({
    date_create: { type: String, required: true },
    time: { type: String, required: true },
    items: { type: [String], required: true },
    bar_code: { type: Number, required: true },
});

const ReceiptsModel = Mongoose.model("receipts", schema);

export { ReceiptsModel, Receipts };