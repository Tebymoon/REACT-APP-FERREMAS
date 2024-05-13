// src/components/NavTabs.tsx
import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NavTabs: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'background.paper', display: 'flex', justifyContent: 'center' }}>
      <Tabs centered>
        <Tab label="Productos" component={Link} to="/productos" />
        <Tab label="Contacto" component={Link} to="/contacto" />
      </Tabs>
    </Box>
  );
};

export default NavTabs;
