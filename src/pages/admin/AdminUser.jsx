import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from '../../components/admin/AdminSidebar';
import Header from '../../components/admin/AdminHeader';
import { Box, Typography, InputBase, TextField, MenuItem } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserTable from '../../components/admin/UserTable';

export default function AdminUser() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

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
        <Box sx={{ flexShrink: 0, minHeight: 64 }}>
          <Header />
        </Box>

        <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', p: 2, overflowY: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, mb: 2, mt: 2 }}>
            <Typography variant='h4' sx={{ fontWeight: 500 }}>
              Người dùng
            </Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
              {/* Search box giống furniture */}
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
                  placeholder="Tên người dùng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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

              {/* Filter Role */}
              <Box
                sx={{
                  width: 180,
                  bgcolor: 'white',
                  borderRadius: '999px',
                  boxShadow: '0 0 0 1px #ccc',
                  px: 2,
                }}
              >
                <TextField
                  select
                  variant="standard"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                  sx={{
                    '& .MuiSelect-select': {
                      py: 1,
                    },
                  }}
                >
                  <MenuItem value="">Tất cả</MenuItem>
                  <MenuItem value="1">Nhà thiết kế</MenuItem>
                  <MenuItem value="2">Khách hàng</MenuItem>
                  <MenuItem value="0">Admin</MenuItem>
                </TextField>
              </Box>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', p: 2, overflowY: 'auto' }}>
            <UserTable searchTerm={searchTerm} roleFilter={roleFilter} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
