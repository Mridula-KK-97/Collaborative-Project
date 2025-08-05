'use client';
import React, { useState, useEffect } from 'react';
import {Grid, Card, CardContent, Typography, Box, Table, TableBody, TableCell,TableContainer, TableHead, TableRow, Chip, Avatar,Dialog, DialogTitle, DialogContent, Button, useTheme, useMediaQuery} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Overview = () => {
  const [dateString, setDateString] = useState('');
  const [open, setOpen] = useState(false);
  const theme = useTheme();
   const [orders, setOrders] = useState([]);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setDateString(today);
  }, []);

  const stats = [
    { label: 'Total Orders', value: 4, icon: <ShoppingCartIcon />, bg: '#e0f2fe', color: '#0284c7' },
    { label: "Today's Revenue", value: '$97.45', icon: <AttachMoneyIcon />, bg: '#dcfce7', color: '#16a34a' },
    { label: 'Pending Orders', value: 1, icon: <AccessTimeIcon />, bg: '#fef9c3', color: '#eab308' },
    { label: 'Avg Order Value', value: '$32.48', icon: <TrendingUpIcon />, bg: '#f3e8ff', color: '#9333ea' },
  ];

 

  useEffect(() => {
    async function fetchOrders() {
      const res = await fetch('/api/order/get');
      const data = await res.json();
      setOrders(data);
    }

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Preparing': return { color: 'primary' };
      case 'Ready': return { color: 'success' };
      case 'Served': return { color: 'default' };
      default: return { color: 'default' };
    }
  };

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', md: 'calc(100vw - 280px - 48px)' }, 
        p: { xs: 2, sm: 3 },
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: 4,
        mx: 'auto',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" mb={3}>
        <Typography variant="h5" fontWeight="bold">Dashboard Overview</Typography>
        <Typography variant="body2" color="text.secondary">{dateString || 'Loading...'}</Typography>
      </Box>
      <Grid container spacing={3} mb={4}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: stat.bg, color: stat.color }}>{stat.icon}</Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                    <Typography variant="h6" fontWeight="bold">{stat.value}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">Recent Orders</Typography>
            {isMobile && (
              <Button variant="outlined" onClick={handleOpenModal}>
                View Orders
              </Button>
            )}
          </Box>

          {!isMobile && (
            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ORDER ID</TableCell>
                    <TableCell>TABLE</TableCell>
                    <TableCell>ITEMS</TableCell>
                    <TableCell>TOTAL</TableCell>
                    <TableCell>STATUS</TableCell>
                    <TableCell>TIME</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell><Typography fontWeight="bold">{order.order_id}</Typography></TableCell>
                      <TableCell>{order.table_no}</TableCell>
                      <TableCell>{order.item} items</TableCell>
                      <TableCell><Typography fontWeight="bold">{order.tot_price}</Typography></TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          color={getStatusColor(order.status).color}
                          variant="filled"
                          sx={{ fontWeight: 500 }}
                        />
                      </TableCell>
                      <TableCell>{order.created_at}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleCloseModal} fullScreen>
        <DialogTitle>Recent Orders</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ORDER ID</TableCell>
                <TableCell>TABLE</TableCell>
                <TableCell>ITEMS</TableCell>
                <TableCell>TOTAL</TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell>TIME</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell><Typography fontWeight="bold">{order.id}</Typography></TableCell>
                  <TableCell>{order.table}</TableCell>
                  <TableCell>{order.items} items</TableCell>
                  <TableCell><Typography fontWeight="bold">{order.total}</Typography></TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      color={getStatusColor(order.status).color}
                      variant="filled"
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                  <TableCell>{order.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Overview;
