import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Middleware to fetch product data from Shopify API
app.get("/", async (req, res) => {
    try {
        const productsUrl = process.env.VITE_SHOPIFYSTORE;
        const headers = {
            "X-Shopify-Access-Token": process.env.VITE_APIACCESSTOKEN,
            "X-Shopify-Api-Key": process.env.VITE_APIKEY,
        };
        const response = await axios.get(productsUrl, { headers });
        const products = response.data.products;
        // Process products data here and format it as needed
        res.send(products);
    } catch (error) {
        console.error("Error fetching Shopify products:", error);
        res.status(500).send(
            "Error fetching Shopify products. Please try again later."
        );
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
