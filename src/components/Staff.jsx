import React, { useState } from 'react';
import {Box,Container,Typography,TextField,Select,MenuItem,Card,Avatar,IconButton,Chip,FormControl,InputLabel,} from '@mui/material';
import { Edit, Delete, Email, Phone, AttachMoney } from '@mui/icons-material';

const staffData = [
  {
    name: 'Jinu',
    department: 'Front of House',
    email: 'jinu@restaurant.com',
    phone: '+1 (555) 123-4567',
    salary: 55000,
  },
  {
    name: 'Sarah',
    department: 'Kitchen',
    email: 'sarah@restaurant.com',
    phone: '+1 (555) 234-5678',
    salary: 42000,
  },
  {
    name: 'Maya',
    department: 'Front of House',
    email: 'maya@restaurant.com',
    phone: '+1 (555) 345-6789',
    salary: 38000,
  },
  {
    name: 'Roya',
    department: 'Kitchen',
    email: 'roya@restaurant.com',
    phone: '+1 (555) 456-7890',
    salary: 47000,
  },
];

const Staff = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleFilterChange = (e) => {
    setDepartmentFilter(e.target.value);
  };

  const filteredStaff = staffData.filter((staff) => {
    const matchName = staff.name.toLowerCase().includes(searchTerm);
    const matchDept =
      departmentFilter === 'All Departments' ||
      staff.department === departmentFilter;
    return matchName && matchDept;
  });

  return (
    <Box sx={{ mt: 3, mb: 8 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Staff Management
        </Typography>
      </Box>

      <Box display="flex" gap={2} mb={4}>
        <TextField
          fullWidth
          placeholder="Search staff members..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>All Departments</InputLabel>
          <Select
            value={departmentFilter}
            label="All Departments"
            onChange={handleFilterChange}
          >
            <MenuItem value="All Departments">All Departments</MenuItem>
            <MenuItem value="Front of House">Front of House</MenuItem>
            <MenuItem value="Kitchen">Kitchen</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box display="flex" flexWrap="wrap" gap={3}>
        {filteredStaff.map((staff, index) => (
          <Card
            key={index}
            sx={{
              width: 360,
              p: 2,
              borderRadius: 3,
              boxShadow: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
  
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{backgroundColor:'#6fbf73'}}>{staff.name[0]}</Avatar>
                <Box>
                  <Typography fontWeight="bold">{staff.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {staff.department}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <IconButton>
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton>
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            <Box mt={1}>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Email fontSize="small" /> {staff.email}
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Phone fontSize="small" /> {staff.phone}
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AttachMoney fontSize="small" /> ${staff.salary.toLocaleString()}/year
              </Typography>
            </Box>

          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Staff;
