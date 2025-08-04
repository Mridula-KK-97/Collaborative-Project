'use client';
import { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from '@/components/Sidebar';
import Overview from '@/components/Overview';
import Menu from '@/components/Menus';
import Order from '@/components/Order';
import Staff from '@/components/Staff';
import Settings from '@/components/Settings';
import Navbar from '@/components/Navbar';

const Page = () => {
  const [activeContent, setActiveContent] = useState('overview');

  const renderContent = () => {
    switch (activeContent) {
      case 'overview': return <Overview />;
      case 'menu': return <Menu />;
      case 'orders': return <Order />;
      case 'staff': return <Staff />;
      case 'settings': return <Settings />;
      default: return <Overview />;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ height: 64, bgcolor: '#1E1E1E',  display: 'flex', alignItems: 'center' }}>
        <Navbar />
      </Box>

      <Box sx={{ flexGrow: 1, display: 'flex', bgcolor: '#1D1D1D' }}>
        <Box sx={{ width: 240, bgcolor: '#1E1E1E', height: '50vh' }}>
          <Sidebar setActiveContent={setActiveContent} activeContent={activeContent}/>
        </Box>

        <Box sx={{ flexGrow: 1, p: 3 }}>
          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
