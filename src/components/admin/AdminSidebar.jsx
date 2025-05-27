import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { routes } from "../../routes";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import WeekendIcon from '@mui/icons-material/Weekend';
import BrushIcon from '@mui/icons-material/Brush';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, route: 'adminDashboard' },
  { text: 'Furnitures', icon: <WeekendIcon />, route: '#' },
  { text: 'Designs', icon: <BrushIcon />, route: '#' },
  { text: 'Revenue', icon: <AttachMoneyIcon />, route: '#' },
  { text: 'Order List', icon: <ListAltIcon />, route: '#' },
  { text: 'Support', icon: <SupportAgentIcon />, route: '#' },
  { text: 'Contact', icon: <ContactMailIcon />, route: '#' },
];

const bottomItems = [
  { text: 'Settings', icon: <SettingsIcon />, route: '#' },
  { text: 'Logout', icon: <LogoutIcon />, route: 'login' },
];

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const handleClick = (text) => {
    setActiveItem(text);
  };

  return (
    <Box
      sx={{
        width: 240,
        height: '100vh',
        bgcolor: '#fff',
        color: '#2e3a25',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        py: 1,
        px: 2,
        boxSizing: 'border-box',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        overflowY: 'auto',
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          height: 60,
          mb: 4,
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#4e5c47',
          fontWeight: 'bold',
          fontSize: '1.25rem',
          userSelect: 'none',
        }}
      >
        SnapRoom
      </Box>

      {/* Menu Items */}
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map(({ text, icon, route }) => (
          <Link key={text} to={routes[route]} style={{ textDecoration: 'none'}}>
            <ListItemButton
              key={text}
              onClick={() => handleClick(text)}
              sx={{
                mb: 1,
                borderRadius: 1,
                bgcolor: activeItem === text ? '#3F5139' : 'transparent',
                color: activeItem === text ? 'white' : '#2e3a25',
                '&:hover': {
                  bgcolor: activeItem === text ? '#3F5139' : '#e0e0e0',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: activeItem === text ? 'white' : '#2e3a25',
                  minWidth: '40px',
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </Link>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Bottom Items */}
      <List>
        {bottomItems.map(({ text, icon, route }) => (
          <Link key={text} to={routes[route]} style={{ textDecoration: 'none'}}>
            <ListItemButton
              key={text}
              onClick={() => handleClick(text)}
              sx={{
                textDecoration: 'none',
                borderRadius: 1,
                bgcolor: activeItem === text ? '#3F5139' : 'transparent',
                color: activeItem === text ? 'white' : '#2e3a25',
                '&:hover': {
                  bgcolor: activeItem === text ? '#3F5139' : '#e0e0e0',
                },
                mb: 1,
              }}
            >
              <ListItemIcon
                sx={{
                  color: activeItem === text ? 'white' : '#2e3a25',
                  minWidth: '40px',
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;

