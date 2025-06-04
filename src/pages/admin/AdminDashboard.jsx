import React, { useEffect } from 'react';
import Sidebar from '../../components/admin/AdminSidebar';
import Header from '../../components/admin/AdminHeader';
import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AdminDashboard() {
const location = useLocation();
  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />

        <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', p: 2 }}>
          <Typography variant='h4' sx={{ p: 2, fontWeight: '600'}} >
            Thống kê
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
