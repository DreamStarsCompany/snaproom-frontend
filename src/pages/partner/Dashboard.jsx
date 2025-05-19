import React from 'react';
import Sidebar from '../../components/partner/Sidebar';
import Header from '../../components/partner/Header';
import { Box } from '@mui/material';

export default function Dashboard() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />

        <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', p: 2 }}>
        </Box>
      </Box>
    </Box>
  );
}
