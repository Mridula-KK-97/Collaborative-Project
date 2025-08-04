'use client';
import {Box, Grid, Card, CardContent, Typography, Chip, IconButton,TextField, Button, InputAdornment, MenuItem} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import EditItemModal from './EditMenuItem';

const AddMenuItem = dynamic(() => import('./AddMenuItem'), { ssr: false });

const Menu = () => {
  const [selected, setSelected] = useState('all');
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = [
    { label: 'All Categories', value: 'all' },
    { label: 'Pizza', value: 'pizza' },
    { label: 'Salad', value: 'salad' },
    { label: 'Dessert', value: 'dessert' },
    { label: 'Main Course', value: 'main' }
  ];

  const handleModal = () => setOpen((prev) => !prev);

  const filteredItems = menuItems.filter((item) => {
    const matchCategory = selected === 'all' || item.category?.toLowerCase() === selected;
const matchSearch = item.name?.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

// ==============================VIEW ITEM(MENU)==========================================
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

// =================================DELETE ITEM(MENU)========================================
  const handleDelete = async (id) => {
    const res = await fetch(`/api/menu/delete?id=${id}`, {
      method: 'DELETE',
    });
    if (res.ok) fetchItems();
    else console.error('Delete failed');
  };

// ====================================EDIT ITEM(MENU)========================================
  const handleEditModal = (item) => {
    setSelectedItem(item);
    setIsEditOpen(true);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" mb={3}>
        <Typography variant="h5" fontWeight="bold" color="white">
          Menu Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleModal}
          sx={{
            backgroundColor: '#1D4ED8',
            color: 'white',
            mt: { xs: 2, sm: 0 },
            '&:hover': { backgroundColor: '#1E40AF' },
          }}
        >
          Add Item
        </Button>
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        mb={4}
        sx={{
          p: 2,
          border: '1px solid #ddd',
          borderRadius: 2,
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
              <SearchIcon sx={{ color: 'white' }} />
            </InputAdornment>
          ),
          sx: {
            input: {
              color: 'white',               
              '::placeholder': {
                color: 'white',              
                opacity: 1,
              },
            },
          },
        }}
        sx={{
          flex: 1,
          minWidth: '200px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },
        }}
      />
      <TextField
          select
          size="small"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          sx={{
            minWidth: '180px',
            color: 'white',
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
            '& .MuiSelect-icon': {
              color: 'white', 
            },
          }}
          InputProps={{
            sx: {
              input: {
                color: 'white',
              },
            },
          }}
          SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  bgcolor: '#2c2c2c', 
                  color: 'white',    
                },
              },
            },
          }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.value} value={cat.value}>
              {cat.label}
            </MenuItem>
          ))}
      </TextField>

      </Box>
      <Grid container spacing={2} justifyContent="center">
        {filteredItems.map((item, index) => (
          <Grid item key={index}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                height: '100%',
                width: { xs: '100%', sm: 300, md: 360 }, 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <CardContent>
               <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mb={2}
                  sx={{
                    width: '100%',
                    height: 180,
                    overflow: 'hidden',
                    borderRadius: 1,
                  }}
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    style={{
                      width: '230px',
                      height: '180px',
                      borderRadius: '8px',
                    }}
                  />
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="h6" fontWeight="bold">{item.name}</Typography>
                  <Box>
                    <IconButton size="small" onClick={() => handleEditModal(item)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(item.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
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
      <EditItemModal
        open={isEditOpen}
        handleClose={() => setIsEditOpen(false)}
        itemToEdit={selectedItem}
        onItemUpdated={fetchItems}
      />
    </Box>
  );
};

export default Menu;
