import express from "express";
import mongoose from "mongoose";
import 'dotenv/config'

import productRoutes from "./routes/products.js"

const app = express()

const port = 3000

app.use(express.json())

let url = process.env.DBconnection

mongoose.connect(url).then(() => {
    console.log("DB Connected");
}).catch((error) => {
    console.log("DB Connection Error")
    console.error(error)
})

app.use("/products", productRoutes)

app.listen(port, () => {
    console.log(`listening on port: ${port}`)

})

