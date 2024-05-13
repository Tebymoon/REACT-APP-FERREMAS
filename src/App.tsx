// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container, Paper } from '@mui/material';
import Navbar from './components/Navbar';
import NavTabs from './components/NavTabs';
import ProductCatalog from './ProductCatalog';

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <NavTabs />
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Paper style={{ padding: '20px', background: '#f5f5f5' }}> {/* El mismo estilo para mantener consistencia */}
          <Routes>
            <Route path="/productos" element={<ProductCatalog />} />
            // Añade tus rutas aquí
          </Routes>
        </Paper>
      </Container>
    </Router>
  );
};

export default App;
