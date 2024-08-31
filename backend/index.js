import express from "express";
import path from "path";
import env from "dotenv";
import productRoutes from "./routes/product.route.js";

env.config();

const app = express();
const port = process.env.PORT || 3000;

const __dirname = path.resolve();
app.use(express.json());

app.use("/products", productRoutes);

if (process.env.NODE_ENV.trim() == "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});