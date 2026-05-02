let express = require("express")
let productModel = require("./models/productModel")

let app = express()

app.use(express.json())

app.post("/addProducts", async (req, res) => {
    try {
        let { name, price, description, category, stock } = req.body

        if (!name || price === undefined || !description || !category || stock === undefined) {
            return res.status(400).json({
                message: "give full data"
            })
        }

        let newProduct = await productModel.create({
            name,
            price,
            description,
            category,
            stock
        })

        return res.status(201).json({
            message: "product created successfully",
            product: newProduct
        })
    } catch (error) {
        console.log("server error", error)
        return res.status(500).json({
            message: "server error"
        })
    }
})

app.get("/viewProducts", async (req, res) => {
    try {
        let products = await productModel.find()

        return res.status(200).json({
            message: "products fetched successfully",
            products
        })
    } catch (error) {
        console.log("server error", error)
        return res.status(500).json({
            message: "server error"
        })
    }
})

app.get("/viewProducts/:id", async (req, res) => {
    try {
        let { id } = req.params
        let product = await productModel.findById(id)

        if (!product) {
            return res.status(404).json({
                message: "product not found"
            })
        }  

        return res.status(200).json({
            message: "product fetched successfully",
            product
        })
    } catch (error) {
        console.log("server error", error)
        return res.status(500).json({
            message: "server error"
        })
    }
})

app.put("/update-product/:id", async (req, res) => {
    try {
        let { name, price, description, category, stock } = req.body

        if (!name || price === undefined || !description || !category || stock === undefined) {
            return res.status(400).json({
                message: "give full data"
            })
        }

        let { id } = req.params
        let updatedProduct = await productModel.findByIdAndUpdate(
            id,
            {
                name,
                price,
                description,
                category,
                stock
            },
            {
                new: true
            }
        )

        if (!updatedProduct) {
            return res.status(404).json({
                message: "product not found"
            })
        }

        return res.status(200).json({
            message: "product updated successs",
            product: updatedProduct
        })
    } catch (error) {
        console.log("server error", error)
        return res.status(500).json({
            message: "server error"
        })
    }
})

app.delete("/delete-product/:id", async (req, res) => {
    try {
        let { id } = req.params
        let deletedProduct = await productModel.findByIdAndDelete(id)

        if (!deletedProduct) {
            return res.status(404).json({
                message: "product not found"
            })
        }

        return res.status(200).json({
            message: "product deleted successfully"
        })
    } catch (error) {
        console.log("server error", error)
        return res.status(500).json({
            message: "server error"
        })
    }
})

module.exports = app
