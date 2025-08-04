'use client';
import {Drawer, List, ListItemButton, ListItemIcon, ListItemText,Box, Typography, Avatar} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = ({ activeContent, setActiveContent }) => {
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
          height: 800,
          boxSizing: 'border-box',
          bgcolor: '#2c2c2c',
          color: '#FFFFFF',
          p: 2, 
          mt:10,
        },
      }}
    >
    <Box display="flex" flexDirection="column" height="300px" justifyContent="space-between">
        <Box>
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

        
      </Box>
    </Drawer>
  );
};

export default Sidebar;
