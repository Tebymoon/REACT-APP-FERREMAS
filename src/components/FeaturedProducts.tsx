// src/components/FeaturedProducts.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, CardMedia, Link } from '@mui/material';

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

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('https://api-rest-ferremas.up.railway.app/productos');
        setProducts(response.data.slice(0, 6)); // Mostrar solo los primeros 6 productos
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Grid container spacing={2} sx={{ marginTop: 4 }}>
      {products.map((product) => (
        <Grid item key={product.codigo_producto} xs={12} sm={6} md={4}>
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
  );
};

export default FeaturedProducts;
