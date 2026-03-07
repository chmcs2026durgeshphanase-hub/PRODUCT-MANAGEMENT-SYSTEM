import Product from "../models/Productmodel.js"

export async function getAllProducts(_, res) {
    try {
        const products = await Product.find().sort({ createdAt: -1 })
        res.status(200).json(products)
    } catch (error) {
        console.error("Error in getAllProducts controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function getProductByID(req, res) {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(404).json({ message: "Product not found" })
        res.status(200).json(product)
    } catch (error) {
        console.error("Error in getProductByID controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function createProduct(req, res) {
    try {
        const {
            name,
            category,
            price,
            quantity,
            supplier,
            status,
            description,
            unit,
            warrantyPeriod
        } = req.body

        if (
            !name ||
            !category ||
            !price ||
            !quantity ||
            !supplier ||
            !status ||
            !description ||
            !unit ||
            !warrantyPeriod
        ) {
            return res.status(404).json({ message: "All fields are required" })
        }

        const product = new Product({
            name,
            category,
            price,
            quantity,
            supplier,
            status,
            description,
            unit,
            warrantyPeriod
        })

        const savedProduct = await product.save()
        res.status(201).json(savedProduct)
    } catch (error) {
        console.error("Error in createProduct controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}


export async function updateProduct(req, res) {
    try {
        const {
            name,
            category,
            price,
            quantity,
            supplier,
            status,
            description,
            unit,
            warrantyPeriod
        } = req.body

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name,
                category,
                price,
                quantity,
                supplier,
                status,
                description,
                unit,
                warrantyPeriod
            },
            { new: true }
        )

        if (!updatedProduct)
            return res.status(404).json({ message: "Product not found" })

        res.status(200).json(updatedProduct)
    } catch (error) {
        console.error("Error in updateProduct controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function deleteProduct(req, res) {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id)
        if (!deletedProduct)
            return res.status(404).json({ message: "Product not found" })

        res.status(200).json({ message: "Product deleted successfully" })
    } catch (error) {
        console.error("Error in deleteProduct controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}