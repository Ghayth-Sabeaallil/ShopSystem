import Mongoose from "mongoose";

interface Products {
    owner_id: string,
    name: string,
    bar_code: number,
    price: number,
    amount: number
}

const schema = new Mongoose.Schema<Products>({
    owner_id: { type: String, required: true },
    name: { type: String, required: true },
    bar_code: { type: Number, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
});

const ProductsModel = Mongoose.model("products", schema);

export { ProductsModel, Products };