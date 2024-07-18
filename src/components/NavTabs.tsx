import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NavTabs: React.FC = () => {
  return (
    <Box sx={{ 
      bgcolor: '#E6E6E6', 
      display: 'flex', 
      justifyContent: 'center', 
      py: 2, 
      '& .MuiTabs-indicator': { backgroundColor: '#F55E00' } 
    }}>
      <Tabs centered>
        <Tab 
          label="Productos" 
          component={Link} 
          to="/producto" 
          sx={{ 
            '&.Mui-selected': { color: '#F55E00' },
            '&:hover': { color: '#e55000' }
          }} 
        />
        <Tab 
          label="Inventario" 
          component={Link} 
          to="/inventario-man" 
          sx={{ 
            '&.Mui-selected': { color: '#F55E00' },
            '&:hover': { color: '#e55000' }
          }} 
        />
      </Tabs>
    </Box>
  );
};

export default NavTabs;