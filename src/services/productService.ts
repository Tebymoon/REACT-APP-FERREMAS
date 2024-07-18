import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000/api/products',
    headers: {
        'Content-Type': 'application/json'
    }
});

export interface Category {
    id_category: number;
    category_name: string;
}

export interface Product {
    id_product: number;
    product_name: string;
    description: string;
    id_category: number;
}

// Obtener todos los productos
export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await api.get('/');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

// Obtener un producto por ID
export const getProductById = async (id: number): Promise<Product | null> => {
    try {
        const response = await api.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        return null;
    }
};

// Crear un nuevo producto
export const createProduct = async (product: Omit<Product, 'id_product'>): Promise<Product | null> => {
    try {
        const response = await api.post('/', product);
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        return null;
    }
};

// Actualizar un producto
export const updateProduct = async (id: number, product: Partial<Product>): Promise<Product | null> => {
    try {
        const response = await api.put(`/${id}`, product);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        return null;
    }
};

// Eliminar un producto
export const deleteProduct = async (id: number): Promise<boolean> => {
    try {
        console.log(`Deleting product with ID: ${id}`); // Log para verificar el ID
        await api.delete(`/${id}`);
        return true;
    } catch (error) {
        console.error('Error deleting product:', error);
        return false;
    }
};
