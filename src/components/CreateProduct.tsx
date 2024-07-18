import React, { useEffect, useState } from 'react';
import { 
    Button, 
    TextField, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    Container, 
    Box 
} from '@mui/material';
import { getProducts, createProduct, updateProduct, deleteProduct, Product } from '../services/productService';

interface ProductWithCategory extends Product {
    category: {
        id_category: number;
        category_name: string;
    };
}

export const CreateProduct: React.FC = () => {
    const [products, setProducts] = useState<ProductWithCategory[]>([]);
    const [open, setOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({ product_name: '', description: '', id_category: 0 });
    const [selectedProduct, setSelectedProduct] = useState<ProductWithCategory | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchProducts = async () => {
        const productsData = await getProducts();
        setProducts(productsData as ProductWithCategory[]);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedProduct(null);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleCreateOrUpdate = async () => {
        if (selectedProduct) {
            await updateProduct(selectedProduct.id_product, newProduct);
        } else {
            await createProduct(newProduct);
        }
        fetchProducts();
        handleClose();
    };

    const handleEdit = (product: ProductWithCategory) => {
        setSelectedProduct(product);
        setNewProduct({
            product_name: product.product_name,
            description: product.description,
            id_category: product.id_category
        });
        handleOpen();
    };

    const handleDelete = async (id: number) => {
        const success = await deleteProduct(id);
        if (success) {
            fetchProducts();
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container sx={{ }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                <TextField
                    margin="dense"
                    label="Buscar Producto"
                    type="text"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{ flexGrow: 1, mr: 2, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#F55E00' } } }}
                />
                <Button variant="contained" sx={{ backgroundColor: '#F55E00', '&:hover': { backgroundColor: '#e55000' } }} onClick={handleOpen}>
                    Agregar Producto
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#F55E00' }}>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Categoría</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts.map((product) => (
                            <TableRow key={product.id_product}>
                                <TableCell>{product.id_product}</TableCell>
                                <TableCell>{product.product_name}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>{product.category.category_name}</TableCell>
                                <TableCell>
                                    <Button 
                                        variant="outlined" 
                                        sx={{ color: '#F55E00', borderColor: '#F55E00', mr: 1, '&:hover': { borderColor: '#e55000', color: '#e55000' } }} 
                                        onClick={() => handleEdit(product)}>
                                        Editar
                                    </Button>
                                    <Button 
                                        variant="outlined" 
                                        color="secondary" 
                                        onClick={() => handleDelete(product.id_product)}
                                        sx={{ '&.MuiButton-outlinedSecondary': { borderColor: '#F55E00', color: '#F55E00', '&:hover': { borderColor: '#e55000', color: '#e55000' } } }}>
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{selectedProduct ? 'Editar Producto' : 'Agregar Producto'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="product_name"
                        label="Nombre del Producto"
                        type="text"
                        fullWidth
                        value={newProduct.product_name}
                        onChange={handleChange}
                        sx={{ '& .MuiInputLabel-root.Mui-focused': { color: '#F55E00' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#F55E00' } } }}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Descripción"
                        type="text"
                        fullWidth
                        value={newProduct.description}
                        onChange={handleChange}
                        sx={{ '& .MuiInputLabel-root.Mui-focused': { color: '#F55E00' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#F55E00' } } }}
                    />
                    <TextField
                        margin="dense"
                        name="id_category"
                        label="ID de Categoría"
                        type="number"
                        fullWidth
                        value={newProduct.id_category}
                        onChange={handleChange}
                        sx={{ '& .MuiInputLabel-root.Mui-focused': { color: '#F55E00' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#F55E00' } } }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ color: '#F55E00' }}>
                        Cancelar
                    </Button>
                    <Button onClick={handleCreateOrUpdate} sx={{ color: '#F55E00' }}>
                        {selectedProduct ? 'Actualizar' : 'Crear'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default CreateProduct;
