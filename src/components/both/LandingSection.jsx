import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Grid, Button, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const sections = [
  'Giới thiệu',
  'Bộ sưu tập nội thất',
  'Thiết kế bản vẽ',
  'Gặp gỡ nhà thiết kế',
  'Liên hệ với chúng tôi',
];

const introFeatures = [
  { title: 'Chất lượng', description: 'Lorem ipsum dolor sit amet.', img: '/images/quality.png' },
  { title: 'Thiết kế', description: 'Consectetur adipiscing elit.', img: '/images/design.png' },
  { title: 'Công nghệ', description: 'Sed do eiusmod tempor.', img: '/images/tech.png' },
  { title: 'Ứng dụng', description: 'Incididunt ut labore et dolore.', img: '/images/app.png' },
];

const images = new Array(10).fill(null); 

const LandingSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeProp, setFadeProp] = useState({ opacity: 1 });

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Hiệu ứng fade khi chuyển ảnh
  const handleNext = () => {
    setFadeProp({ opacity: 0 });
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setFadeProp({ opacity: 1 });
    }, 300); // thời gian fade out trước khi đổi ảnh
  };

  const handlePrev = () => {
    setFadeProp({ opacity: 0 });
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      setFadeProp({ opacity: 1 });
    }, 300);
  };

  return (
    <Box>
      {sections.map((title, index) => {
        if (index === 0) {
          return (
            <Box
              key={index}
              id={`section-${index}`}
              sx={{
                minHeight: '80vh',
                px: 2,
                backgroundColor: '#F5F5F5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                  maxWidth: 1200,
                  py: { xs: 6, md: 10 },
                  boxSizing: 'border-box',
                }}
              >
                <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {title}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      maxWidth: 600,
                      mx: 'auto',
                      color: 'text.secondary',
                      fontSize: { xs: '1rem', md: '1.125rem' },
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec ipsum at quam cursus laoreet.
                  </Typography>
                </Box>

                <Grid container spacing={4} justifyContent="center">
                  {introFeatures.map((feature, i) => (
                    <Grid item xs={12} sm={6} md={3} key={i}>
                      <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" px={2}>
                        <Avatar
                          src={feature.img}
                          alt={feature.title}
                          sx={{
                            width: { xs: 100, md: 120 },
                            height: { xs: 100, md: 120 },
                            mb: 3,
                          }}
                        />
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 'bold', fontSize: { xs: '1.1rem', md: '1.25rem' }, mb: 1 }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: 'text.secondary', fontSize: { xs: '0.9rem', md: '1rem' } }}
                        >
                          {feature.description}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          );
        }

        if (index === 1) {
          return (
            <Box
              key={index}
              id={`section-${index}`}
              sx={{
                minHeight: '80vh',
                backgroundColor: '#E0E0E0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
              }}
            >
              <Box
                sx={{
                  maxWidth: 1200,
                  width: '100%',
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 4,
                  py: { xs: 6, md: 10 },
                  position: 'relative',
                }}
              >
                {/* Slide ảnh bên trái */}
                <Box
                  sx={{
                    flex: 1,
                    height: 300,
                    backgroundColor: '#f0f0f0',
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover .arrow-btn': {
                      opacity: 1,
                    },
                  }}
                >
                  {/* Ảnh hiện tại (fade effect) */}
                  <Box
                    sx={{
                      width: '90%',
                      height: '90%',
                      backgroundColor: '#ddd',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      color: '#999',
                      transition: 'opacity 0.3s ease-in-out',
                      ...fadeProp,
                    }}
                  >
                    Ảnh {currentIndex + 1}
                  </Box>

                  {/* Nút mũi tên trái */}
                  <IconButton
                    className="arrow-btn"
                    onClick={handlePrev}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: 8,
                      transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      color: '#fff',
                      opacity: 0,
                      transition: 'opacity 0.3s ease-in-out',
                      '&:hover': { backgroundColor: 'rgba(0,0,0,0.4)' },
                    }}
                    aria-label="previous"
                  >
                    <ArrowBackIosNewIcon />
                  </IconButton>

                  {/* Nút mũi tên phải */}
                  <IconButton
                    className="arrow-btn"
                    onClick={handleNext}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      right: 8,
                      transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      color: '#fff',
                      opacity: 0,
                      transition: 'opacity 0.3s ease-in-out',
                      '&:hover': { backgroundColor: 'rgba(0,0,0,0.4)' },
                    }}
                    aria-label="next"
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                </Box>

                {/* Nội dung bên phải */}
                <Box flex={1} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Nội thất
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
                    Bộ sưu tập nội thất độc quyền, mang phong cách hiện đại và tối giản cho mọi không gian sống.
                  </Typography>
                  <ul style={{ paddingLeft: '1rem', marginBottom: '16px' }}>
                    <li>Thiết kế tinh tế, phù hợp với mọi không gian</li>
                    <li>Chất liệu cao cấp và thân thiện môi trường</li>
                    <li>Công nghệ tích hợp AR giúp trải nghiệm thực tế</li>
                    <li>Dễ dàng lắp đặt, linh hoạt trong sử dụng</li>
                  </ul>
                  <Button variant="contained" sx={{ backgroundColor: '#3F5139', '&:hover': { backgroundColor: '#2e3b27' } }}>
                    Khám phá ngay
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        }

        if (index === 2) {
          return (
            <Box
              key={index}
              id={`section-${index}`}
              sx={{
                minHeight: '80vh',
                backgroundColor: '#F5F5F5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
              }}
            >
              <Box
                sx={{
                  maxWidth: 1200,
                  width: '100%',
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 4,
                  py: { xs: 6, md: 10 },
                  position: 'relative',
                }}
              >
                
                {/* Nội dung bên phải */}
                <Box flex={1} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Bản thiết kế
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
                    Bộ sưu tập nội thất độc quyền, mang phong cách hiện đại và tối giản cho mọi không gian sống.
                  </Typography>
                  <ul style={{ paddingLeft: '1rem', marginBottom: '16px' }}>
                    <li>Thiết kế tinh tế, phù hợp với mọi không gian</li>
                    <li>Chất liệu cao cấp và thân thiện môi trường</li>
                    <li>Công nghệ tích hợp AR giúp trải nghiệm thực tế</li>
                    <li>Dễ dàng lắp đặt, linh hoạt trong sử dụng</li>
                  </ul>
                  <Button variant="contained" sx={{ backgroundColor: '#3F5139', '&:hover': { backgroundColor: '#2e3b27' } }}>
                    Khám phá ngay
                  </Button>
                </Box>

                {/* Slide ảnh bên trái */}
                <Box
                  sx={{
                    flex: 1,
                    height: 300,
                    backgroundColor: '#f0f0f0',
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover .arrow-btn': {
                      opacity: 1,
                    },
                  }}
                >
                  {/* Ảnh hiện tại (fade effect) */}
                  <Box
                    sx={{
                      width: '90%',
                      height: '90%',
                      backgroundColor: '#ddd',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      color: '#999',
                      transition: 'opacity 0.3s ease-in-out',
                      ...fadeProp,
                    }}
                  >
                    Ảnh {currentIndex + 1}
                  </Box>

                  {/* Nút mũi tên trái */}
                  <IconButton
                    className="arrow-btn"
                    onClick={handlePrev}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: 8,
                      transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      color: '#fff',
                      opacity: 0,
                      transition: 'opacity 0.3s ease-in-out',
                      '&:hover': { backgroundColor: 'rgba(0,0,0,0.4)' },
                    }}
                    aria-label="previous"
                  >
                    <ArrowBackIosNewIcon />
                  </IconButton>

                  {/* Nút mũi tên phải */}
                  <IconButton
                    className="arrow-btn"
                    onClick={handleNext}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      right: 8,
                      transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      color: '#fff',
                      opacity: 0,
                      transition: 'opacity 0.3s ease-in-out',
                      '&:hover': { backgroundColor: 'rgba(0,0,0,0.4)' },
                    }}
                    aria-label="next"
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                </Box>

              </Box>
            </Box>
          );
        }

        if (index === 3) {
          return (
            <Box
              key={index}
              id={`section-${index}`}
              sx={{
                minHeight: '80vh',
                px: 2,
                backgroundColor: '#E0E0E0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                  maxWidth: 1200,
                  py: { xs: 6, md: 10 },
                  boxSizing: 'border-box',
                }}
              >
                <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {title}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      maxWidth: 600,
                      mx: 'auto',
                      color: 'text.secondary',
                      fontSize: { xs: '1rem', md: '1.125rem' },
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec ipsum at quam cursus laoreet.
                  </Typography>
                </Box>

                <Grid container spacing={4} justifyContent="center">
                  {introFeatures.map((feature, i) => (
                    <Grid item xs={12} sm={6} md={3} key={i}>
                      <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" px={2}>
                        <Avatar
                          src={feature.img}
                          alt={feature.title}
                          sx={{
                            width: { xs: 100, md: 120 },
                            height: { xs: 100, md: 120 },
                            mb: 3,
                          }}
                        />
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 'bold', fontSize: { xs: '1.1rem', md: '1.25rem' }, mb: 1 }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: 'text.secondary', fontSize: { xs: '0.9rem', md: '1rem' } }}
                        >
                          {feature.description}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          );
        }

        if (index === 4) {
          return (
            <Box
              key={index}
              id={`section-${index}`}
              sx={{
                minHeight: '80vh',
                backgroundColor: '#F5F5F5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
              }}
            >
              <Box
                sx={{
                  maxWidth: 1200,
                  width: '100%',
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 4,
                  py: { xs: 6, md: 10 },
                  position: 'relative',
                }}
              >
                
                {/* Nội dung bên phải */}
                <Box flex={1} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Liên hệ
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
                    Bộ sưu tập nội thất độc quyền, mang phong cách hiện đại và tối giản cho mọi không gian sống.
                  </Typography>
                  <ul style={{ paddingLeft: '1rem', marginBottom: '16px' }}>
                    <li>Thiết kế tinh tế, phù hợp với mọi không gian</li>
                    <li>Chất liệu cao cấp và thân thiện môi trường</li>
                    <li>Công nghệ tích hợp AR giúp trải nghiệm thực tế</li>
                    <li>Dễ dàng lắp đặt, linh hoạt trong sử dụng</li>
                  </ul>
                  <Button variant="contained" sx={{ backgroundColor: '#3F5139', '&:hover': { backgroundColor: '#2e3b27' } }}>
                    Khám phá ngay
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        }
        return null;
      })}
    </Box>
  );
};

export default LandingSection;
