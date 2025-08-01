'use client';
import {
  Grid, Card, CardContent, Typography, Box, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, Avatar
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Overview = () => {
  const stats = [
    { label: 'Total Orders', value: 3, icon: <ShoppingCartIcon />, bg: '#e0f2fe', color: '#0284c7' },
    { label: "Today's Revenue", value: '$97.45', icon: <AttachMoneyIcon />, bg: '#dcfce7', color: '#16a34a' },
    { label: 'Pending Orders', value: 1, icon: <AccessTimeIcon />, bg: '#fef9c3', color: '#eab308' },
    { label: 'Avg Order Value', value: '$32.48', icon: <TrendingUpIcon />, bg: '#f3e8ff', color: '#9333ea' },
  ];

  const orders = [
    { id: 'ORD001', table: 'Table 5', items: 3, total: '$46.48', status: 'Preparing', time: '11:55:55 AM' },
    { id: 'ORD002', table: 'Table 3', items: 1, total: '$8.99', status: 'Ready', time: '11:40:55 AM' },
    { id: 'ORD003', table: 'Table 8', items: 2, total: '$41.98', status: 'Served', time: '11:25:55 AM' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Preparing': return { label: 'Preparing', color: 'primary' };
      case 'Ready': return { label: 'Ready', color: 'success' };
      case 'Served': return { label: 'Served', color: 'default' };
      default: return { label: status, color: 'default' };
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" mb={3}>
        <Typography variant="h5" fontWeight="bold">Dashboard Overview</Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
          })}
        </Typography>
      </Box>

      <Grid container spacing={3} mb={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label} sx={{ minWidth: { xs: '100%', sm: 270 } }}>
            <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: stat.bg, color: stat.color }}>
                    {stat.icon}
                  </Avatar>
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
          <Typography variant="h6" gutterBottom fontWeight="bold">Recent Orders</Typography>
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
                    <TableCell><Typography fontWeight="bold">{order.id}</Typography></TableCell>
                    <TableCell>{order.table}</TableCell>
                    <TableCell>{order.items} items</TableCell>
                    <TableCell><Typography fontWeight="bold">{order.total}</Typography></TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        color={getStatusColor(order.status).color}
                        variant="soft"
                        sx={{ fontWeight: 500 }}
                      />
                    </TableCell>
                    <TableCell>{order.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Overview;
