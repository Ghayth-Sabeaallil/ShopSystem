import Mongoose from "mongoose";

interface Products {
    bar_code: number,
    name: string,
    price: number,
    amount: number
}

const schema = new Mongoose.Schema<Products>({
    bar_code: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
});

const ProductsModel = Mongoose.model("products", schema);

export { ProductsModel, Products };