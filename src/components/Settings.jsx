'use client';
import {Box,Button,Container,Grid,Tab,Tabs,TextField,Typography,Paper,Avatar,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Chip,} from '@mui/material';
import { useEffect, useState } from 'react';
import {Public,People,Notifications,Settings} from '@mui/icons-material';
import Switch from '@mui/material/Switch';
import AddUsers from './AddUsers'

const Setting = () => {
  
  const [activeTab, setActiveTab] = useState(0);
  const [open,setOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const handleModal = () => {
    setOpen(prev => !prev)
  }

  const tabData = [{ label: 'Restaurant Info', icon: <Public /> },
  { label: 'User Management', icon: <People /> },
  { label: 'Notifications', icon: <Notifications /> },];

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

// ====================USER VIEW==================
const fetchUsers = async () => {
    const res = await fetch('/api/users/get');
    const data = await res.json();
    setUsers(data.users); 

  };

  useEffect(() => {
    fetchUsers(); 
  }, []);

// ===================USER DELETE====================
  const deleteUser = async (id) => {
  const res = await fetch('/api/users/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });

  const result = await res.json();

  if (res.ok) {
    console.log('Deleted:', result.message);
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
 
  } else {
    console.error('Delete failed:', result.error);
  }
};

  return (
  <Box sx={{ mt: 3, mb: 8, ml: 3,p: 2 }}>
  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
    <Typography variant="h5" fontWeight="bold" color="white">Admin Settings</Typography>
    <Button variant="contained" startIcon={<Settings />} sx={{ backgroundColor: '#1D4ED8', color: 'black' }}>
      Save Changes
    </Button>
  </Box>

  <Paper elevation={5} sx={{ borderRadius: 4, backgroundColor: '#2d2d2d', color: 'white' }}>
    <Tabs
      value={activeTab}
      onChange={handleTabChange}
      variant="scrollable"
      scrollButtons="auto"
      sx={{ px: 2, pt: 1 }}
    >
      {tabData.map((tab, index) => (
        <Tab
          key={index}
          label={tab.label}
          icon={tab.icon}
          iconPosition="start"
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            color: 'white',
            '&.Mui-selected': {
              color: 'white',
            }
          }}
        />
      ))}
    </Tabs>

    <Box p={3}>
      {activeTab === 0 && (
        <Grid container spacing={3}>
          {[
            { label: 'Restaurant Name', value: 'Bella Vista Restaurant' },
            { label: 'Phone Number', value: '+1 (555) 123-4567' },
            { label: 'Email Address', value: 'info@bellavista.com' },
            { label: 'Website', value: 'www.bellavista.com' }
          ].map((field, idx) => (
            <Grid item xs={12} sm={6} key={idx}>
              <TextField
                label={field.label}
                fullWidth
                defaultValue={field.value}
                InputLabelProps={{ style: { color: '#ccc' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <TextField
              label="Address"
              fullWidth
              multiline
              minRows={3}
              defaultValue="123 Main Street, Downtown, NY 10001"
              InputLabelProps={{ style: { color: '#ccc' } }}
              InputProps={{ style: { color: 'white' } }}
            />
          </Grid>
        </Grid>
      )}

      {activeTab === 1 && (
        <>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="medium" color="white">Team Members</Typography>
            <Button variant="contained" sx={{ backgroundColor: '#1D4ED8', color: 'black' }} onClick={handleModal}>
              Add User
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {['Name', 'Email', 'Role', 'Status', 'Date of Joining', 'Actions'].map((head, i) => (
                    <TableCell key={i} sx={{ color: 'white', fontWeight: 'bold' }}>{head}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, idx) => (
                  <TableRow key={idx}>
                    <TableCell sx={{ color: 'white' }}>{user.name}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{user.email}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{user.role}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.status === 'TRU' || user.status === true ? 'ACTIVE' : 'INACTIVE'}
                        sx={{
                          color: user.status ? '#4caf50' : '#f44336',
                          fontWeight: 'bold',
                          mb: 1,
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: 'white' }}>{user.date_of_joining}</TableCell>
                    <TableCell>
                      <Button variant="text" color="primary">Edit</Button>
                      <Button variant="text" sx={{ color: '#ba000d' }} onClick={() => deleteUser(user.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <AddUsers open={open} handleClose={handleModal} onUserAdded={fetchUsers} />
        </>
      )}

      {activeTab === 2 && (
        <>
          <Typography variant="h6" fontWeight="medium" mb={2} color="white">
            Alert Preferences
          </Typography>
          {[
            {
              title: 'New Orders',
              desc: 'Get notified when new orders are placed',
              enabled: true,
            },
            {
              title: 'Low Stock',
              desc: 'Alert when inventory items are running low',
              enabled: true,
            },
            {
              title: 'Daily Reports',
              desc: 'Receive daily sales and performance reports',
              enabled: true,
            },
            {
              title: 'System Updates',
              desc: 'Notifications about system updates and maintenance',
              enabled: false,
            },
            {
              title: 'Email Notifications',
              desc: 'Send notifications via email',
              enabled: true,
            },
            {
              title: 'Sms Notifications',
              desc: 'Send notifications via SMS',
              enabled: false,
            },
          ].map((item, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              py={2}
              borderBottom={1}
              borderColor="divider"
            >
              <Box>
                <Typography fontWeight="medium" color="white">{item.title}</Typography>
                <Typography variant="body2" color="gray">{item.desc}</Typography>
              </Box>
              <Switch color="primary" defaultChecked={item.enabled} />
            </Box>
          ))}
        </>
      )}

      {activeTab > 2 && (
        <Typography color="gray">
          This section ({tabData[activeTab].label}) is under development.
        </Typography>
      )}
    </Box>
  </Paper>
</Box>
  )
}
export default Setting
