import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Pagination,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllDesignsAPI } from '../../services/UsersSevices';

const DesignTable = () => {
  const [designs, setDesigns] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6); // Số item mỗi trang
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await getAllDesignsAPI(page, pageSize);
      setDesigns(res.data.items || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error('Error fetching designs:', err);
    }
  };

  fetchData();
}, [page, pageSize]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <Box>
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#3F5139' }}>
            <TableRow>
              <TableCell sx={{ color: '#f5f5f5' }}>STT</TableCell>
              <TableCell sx={{ color: '#f5f5f5' }}>Hình ảnh</TableCell>
              <TableCell sx={{ color: '#f5f5f5' }}>Tên</TableCell>
              <TableCell sx={{ color: '#f5f5f5' }}>Giá</TableCell>
              <TableCell sx={{ color: '#f5f5f5' }} align="center">Quản lí</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {designs.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
                <TableCell>
                  <Avatar
                    variant="rounded"
                    src={item.image?.imageSource || ''}
                    alt={item.name}
                    sx={{ width: 56, height: 56 }}
                  />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price.toLocaleString()}đ</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" size="small">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination count={totalPages} page={page} onChange={handleChangePage} />
      </Box>
    </Box>
  );
};

export default DesignTable;
