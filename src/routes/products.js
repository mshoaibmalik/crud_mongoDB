import express from "express";
import mongoose from "mongoose";
import Product from "../models/productModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ message: "successfully get products.", products });
    } catch (error) {
        res.status(500).json({ message: error.message, products: null });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.json({ message: "product does not exist with this id" });
        }

        res.json({ message: "successfully got a product.", product });
    } catch (error) {
        res.status(500).json({ message: error.message, product: null });
    }
});

router.post("/", async (req, res) => {
    const { name, price, category } = req.body;
    if (!name || price === undefined || !category) {
        return res.status(400).json({ message: "invaild data for creating product", code: 400 });
    }

    try {
        const newProduct = new Product({ name, price, category });
        await newProduct.save();
        res.json({ message: "successfully created product", product: newProduct });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "product with this name is already exist", code: 400 });
        }
        res.status(500).json({ message: "error in creating product", code: 500 });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const exists = await Product.findById(new mongoose.Types.ObjectId(id));

        if (!exists) {
            return res.json({ message: " product doesn't exist with this id.", product: null });
        }

        await Product.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
        res.json({ message: "successfully deleted a product." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
