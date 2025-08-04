import * as React from 'react';
import {Backdrop,Box,Modal,Fade,Button,Typography,TextField,FormControlLabel, Checkbox,} from '@mui/material';
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

export default function TransitionsModal({ open, handleClose, onUserAdded }) {
  const [loading, setLoading] = React.useState(false);

  const [form, setForm] = React.useState({
    name: '',
    email: '',
    role: '',
    status: true,
    date_of_joining: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        console.log('User added:', data);
        if (onUserAdded) onUserAdded();
        handleClose();
        setForm({
          name: '',
          email: '',
          role: '',
          status: true,
          date_of_joining: '',
        });
      } else {
        console.error('Add failed:', data.error);
      }
    } catch (err) {
      console.error('Error:', err.message);
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
          <Typography variant="h6" gutterBottom>
            Add User
          </Typography>

          <TextField
            label="Name"
            fullWidth
            margin="normal"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <TextField
            label="Role"
            fullWidth
            margin="normal"
            name="role"
            value={form.role}
            onChange={handleChange}
          />

          <FormControlLabel
            control={
              <Checkbox
                name="status"
                checked={form.status}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    status: e.target.checked,
                  }))
                }
              />
            }
            label="Active"
          />

          <TextField
            label="Date of Joining"
            fullWidth
            margin="normal"
            name="date_of_joining"
            type="date"
            value={form.date_of_joining}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />

          <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ borderColor: '#6fbf73', color: 'black' }}
            >
              Cancel
            </Button>
            <LoadingButton
              onClick={handleAddUser}
              loading={loading}
              variant="contained"
              sx={{ backgroundColor: '#6fbf73', color: 'black' }}
            >
              Add User
            </LoadingButton>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
