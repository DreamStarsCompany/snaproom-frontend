import React from 'react';
import Sidebar from '../../components/admin/AdminSidebar';
import Header from '../../components/admin/AdminHeader';
import { Box, Typography } from '@mui/material';

export default function AdminDashboard() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />

        <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', p: 2 }}>
          <Typography variant='h4' sx={{ p: 2, fontWeight: '500'}} >
            Dashboard
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
