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
    Box,
    Dialog as ConfirmationDialog,
    DialogActions as ConfirmationDialogActions,
    DialogContent as ConfirmationDialogContent,
    DialogTitle as ConfirmationDialogTitle
} from '@mui/material';
import { getInventories, createInventory, updateInventory, deleteInventory, Inventory } from '../services/inventoryService';

const InventoryManager: React.FC = () => {
    const [inventories, setInventories] = useState<Inventory[]>([]);
    const [open, setOpen] = useState(false);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [inventoryToDelete, setInventoryToDelete] = useState<number | null>(null);
    const [newInventory, setNewInventory] = useState({ id_product: 0, id_location: 0, quantity: 0, min_level: 0 });
    const [selectedInventory, setSelectedInventory] = useState<Inventory | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchInventories = async () => {
        setLoading(true);
        const inventoriesData = await getInventories();
        setInventories(inventoriesData);
        setLoading(false);
    };

    useEffect(() => {
        fetchInventories();
    }, []);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedInventory(null);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewInventory({ ...newInventory, [name]: Number(value) });
    };

    const handleCreateOrUpdate = async () => {
        setLoading(true);
        if (selectedInventory) {
            await updateInventory(selectedInventory.id_inventory, newInventory);
        } else {
            await createInventory(newInventory);
        }
        await fetchInventories(); // Actualizar el listado después de crear o actualizar
        setLoading(false);
        handleClose();
    };

    const handleEdit = (inventory: Inventory) => {
        setSelectedInventory(inventory);
        setNewInventory({
            id_product: inventory.id_product,
            id_location: inventory.id_location,
            quantity: inventory.quantity,
            min_level: inventory.min_level
        });
        handleOpen();
    };

    const handleDelete = async (id: number) => {
        const success = await deleteInventory(id);
        if (success) {
            setInventories(inventories.filter(inventory => inventory.id_inventory !== id)); // Actualizar el estado local
        }
    };

    const confirmDelete = (id: number) => {
        setInventoryToDelete(id);
        setDeleteConfirmOpen(true);
    };

    const handleDeleteConfirmed = async () => {
        if (inventoryToDelete !== null) {
            setLoading(true);
            await handleDelete(inventoryToDelete);
            setLoading(false);
        }
        setDeleteConfirmOpen(false);
        setInventoryToDelete(null);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredInventories = inventories.filter(inventory =>
        inventory.id_product.toString().includes(searchTerm) ||
        inventory.id_location.toString().includes(searchTerm)
    );

    return (
        <Container sx={{ }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                <TextField
                    margin="dense"
                    label="Buscar Inventario"
                    type="text"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{ flexGrow: 1, mr: 2, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#F55E00' } } }}
                />
                <Button variant="contained" sx={{ backgroundColor: '#F55E00', '&:hover': { backgroundColor: '#e55000' } }} onClick={handleOpen}>
                    Agregar Inventario
                </Button>
            </Box>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#F55E00' }}>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>ID Producto</TableCell>
                                <TableCell>ID Ubicación</TableCell>
                                <TableCell>Cantidad</TableCell>
                                <TableCell>Nivel Mínimo</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredInventories.map((inventory) => (
                                <TableRow key={inventory.id_inventory}>
                                    <TableCell>{inventory.id_inventory}</TableCell>
                                    <TableCell>{inventory.id_product}</TableCell>
                                    <TableCell>{inventory.id_location}</TableCell>
                                    <TableCell>{inventory.quantity}</TableCell>
                                    <TableCell>{inventory.min_level}</TableCell>
                                    <TableCell>
                                        <Button 
                                            variant="outlined" 
                                            sx={{ color: '#F55E00', borderColor: '#F55E00', mr: 1, '&:hover': { borderColor: '#e55000', color: '#e55000' } }} 
                                            onClick={() => handleEdit(inventory)}>
                                            Editar
                                        </Button>
                                        <Button 
                                            variant="outlined" 
                                            color="secondary" 
                                            onClick={() => confirmDelete(inventory.id_inventory)}
                                            sx={{ '&.MuiButton-outlinedSecondary': { borderColor: '#F55E00', color: '#F55E00', '&:hover': { borderColor: '#e55000', color: '#e55000' } } }}>
                                            Eliminar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{selectedInventory ? 'Editar Inventario' : 'Agregar Inventario'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="id_product"
                        label="ID Producto"
                        type="number"
                        fullWidth
                        value={newInventory.id_product}
                        onChange={handleChange}
                        sx={{ '& .MuiInputLabel-root.Mui-focused': { color: '#F55E00' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#F55E00' } } }}
                    />
                    <TextField
                        margin="dense"
                        name="id_location"
                        label="ID Ubicación"
                        type="number"
                        fullWidth
                        value={newInventory.id_location}
                        onChange={handleChange}
                        sx={{ '& .MuiInputLabel-root.Mui-focused': { color: '#F55E00' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#F55E00' } } }}
                    />
                    <TextField
                        margin="dense"
                        name="quantity"
                        label="Cantidad"
                        type="number"
                        fullWidth
                        value={newInventory.quantity}
                        onChange={handleChange}
                        sx={{ '& .MuiInputLabel-root.Mui-focused': { color: '#F55E00' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#F55E00' } } }}
                    />
                    <TextField
                        margin="dense"
                        name="min_level"
                        label="Nivel Mínimo"
                        type="number"
                        fullWidth
                        value={newInventory.min_level}
                        onChange={handleChange}
                        sx={{ '& .MuiInputLabel-root.Mui-focused': { color: '#F55E00' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#F55E00' } } }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ color: '#F55E00' }}>
                        Cancelar
                    </Button>
                    <Button onClick={handleCreateOrUpdate} sx={{ color: '#F55E00' }}>
                        {selectedInventory ? 'Actualizar' : 'Crear'}
                    </Button>
                </DialogActions>
            </Dialog>
            <ConfirmationDialog
                open={deleteConfirmOpen}
                onClose={() => setDeleteConfirmOpen(false)}
            >
                <ConfirmationDialogTitle>Confirmar Eliminación</ConfirmationDialogTitle>
                <ConfirmationDialogContent>
                    ¿Estás seguro de que deseas eliminar este inventario?
                </ConfirmationDialogContent>
                <ConfirmationDialogActions>
                    <Button onClick={() => setDeleteConfirmOpen(false)} sx={{ color: '#F55E00' }}>
                        Cancelar
                    </Button>
                    <Button onClick={handleDeleteConfirmed} sx={{ color: '#F55E00' }}>
                        Confirmar
                    </Button>
                </ConfirmationDialogActions>
            </ConfirmationDialog>
        </Container>
    );
};

export default InventoryManager;
