import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, Typography, Avatar, Stack, MenuItem, Select, FormControl } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import InventoryIcon from '@mui/icons-material/Inventory';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { getAllOrdersByDesAPI } from '../../services/UsersSevices';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Tooltip as MuiTooltip } from '@mui/material';

const DashboardDesigner = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const COLORS = ['#0088FE', '#FFBB28', '#00C49F'];

  const mockRevenueData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    revenue: Math.floor(Math.random() * 5000000) + 1000000, // random 1tr-5tr
  }));

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    // Sau này khi có API fetch data ở đây theo tháng
  };

  // Mock top sản phẩm bán chạy
  const productData = [
    { name: 'Sản phẩm A', sales: 50, image: 'https://via.placeholder.com/50' },
    { name: 'Sản phẩm B', sales: 45, image: 'https://via.placeholder.com/50' },
    { name: 'Sản phẩm C', sales: 40, image: 'https://via.placeholder.com/50' },
    { name: 'Sản phẩm D', sales: 35, image: 'https://via.placeholder.com/50' },
    { name: 'Sản phẩm E', sales: 30, image: 'https://via.placeholder.com/50' },
  ];

  // Mock trạng thái đơn hàng
  const statusData = [
    { name: 'Buy', value: 15 },
    { name: 'Processing', value: 25 },
    { name: 'Completed', value: 60 },
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getAllOrdersByDesAPI();
      const items = response.items || [];
      setTotalOrders(response.totalItems || 0);
      const uniqueCustomers = [...new Set(items.map(order => order.customer?.name))];
      setTotalCustomers(uniqueCustomers.length);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };


  return (
    <Box >
      <Grid container spacing={2} sx={{ mt: 0 }}>
        {/* Total User */}
        <Grid item xs={12} sm={6} md={3} sx={{ flex: 1 }}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 2, height: '70%', position: 'relative' }}>
            {/* Icon góc phải */}
            <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
              <Avatar sx={{ bgcolor: '#E9E5FB', width: 56, height: 56 }}>
                <GroupsIcon sx={{ color: '#5B50E5', fontSize: 30 }} />
              </Avatar>
            </Box>

            <Typography variant="body2" color="textSecondary" fontWeight={500} marginBottom={2}>
              Tổng người mua
            </Typography>
            <Typography variant="h4" fontWeight="bold" mt={1}>{totalCustomers}</Typography>

            <Stack direction="row" alignItems="center" spacing={0.5} mt={2}>
              <TrendingUpIcon sx={{ color: 'green', fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: 'green', fontWeight: 500 }}>8.5%</Typography>
              <Typography variant="body2" color="textSecondary">So với hôm qua</Typography>
            </Stack>
          </Card>
        </Grid>

        {/* Total Order */}
        <Grid item xs={12} sm={6} md={3} sx={{ flex: 1 }}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 2, height: '70%', position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
              <Avatar sx={{ bgcolor: '#FDEBD3', width: 56, height: 56 }}>
                <InventoryIcon sx={{ color: '#F59E0B', fontSize: 30 }} />
              </Avatar>
            </Box>

            <Typography variant="body2" color="textSecondary" fontWeight={500} marginBottom={2}>
              Tổng đơn hàng
            </Typography>
            <Typography variant="h4" fontWeight="bold" mt={1}>{totalOrders}</Typography>

            <Stack direction="row" alignItems="center" spacing={0.5} mt={2}>
              <TrendingUpIcon sx={{ color: 'green', fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: 'green', fontWeight: 500 }}>1.3%</Typography>
              <Typography variant="body2" color="textSecondary">So với hôm qua</Typography>
            </Stack>
          </Card>
        </Grid>

        {/* Total Sales */}
        <Grid item xs={12} sm={6} md={3} sx={{ flex: 1 }}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 2, height: '70%', position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
              <Avatar sx={{ bgcolor: '#DDF5EC', width: 56, height: 56 }}>
                <ShoppingCartIcon sx={{ color: '#22C55E', fontSize: 30 }} />
              </Avatar>
            </Box>

            <Typography variant="body2" color="textSecondary" fontWeight={500} marginBottom={2}>
              Tổng doanh thu
            </Typography>
            <Typography variant="h4" fontWeight="bold" mt={1}>23M VNĐ</Typography>

            <Stack direction="row" alignItems="center" spacing={0.5} mt={2}>
              <TrendingDownIcon sx={{ color: 'red', fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: 'red', fontWeight: 500 }}>4.3%</Typography>
              <Typography variant="body2" color="textSecondary">So với hôm qua</Typography>
            </Stack>
          </Card>
        </Grid>

        {/* Total Pending */}
        <Grid item xs={12} sm={6} md={3} sx={{ flex: 1 }}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 2, height: '70%', position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
              <Avatar sx={{ bgcolor: '#FFEFE3', width: 56, height: 56 }}>
                <AccessTimeIcon sx={{ color: '#F97316', fontSize: 30 }} />
              </Avatar>
            </Box>

            <Typography variant="body2" color="textSecondary" fontWeight={500} marginBottom={2}>
              Tổng thời gian
            </Typography>
            <Typography variant="h4" fontWeight="bold" mt={1}>1,040</Typography>

            <Stack direction="row" alignItems="center" spacing={0.5} mt={2}>
              <TrendingUpIcon sx={{ color: 'green', fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: 'green', fontWeight: 500 }}>1.8%</Typography>
              <Typography variant="body2" color="textSecondary">So với hôm qua</Typography>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* Line Chart */}
      <Card sx={{ mt: 4, p: 3, borderRadius: 3, boxShadow: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={5}>
          <Typography variant="h6" fontWeight="bold">Doanh thu theo ngày trong tháng</Typography>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select value={selectedMonth} onChange={handleMonthChange}>
              {[...Array(12).keys()].map(i => (
                <MenuItem key={i + 1} value={i + 1}>{`Tháng ${i + 1}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockRevenueData}>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis dataKey="day" />
              <YAxis tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={(value) => `${value.toLocaleString()} VNĐ`} />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Card>

      {/* Phần biểu đồ ngang gồm 2 biểu đồ BarChart và Donut Chart */}
      <Grid container spacing={2} mt={4}>
        {/* Bar chart top 5 sản phẩm */}
        <Grid item xs={12} md={6} sx={{ flex: 1 }}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>Top 5 sản phẩm bán chạy</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" height={20} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />

                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Donut chart trạng thái đơn hàng */}
        <Grid item xs={12} md={6} sx={{ flex: 0.5 }}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>Trạng thái đơn hàng</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  innerRadius={60}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>

    </Box>
  );
};

export default DashboardDesigner;
