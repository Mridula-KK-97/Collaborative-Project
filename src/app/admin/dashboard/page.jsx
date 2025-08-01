'use client';
import { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from '@/components/Sidebar';
import Overview from '@/components/Overview';
import Menu from '@/components/Menus';
import Order from '@/components/Order';
import Staff from '@/components/Staff';
import Settings from '@/components/Settings';

const page = () => {

  const [activeContent, setActiveContent] = useState('overview');

  const renderContent = () => {
    switch (activeContent) {
      case 'overview': return <Overview/>;
      case 'menu': return <Menu/>;
      case 'orders': return <Order />;
      case 'staff': return <Staff />;
      case 'settings': return <Settings />;
      default: return <Overview />;
    }
  };

  return (
    <Box display="flex">
      <Sidebar setActiveContent={setActiveContent} />
      <Box flex={1} p={3}>
        {renderContent()}
      </Box>
    </Box>

  )
}

export default page
