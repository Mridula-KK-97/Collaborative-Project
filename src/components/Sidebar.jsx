'use client';
import {Drawer,List,ListItemButton,ListItemIcon,ListItemText,Box,Typography,Divider,Avatar} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = ({ activeContent, setActiveContent })=> {
  
  const drawerWidth = 260;

  const navItems = [
    { text: 'Overview', icon: <HomeIcon />, key: 'overview' },
    { text: 'Menu Management', icon: <RestaurantMenuIcon />, key: 'menu' },
    { text: 'Orders', icon: <ShoppingCartIcon />, key: 'orders' },
    { text: 'Staff', icon: <PeopleIcon />, key: 'staff' },
    { text: 'Settings', icon: <SettingsIcon />, key: 'settings' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          bgcolor:' #357a38',     
          color: '#FFFFFF',       
        },
      }}
    >
     
      <Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight="bold" color="inherit">
            RestaurantOS
          </Typography>
          <Typography variant="body2" color="inherit">
            Management Dashboard
          </Typography>
        </Box>
        <Divider sx={{ borderColor: '#357a38' }} />

        <List>
          {navItems.map(({ text, icon, key }) => (
            <ListItemButton
              key={key}
              onClick={() => setActiveContent(key)}
              sx={{
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                color: '#fff',
                '& .MuiListItemIcon-root': { color: '#fff' },
                '&:hover': {
                  bgcolor: 'white', 
                  color: '#000',
                  '& .MuiListItemIcon-root': { color: '#000' },
                },
                ...(activeContent === key && {
                  bgcolor: 'white', 
                  color: '#000',
                  '& .MuiListItemIcon-root': { color: '#000' },
                }),
              }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box sx={{ p: 2 }}>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Avatar sx={{color:'#1E2A38'}}>R</Avatar>
          <Box>
            <Typography variant="body2" color="inherit">
              Restaurant Admin
            </Typography>
            <Typography variant="caption" color="inherit">
              Admin
            </Typography>
          </Box>
        </Box>
        <ListItemButton
          sx={{
            borderRadius: 2,
            color: '#fff',
            '& .MuiListItemIcon-root': { color: '#fff' },
             '&:hover': {
                  bgcolor: 'white', 
                  color: '#000',
                  '& .MuiListItemIcon-root': { color: '#000' },
                },
          }}
        >
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItemButton>
      </Box>
    </Drawer>
  );
}
export default Sidebar
