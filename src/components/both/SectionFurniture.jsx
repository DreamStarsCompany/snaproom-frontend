import React from 'react';
import Slider from 'react-slick';
import { 
    Box, 
    Typography 
} from '@mui/material';
import { motion } from 'framer-motion';

import fur_section from '../../assets/image/fur_section.png';
import fur_section2 from '../../assets/image/fur_section2.png';
import fur_section3 from '../../assets/image/fur_section3.png';
import fur_section4 from '../../assets/image/fur_section4.png';
import fur_section5 from '../../assets/image/fur_section5.png';
import fur_section6 from '../../assets/image/fur_section6.png';
import fur_section7 from '../../assets/image/fur_section7.png';
import fur_section8 from '../../assets/image/fur_section8.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
    fur_section,
    fur_section2,
    fur_section3,
    fur_section4,
];

const images2 = [
    fur_section5,
    fur_section6,
    fur_section7,
    fur_section8,
];

const SectionFurniture = () => {
    const sliderRefLeft = React.useRef(null);
    const sliderRefRight = React.useRef(null);

    const settingsNormal = {
        vertical: true,
        verticalSwiping: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        speed: 3000,
        cssEase: 'linear',
        arrows: false,
        autoplay: true,
        autoplaySpeed: 0,
        pauseOnHover: true,
    };

    const settingsInverse = { ...settingsNormal };

    return (
        <Box
            id="section-1"
            sx={{
                py: 6,
                px: 4,
                background: 'linear-gradient(135deg,rgb(146, 161, 141) 0%,rgb(108, 123, 89) 100%)',
                color: '#f5f5f5',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
            }}
        >
            {/* RIGHT SIDE: TEXT with animation */}
            <Box
                component={motion.div}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                sx={{
                    width: { xs: '100%', md: '40%' },
                    textAlign: 'left',
                    px: { xs: 0, md: 3 },
                }}
            >
                <Typography
                    variant={'h2'}
                    sx={{ fontWeight: 'bold', mb: 1, letterSpacing: 1 }}
                >
                    Nội thất
                </Typography>
                <Typography
                    variant="subtitle1"
                    sx={{
                        mb: 3,
                        fontWeight: 500,
                        color: '#f5f5f5',
                        letterSpacing: 0.8,
                        maxWidth: 400, 
                        lineHeight: 1.6,
                        fontSize: '1rem', 
                        display: 'block',
                    }}
                >
                    Khám phá những thiết kế nội thất hiện đại, tiện nghi và thẩm mỹ cao,
                    biến không gian sống của bạn trở nên sang trọng và đầy cảm hứng.
                </Typography>
            </Box>

            {/* LEFT SIDE: TWO SLIDERS SIDE BY SIDE */}
            <Box
                sx={{
                    width: { xs: '100%', md: '55%' },
                    maxWidth: 400,
                    display: 'flex',
                    gap: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // Optional: cursor pointer on hover to reveal arrows if needed
                    '&:hover .arrow-btn': {
                        opacity: 1,
                        pointerEvents: 'auto',
                    },
                }}
            >
                {/* Right slider */}
                <Box
                    sx={{
                        height: 420,
                        width: '70%',
                        position: 'relative',
                        transform: 'rotate(180deg)',
                    }}
                >
                    <Slider ref={sliderRefRight} {...settingsInverse}>
                        {images.map((src, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    position: 'relative',
                                    borderRadius: 3,
                                    height: 140,
                                    mb: 2,
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            >
                                <Box
                                    component="img"
                                    src={src}
                                    alt={`slide-right-${idx}`}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: 3,
                                        transform: 'rotate(180deg)',
                                    }}
                                />
                                <Box
                                    className="overlay"
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        bgcolor: 'rgba(0,0,0,0.25)',
                                        opacity: 0,
                                        transition: 'opacity 0.3s ease',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: '#fff',
                                        fontWeight: '600',
                                        fontSize: 14,
                                        pointerEvents: 'none',
                                        '&:hover': {
                                            opacity: 1,
                                        },
                                    }}
                                >
                                    Xem chi tiết
                                </Box>
                            </Box>
                        ))}
                    </Slider>
                </Box>
                {/* Left slider */}
                <Box sx={{ height: 420, width: '70%', position: 'relative' }}>
                    <Slider ref={sliderRefLeft} {...settingsNormal}>
                        {images2.map((src, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    position: 'relative',
                                    borderRadius: 3,
                                    height: 140,
                                    mb: 2,
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            >
                                <Box
                                    component="img"
                                    src={src}
                                    alt={`slide-left-${idx}`}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: 3,
                                    }}
                                />
                                <Box
                                    className="overlay"
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        bgcolor: 'rgba(0,0,0,0.25)',
                                        opacity: 0,
                                        transition: 'opacity 0.3s ease',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: '#fff',
                                        fontWeight: '600',
                                        fontSize: 14,
                                        pointerEvents: 'none',
                                        '&:hover': {
                                            opacity: 1,
                                        },
                                    }}
                                >
                                    Xem chi tiết
                                </Box>
                            </Box>
                        ))}
                    </Slider>
                </Box>


            </Box>
        </Box>
    );
};

export default SectionFurniture;
