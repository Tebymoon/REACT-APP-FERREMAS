import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000/api/inventories',
    headers: {
        'Content-Type': 'application/json'
    }
});

export interface Inventory {
    id_inventory: number;
    id_product: number;
    id_location: number;
    quantity: number;
    min_level: number;
    created_at: string;
    updated_at: string;
}

// Obtener todos los inventarios
export const getInventories = async (): Promise<Inventory[]> => {
    try {
        const response = await api.get('/');
        return response.data;
    } catch (error) {
        console.error('Error fetching inventories:', error);
        return [];
    }
};

// Obtener un inventario por ID
export const getInventoryById = async (id: number): Promise<Inventory | null> => {
    try {
        const response = await api.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching inventory by ID:', error);
        return null;
    }
};

// Crear un nuevo inventario
export const createInventory = async (inventory: Omit<Inventory, 'id_inventory' | 'created_at' | 'updated_at'>): Promise<Inventory | null> => {
    try {
        const response = await api.post('/', inventory);
        return response.data;
    } catch (error) {
        console.error('Error creating inventory:', error);
        return null;
    }
};

// Actualizar un inventario
export const updateInventory = async (id: number, inventory: Partial<Omit<Inventory, 'created_at' | 'updated_at'>>): Promise<Inventory | null> => {
    try {
        const response = await api.put(`/${id}`, inventory);
        return response.data;
    } catch (error) {
        console.error('Error updating inventory:', error);
        return null;
    }
};

// Eliminar un inventario
export const deleteInventory = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`/${id}`);
        return true;
    } catch (error) {
        console.error('Error deleting inventory:', error);
        return false;
    }
};
