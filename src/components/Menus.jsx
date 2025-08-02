'use client';
import {Box, Grid, Card, CardContent, Typography, Chip, IconButton,TextField, Button, InputAdornment, MenuItem} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const AddMenuItem = dynamic(() => import('./AddMenuItem'), { ssr: false });

const Menu = () => {
  const [selected, setSelected] = useState('all');
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

const categories = [
  { label: 'All Categories', value: 'all' },
  { label: 'Pizza', value: 'pizza' },
  { label: 'Salad', value: 'salad' },
  { label: 'Dessert', value: 'dessert' },
  { label: 'Main Course', value: 'main' }
];

// ====================Add new item===============================
  const handleModal = () => {
    setOpen(prev => !prev);
  };

// ======================Filter item in search box=======================

  const filteredItems = menuItems.filter((item) => {
  const matchCategory = selected === 'all' || item.category?.toLowerCase() === selected;
  const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
  return matchCategory && matchSearch;
});

// ============================VIEW ITEM(MENU)=========================
  const fetchItems = async () => {
    try {
      const res = await fetch('/api/menu/get');
      if (!res.ok) throw new Error('Failed to fetch');
      const items = await res.json();
      setMenuItems(items);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

// ============================DELETE ITEM(MENU)==========================
const handleDelete = async (id) => {
    const res = await fetch(`/api/menu/delete?id=${id}`, {
      method: 'DELETE',
    });
    if (res.ok) 
      fetchItems();
    else console.error('Delete failed');
};

// =============================EDIT ITEM(MENU)=============================
const handleModals = (item) => {
  setEditingItem(item);  
  setOpen(true);         
};


return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" mb={3}>
        <Typography variant="h5" fontWeight="bold">Menu Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleModal}
          sx={{ backgroundColor: '#6fbf73', color: 'black', mt: { xs: 2, sm: 0 } }}
        >
          Add Item
        </Button>
      </Box>

      <Box
        display="flex"
        gap={2}
        flexWrap="wrap"
        alignItems="stretch"
        mb={4}
        sx={{
          p: 2,
          border: '1px solid #ddd',
          borderRadius: 2,
          backgroundColor: '#fafafa',
        }}
      >
        <TextField
          placeholder="Search menu items..."
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
          sx={{ minWidth: { xs: '100%', sm: 250 } }}
        />

        <TextField select size="small" value={selected} onChange={(e) => setSelected(e.target.value)} fullWidth sx={{ minWidth: { xs: '100%', sm: 200 } }}>
          {categories.map((cat) => (
            <MenuItem key={cat.value} value={cat.value}>
              {cat.label}
            </MenuItem>
          ))}
        </TextField>

      </Box>
      <Grid container spacing={2}>
        {filteredItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined" sx={{ borderRadius: 3, minWidth: 390}}>
              <CardContent>
                <Box display="flex" justifyContent="center">
                     <img src={item.image_url} alt={item.name} style={{ width: '200px', height: '100px', objectFit: 'cover' }}/>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="h6" fontWeight="bold">{item.name}</Typography>
                  <Box>
                    <IconButton size="small"><EditIcon fontSize="small" onClick={() => handleModals(item)}/></IconButton>
                    <IconButton size="small" onClick={() => handleDelete(item.id)}><DeleteIcon fontSize="small" /></IconButton>
                  </Box>
                </Box>
                <Chip
                  label={item.veg === 'TRU' || item.veg === true ? '🟢 veg' : '🔴 non-veg'}
                  sx={{
                    color: item.veg ? '#4caf50' : '#f44336',
                    fontWeight: 'bold',
                    mb: 1,
                  }}
                />
                <Typography variant="body2" color="text.secondary">{item.category}</Typography>
                <Typography variant="body2" mt={1}>{item.description}</Typography>
                <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1" fontWeight="bold">${item.price}</Typography>
                  <Chip
                    label={item.available === 'TRU' || item.available === true ? 'Available' : 'Unavailable'}
                    sx={{
                      backgroundColor: item.available ? '#4caf50' : '#f44336',
                      color: '#fff',
                      fontWeight: 'bold',
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {filteredItems.length === 0 && (
          <Box px={2}>
            <Typography variant="body1">No items found for selected category.</Typography>
          </Box>
        )}
      </Grid>

      <AddMenuItem open={open} handleClose={handleModal} onItemAdded={fetchItems} />
      
    </Box>
  );
};

export default Menu;
