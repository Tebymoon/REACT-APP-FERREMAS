import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Badge, Container, Grid, Box } from '@mui/material';
import { Search, ShoppingCart } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  width: '100%',
  display: 'flex',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  flex: 1,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      navigate(`/productos?search=${searchQuery}`);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#F55E00' }}>
      <Container>
        <Toolbar disableGutters>
          <Grid container alignItems="center">
            <Grid item xs={12} sm={2} display="flex" justifyContent="flex-start">
              <Box
                component="img"
                src="/img/logo-simusa.png"
                alt="Logo Simusa"
                sx={{ height: 'auto', maxHeight: '64px', width: 'auto', maxWidth: '150px', cursor: 'pointer' }}
                onClick={() => navigate('/')}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <SearchBar>
                <SearchIconWrapper>
                  <Search />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="¿Cómo podemos ayudarte?"
                  inputProps={{ 'aria-label': 'buscar' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearch}
                />
              </SearchBar>
            </Grid>
            <Grid item xs={12} sm={2} display="flex" justifyContent="flex-end" alignItems="center">
              <Typography variant="body1" sx={{ marginLeft: 2, cursor: 'pointer' }} onClick={() => console.log('Ingresar')}>
                Salir
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
