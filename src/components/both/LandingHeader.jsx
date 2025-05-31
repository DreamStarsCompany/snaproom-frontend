import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Slide,
} from '@mui/material';
// import landingBanner from '../../assets/image/landing_banner.png';
import { routes } from "../../routes";
import { Link } from "react-router-dom";


const menuItems = [
  { label: 'Giới thiệu', target: 'section-0' },
  { label: 'Nội thất', target: 'section-1' },
  { label: 'Bản vẽ', target: 'section-2' },
  { label: 'Nhà thiết kế', target: 'section-3' },
  { label: 'Liên Hệ', target: 'section-4' },
];

const LandingHeader = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Kéo xuống: ẩn header
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY) {
        // Kéo lên một chút: hiện lại
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Slide in={showHeader} direction="down">
        <AppBar
          position="sticky"
          sx={{
            background: 'linear-gradient(to right, #3F5139, #3F5139)',
            boxShadow: 'none',
            zIndex: 1000,
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              SnapRoom
            </Typography>

            <Box sx={{ display: 'flex', gap: 5 }}>
              {menuItems.map((item) => (
                <Typography
                  key={item.label}
                  onClick={() => handleScrollTo(item.target)}
                  sx={{
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    transition: 'color 0.3s, text-decoration 0.3s',
                    '&:hover': {
                      color: '#A4C3A2',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </Slide>

      <Box
        sx={{
          // backgroundImage: `url(${landingBanner})`,
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 4,
        }}
      >
        <Box sx={{ maxWidth: 600, textAlign: 'center' }}>
          <Box
            sx={{
              backgroundColor: '#3F5139',
              padding: 3,
              borderRadius: 2,
              marginBottom: 3,
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}
            >
              SnapRoom
            </Typography>
            <Typography sx={{ color: 'white', fontStyle: 'italic' }}>
              Style Your Space, Your Way.
            </Typography>
          </Box>

          <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
            Lorem ipsum dolor sit amet
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              sx={{
                minWidth: "15vh",
                backgroundColor: '#3F5139',
                color: 'white',
                fontWeight: 'bold',
                textTransform: 'none',
                borderRadius: 2,
                px: 2,
                '&:hover': {
                  backgroundColor: '#2B3B27',
                },
              }}
            >
              Download
            </Button>
            <Link to={routes.register} style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                sx={{
                  minWidth: "15vh",
                  backgroundColor: '#3F5139',
                  color: 'white',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 2,
                  '&:hover': {
                    backgroundColor: '#2B3B27',
                  },
                }}
              >
                Đăng ký
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LandingHeader;
