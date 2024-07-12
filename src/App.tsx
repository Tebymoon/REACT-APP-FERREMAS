// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container, Paper } from '@mui/material';
import Navbar from './components/Navbar';
import NavTabs from './components/NavTabs';
import CarouselComponent from './components/CarouselComponent';
import FeaturedProducts from './components/FeaturedProducts';
import ProductCatalog from './ProductCatalog';

const HomePage: React.FC = () => (
  <>
    <CarouselComponent />
    <FeaturedProducts />
  </>
);

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <NavTabs />
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Paper style={{ padding: '20px', background: '#f5f5f5' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/productos" element={<ProductCatalog />} />
          </Routes>
        </Paper>
      </Container>
    </Router>
  );
};

export default App;