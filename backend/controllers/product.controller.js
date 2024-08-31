import db from "../database/db.config.js";
// import env from "dotenv";

// env.config();

export const getProducts = async (req, res) => {
    try {
        const response = await db.query("SELECT * FROM products ORDER BY id ASC");
        res.status(200).json(response.rows);
    } catch (err) {
        res.status(500).json({success: false, message: "Internal Server Error"});
        console.log(`Error occurred fetching data: ${err}`);
    }
};

export const createProduct = async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: `Provide all fields`});
    }
    try {
        await db.query("INSERT INTO products (name, price, image) VALUES ($1, $2, $3)", [
            product.name,
            product.price,
            product.image
        ]);
        res.status(200).json({success: true, message: "Product created successfully"});
    } catch (err) {
        console.log(`Error occurred inserting data: ${err}`);
        res.status(500).json({success: false, message: "Internal Server error"});
    }
};

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const {name, price, image} = req.body;
    const response = await db.query("SELECT * FROM products WHERE id=$1", [id]);
    if (response.rows.length === 0) {
        return res.status(404).json({success: false, message: `Provide valid id`});
    } else if (!name || !price || !image) {
        return res.status(400).json({success: false, message: `Provide all fields`});
    }

    try {
        const response = await db.query("UPDATE products SET name=$1, price=$2, image=$3 WHERE id=$4 RETURNING *", [name, price, image, id]);
        res.status(200).json(response.rows[0]);
    } catch (err) {
        console.log(`Error occurred inserting data: ${err}`);
        res.status(500).json({success: false, message: "Internal Server error"});
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    try {
        await db.query("DELETE FROM products WHERE id=$1", [id]);
        res.status(200).json({success: true, message: "Product deleted successfully"});
    } catch (err) {
        res.status(500).json("Internal Server Error");
        console.log(`Error deleting data: ${err}`);
    }
};