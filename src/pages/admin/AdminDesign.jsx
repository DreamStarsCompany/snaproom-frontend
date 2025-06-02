import React, { useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from '../../components/admin/AdminSidebar';
import Header from '../../components/admin/AdminHeader';
import { Box, Typography, InputBase } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import DesignTable from '../../components/admin/DesignTable';

export default function AdminDesign() {
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, mb: 2 }}>
            <Typography variant='h4' sx={{ fontWeight: 600 }}>
              Designs
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: 300,
                bgcolor: 'white',
                borderRadius: '999px',
                px: 2,
                py: '6px',
                boxShadow: '0 0 0 1px #ccc',
              }}
            >
              <SearchIcon sx={{ color: 'gray', mr: 1 }} />
              <InputBase
                placeholder="Search product name"
                sx={{
                  flex: 1,
                  color: 'gray',
                  fontSize: 16,
                  '& .MuiInputBase-input': {
                    p: 0,
                  },
                  '&:focus-within': {
                    outline: 'none',
                  },
                }}
                disableUnderline
              />
            </Box>
          </Box>

          <DesignTable />
        </Box>
      </Box>
    </Box>
  );
}
