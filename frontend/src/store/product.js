import { create } from "zustand";
import axios from "axios";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({products}),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return {success: false, message: "Please provide all fields"};
        }
        const response = await axios.post("/products", newProduct);
        set((state) => ({products: [...state.products, response.data]}));
        return response;
    },
    fetchProducts: async () => {
        const response = await axios.get("/products");
        set({products: response.data});
    },
    deleteProduct: async (id) => {
        const response = await axios.delete(`/products/${id}`);
        set(state => ({products: state.products.filter(product => product.id !== id)}));
        return response.data;
    },
    updateProduct: async (id, updatedProduct) => {
        try {
            const response = await axios.put(`/products/${id}`, {
                name: updatedProduct.name,
                price: updatedProduct.price,
                image: updatedProduct.image
            });
            set(state => ({products: state.products.map(product => product.id === id ? response.data : product)}));
            return ({success: true, message: "Product updated successfully"});
        } catch (error) {
            console.log(`Error occurred: ${error}`);
            return ({success: false, message: "Failed to update product"});
        }
        
    }
}));

