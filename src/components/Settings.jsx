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
   <Box sx={{ mt: 3, mb: 8 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">Admin Settings</Typography>
        <Button variant="contained"  startIcon={<Settings />} sx={{backgroundColor:'#6fbf73',color:'black'}}>
          Save Changes
        </Button>
      </Box>

      <Paper elevation={5} sx={{ borderRadius: 4 ,color:'black'}} >
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
              sx={{ textTransform: 'none', fontWeight: 500 ,color:'black'}}
            />
          ))}
        </Tabs>

        <Box p={3}>
          {activeTab === 0 && (
            <Grid container spacing={3}>
              <Grid  xs={12} sm={6}>
                <TextField
                  label="Restaurant Name"
                  fullWidth
                  defaultValue="Bella Vista Restaurant"
                />
              </Grid>
              <Grid  xs={12} sm={6}>
                <TextField
                  label="Phone Number"
                  fullWidth
                  defaultValue="+1 (555) 123-4567"
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  label="Email Address"
                  fullWidth
                  defaultValue="info@bellavista.com"
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  label="Website"
                  fullWidth
                  defaultValue="www.bellavista.com"
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  label="Address"
                  fullWidth
                  multiline
                  minRows={3}
                  defaultValue="123 Main Street, Downtown, NY 10001"
                />
              </Grid>
            </Grid>
          )}

          {activeTab === 1 && (
            <>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="medium">Team Members</Typography>
                <Button variant="contained" sx={{ backgroundColor: '#6fbf73', color: 'black' }} onClick={handleModal}>Add User</Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                         <Chip
                          label={user.status === 'TRU' || user.status === true ? 'ACTIVE' : 'INACTIVE'}
                          sx={{
                            color: user.status? '#4caf50' : '#f44336',
                            fontWeight: 'bold',
                            mb: 1,
                          }}
                        />
                          </TableCell>
                        <TableCell>
                          <Button variant="text" color="primary">Edit</Button>
                          <Button variant="text" sx={{ color: '#ba000d' }} onClick={() => deleteUser(user.id)}>Delete</Button>
                        </TableCell>
                        
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <AddUsers open={open} handleClose={handleModal} onUserAdded={fetchUsers}  />
            </>
          )}
    
          {activeTab > 1 && (
            <Typography color="text.secondary">
              This section ({tabData[activeTab].label}) is under development.
            </Typography>
          )}

            {activeTab === 2 && (
            <>
              <Typography variant="h6" fontWeight="medium" mb={2}>
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
                    <Typography fontWeight="medium">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.desc}
                    </Typography>
                  </Box>
                  <Switch
                    color="primary"
                    defaultChecked={item.enabled}
                  />
                </Box>
              ))}
            </>
          )}

        </Box>
      </Paper>
    </Box>
  );
}
export default Setting
