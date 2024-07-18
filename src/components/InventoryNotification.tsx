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
    Alert,
    Snackbar,
} from '@mui/material';
import { getInventories, updateInventory, Inventory } from '../services/inventoryService';

const InventoryNotification: React.FC = () => {
    const [inventories, setInventories] = useState<Inventory[]>([]);
    const [lowInventoryItems, setLowInventoryItems] = useState<Inventory[]>([]);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [selectedInventory, setSelectedInventory] = useState<Inventory | null>(null);
    const [minLevel, setMinLevel] = useState<number>(0);

    const fetchInventories = async () => {
        try {
            const inventoriesData = await getInventories();
            setInventories(inventoriesData);
            checkLowInventory(inventoriesData);
        } catch (error) {
            console.error('Error fetching inventories:', error);
        }
    };

    const checkLowInventory = (inventories: Inventory[]) => {
        const lowItems = inventories.filter(item => item.quantity < item.min_level);
        setLowInventoryItems(lowItems);
        if (lowItems.length > 0) {
            setNotificationOpen(true);
        }
    };

    useEffect(() => {
        fetchInventories();
    }, []);

    const handleNotificationClose = () => {
        setNotificationOpen(false);
    };

    const handleEditOpen = (inventory: Inventory) => {
        setSelectedInventory(inventory);
        setMinLevel(inventory.min_level);
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
        setSelectedInventory(null);
    };

    const handleMinLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMinLevel(Number(event.target.value));
    };

    const handleUpdate = async () => {
        if (selectedInventory) {
            const updatedInventory = { ...selectedInventory, min_level: minLevel };
            await updateInventory(selectedInventory.id_inventory, updatedInventory);
            fetchInventories();
            handleEditClose();
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Box sx={{ mb: 2 }}>
                <Button variant="contained" onClick={fetchInventories} sx={{ backgroundColor: '#F55E00', '&:hover': { backgroundColor: '#e55000' } }}>
                    Refresh Inventory
                </Button>
            </Box>
            <Snackbar open={notificationOpen} autoHideDuration={6000} onClose={handleNotificationClose}>
                <Alert onClose={handleNotificationClose} severity="warning">
                ¡Algunos artículos del inventario están por debajo del umbral mínimo!
                </Alert>
            </Snackbar>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#F55E00' }}>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Product ID</TableCell>
                            <TableCell>Location ID</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Minimum Level</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inventories.map((inventory) => (
                            <TableRow key={inventory.id_inventory} sx={inventory.quantity < inventory.min_level ? { bgcolor: '#FFA99F' } : {}}>
                                <TableCell>{inventory.id_inventory}</TableCell>
                                <TableCell>{inventory.id_product}</TableCell>
                                <TableCell>{inventory.id_location}</TableCell>
                                <TableCell>{inventory.quantity}</TableCell>
                                <TableCell>{inventory.min_level}</TableCell>
                                <TableCell>
                                    <Button 
                                        variant="outlined" 
                                        sx={{ color: '#F55E00', borderColor: '#F55E00', mr: 1, '&:hover': { borderColor: '#e55000', color: '#e55000' } }} 
                                        onClick={() => handleEditOpen(inventory)}>
                                        Editar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={editOpen} onClose={handleEditClose}>
                <DialogTitle>Editar Nivel Mínimo</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="min_level"
                        label="Nivel Mínimo"
                        type="number"
                        fullWidth
                        value={minLevel}
                        onChange={handleMinLevelChange}
                        sx={{ '& .MuiInputLabel-root.Mui-focused': { color: '#F55E00' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#F55E00' } } }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose} sx={{ color: '#F55E00' }}>
                        Cancelar
                    </Button>
                    <Button onClick={handleUpdate} sx={{ color: '#F55E00' }}>
                        Actualizar
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default InventoryNotification;
