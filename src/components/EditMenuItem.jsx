import * as React from 'react';
import {
  Backdrop, Box, Modal, Fade, Button, Typography,
  TextField, MenuItem, Select, Checkbox, FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EditItemModal({ open, handleClose, itemToEdit, onItemUpdated }) {
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState(itemToEdit || {});

  React.useEffect(() => {
    if (itemToEdit) {
      setForm(itemToEdit);
    }
  }, [itemToEdit, open]);

const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };


const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image_url: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

// ===========================EDIT MODAL(MENU)=============================
const handleUpdateItem = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch(`/api/menu/update?id=${itemToEdit.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    const result = await res.json();

    if (res.ok) {
      alert('Item updated!');
      handleClose();
      onItemUpdated?.();
    } else {
      alert(result?.error || 'Update failed.');
    }
  } catch (err) {
    console.error('Update error:', err);
    alert('Error updating item.');
  } finally {
    setLoading(false);
  }
};


  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>Edit Item</Typography>

          <Typography variant="subtitle2" sx={{ mt: 2 }}>Upload Image</Typography>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          {form.image_url?.trim() ? (
  <Box mt={2}>
    <Typography variant="caption">Preview:</Typography>
    <img
      src={form.image_url}
      alt="Preview"
      style={{ width: '100%', maxHeight: 200, objectFit: 'cover' }}
    />
  </Box>
) : null}
          <TextField
            label="Item Name"
            fullWidth
            margin="normal"
            name="name"
            value={form.name || ''}
            onChange={handleChange}
          />
          <TextField
            label="Price ($)"
            fullWidth
            margin="normal"
            name="price"
            value={form.price || ''}
            onChange={handleChange}
          />
          <Select
            fullWidth
            displayEmpty
            sx={{ mt: 2 }}
            name="category"
            value={form.category || ''}
            onChange={handleChange}
          >
            <MenuItem value="">Select Category</MenuItem>
            <MenuItem value="starter">Starter</MenuItem>
            <MenuItem value="main">Main</MenuItem>
            <MenuItem value="pizza">Pizza</MenuItem>
            <MenuItem value="salad">Salad</MenuItem>
            <MenuItem value="drinks">Drinks</MenuItem>
          </Select>
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            name="description"
            value={form.description || ''}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="veg"
                checked={form.veg || false}
                onChange={handleChange}
              />
            }
            label="Veg"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="available"
                checked={form.available ?? true}
                onChange={handleChange}
              />
            }
            label="Available for order"
          />

          <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
            <Button variant="outlined" onClick={handleClose} sx={{ borderColor: '#6fbf73', color: 'black' }}>
              Cancel
            </Button>
            <LoadingButton
              onClick={handleUpdateItem}
              loading={loading}
              variant="contained"
              sx={{ backgroundColor: '#6fbf73', color: 'black' }}
            >
              Save Changes
            </LoadingButton>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
