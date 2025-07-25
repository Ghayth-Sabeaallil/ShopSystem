import Mongoose from "mongoose";

interface Products {
    owner_id: string,
    name: string,
    bar_code: string,
    buying_price: number,
    selling_price: number,
    buying_amount: number,
    selling_amount: number,
    minimum_amount: number,
    sale_price?: number,
}

const schema = new Mongoose.Schema<Products>({
    owner_id: { type: String, required: true },
    name: { type: String, required: true },
    bar_code: { type: String, required: true },
    buying_price: { type: Number, required: true },
    selling_price: { type: Number, required: true },
    buying_amount: { type: Number, required: true },
    selling_amount: { type: Number, required: true },
    minimum_amount: { type: Number, required: true },
    sale_price: { type: Number, required: false },
});

const ProductsModel = Mongoose.model("products", schema);

export { ProductsModel, Products };