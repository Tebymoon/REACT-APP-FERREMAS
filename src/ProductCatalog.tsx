// src/ProductCatalog.tsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, CardMedia, Pagination, Link } from '@mui/material';

interface Product {
  codigo_producto: string;
  marca: string;
  codigo_marca: string;
  nombre: string;
  stock: number;
  valor: number;
  foto?: string;
  categoria: string;
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ProductCatalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12); // Ajusta a 12 porque 3x4 = 12 productos por página
  const query = useQuery();
  const searchQuery = query.get('search');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('https://api-rest-ferremas.up.railway.app/productos');
        const filteredProducts = searchQuery
          ? response.data.filter((product) =>
              product.nombre.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : response.data;
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  // Obtener los productos actuales para la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Cambiar de página
  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Grid container spacing={2}>
        {currentProducts.map((product) => (
          <Grid item key={product.codigo_producto} xs={12} sm={6} md={4} lg={3}>
            <Card>
              {product.foto && (
                <Link href="#" underline="none">
                  <CardMedia
                    component="img"
                    height="250"
                    image={product.foto}
                    alt={product.nombre}
                  />
                </Link>
              )}
              <CardContent>
                <Typography variant="h5" component="div">
                  {product.nombre}
                </Typography>
                <Typography color="text.secondary">
                  Marca: {product.marca}
                </Typography>
                <Typography color="text.secondary">
                  Precio: ${product.valor}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(products.length / productsPerPage)}
        page={currentPage}
        onChange={handleChangePage}
        color="primary"
        style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}
      />
    </>
  );
};

export default ProductCatalog;
