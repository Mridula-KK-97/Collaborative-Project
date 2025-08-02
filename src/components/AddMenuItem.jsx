import * as React from 'react';
import {Backdrop,Box,Modal,Fade,Button,Typography,TextField,MenuItem,Select,Checkbox,FormControlLabel,} from '@mui/material';
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

export default function TransitionsModal({ open, handleClose ,onItemAdded ,editingItem, setEditingItem }) {

  const [loading, setLoading] = React.useState(false);

  const initialForm = {name: '',price: '',category: '',description: '',available: true,veg: false,image_url: '',};

  const [form, setForm] = React.useState(initialForm);

// ================ADD ITEM(MENU)=========================
  const handleAddItem = async (e) => {
      e.preventDefault();
      setLoading(true);
      if (!form.name || isNaN(form.price) || !form.category || !form.description) 
      {
        alert('Please fill all fields correctly.');
        setLoading(false);
        setForm(initialForm)
        return;
      }

  try {
    const res = await fetch('/api/menu/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    let result = null;

    const text = await res.text();
    if (text) {
      result = JSON.parse(text);
    }

    if (res.ok) {
      alert('Item added!');
      handleClose();
      onItemAdded(); 
    } else {
      alert(result?.error || 'Something went wrong');
    }
  } catch (error) {
    alert('Failed to add item');
    console.error('Error adding item:', error);
  } finally {
    setLoading(false);
  }
};


React.useEffect(() => {
  if (open && editingItem) {
    setForm({
      name: editingItem.name || '',
      price: editingItem.price || '',
      category: editingItem.category || '',
      description: editingItem.description || '',
      available: editingItem.available === true || editingItem.available === 'TRU',
      veg: editingItem.veg === true || editingItem.veg === 'TRU',
      image_url: editingItem.image_url || '',
    });
  } else if (open && !editingItem) {
    setForm(initialForm); 
  }
}, [open, editingItem]);


const handleChange = (e) => {
  const { name, type, checked, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value,
  }));
};

// ======================image onchange===================
const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image_url : reader.result }));
    };
    reader.readAsDataURL(file);
  }
};

return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Add New Item
          </Typography>
          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            Upload Image
          </Typography>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          {form.image && (
            <Box mt={2}>
              <Typography variant="caption">Preview:</Typography>
              <img src={form.image} alt="Preview" style={{ width: '100%', maxHeight: 200, objectFit: 'cover' }} />
            </Box>
          )}
          <TextField label="Item Name" fullWidth margin="normal" name='name'  value={form.name} onChange={handleChange} />
          <TextField label="Price ($)" fullWidth margin="normal" name='price'  value={form.price} onChange={handleChange}/>
          <Select fullWidth defaultValue="" displayEmpty sx={{ mt: 2 }} name='category' value={form.category} onChange={handleChange}>
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
            margin="normal" name='description' value={form.description}  onChange={handleChange}/>
            <FormControlLabel control={
            <Checkbox
              name='veg'
              checked={form.veg}
              onChange={(e) =>
              setForm({ ...form, veg: e.target.checked })}/>
          }
          label="veg"
        />
         <FormControlLabel control={
            <Checkbox
              name='available'
              checked={form.available}
              onChange={(e) =>
              setForm({ ...form, available: e.target.checked })}/>
          }
          label="Available for order"
        />

          <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
            <Button variant="outlined" onClick={handleClose} sx={{borderColor:'#6fbf73',color:'black'}}>
              Cancel
            </Button>
            <LoadingButton
              onClick={handleAddItem}
              loading={loading}
              variant="contained"
              sx={{backgroundColor:'#6fbf73',color:'black'}}
            >
            {editingItem ? 'Update Item' : 'Add Item'}
            </LoadingButton>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
