import React, { useEffect}from 'react';
import Sidebar from '../../components/partner/Sidebar';
import Header from '../../components/partner/Header';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload?.Role;
      if (role !== 'Designer' && role !== 1 && role !== '1') {
        navigate('/login');
      }
    } catch (e) {
      console.error('Token decode error:', e);
      navigate('/login');
    }
  }, [navigate]);
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
