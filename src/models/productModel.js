import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
    },
    { timestamps: true }
);

const Product = mongoose.model("products", ProductSchema);

export default Product;
