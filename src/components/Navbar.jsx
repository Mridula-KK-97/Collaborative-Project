'use client';
import { useEffect, useState } from 'react';
import {Avatar,Menu, MenuItem,Typography,IconButton,Box} from '@mui/material';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/admin/login';
  };

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  if (!user) return null;

  return (
  <Box
    sx={{
      width: '100%',
      bgcolor: '#2c2c2c',
      px: 3,
      py: 2,
      display: 'flex',
      justifyContent: 'space-between', 
      alignItems: 'center',
    }}
  >
   
    <Typography
      variant="h6"
      sx={{ color: '#fff', fontWeight: 'bold' }}
    >
      Restaurant OS
    </Typography>

    <IconButton onClick={handleOpen}>
    <Avatar sx={{ bgcolor: '#1D4ED8' }}>
      {user.email?.charAt(0).toUpperCase()}
    </Avatar>
    </IconButton>
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem disabled>
        <Typography>{user.name}</Typography>
      </MenuItem>
      <MenuItem disabled>
        <Typography>{user.email}</Typography>
      </MenuItem>
      <MenuItem disabled>
        <Typography>{user.role}</Typography>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <Typography color="error">Sign Out</Typography>
      </MenuItem>
    </Menu>
  </Box>
);
}
export default Navbar;
