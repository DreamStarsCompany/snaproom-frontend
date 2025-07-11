import React, { useEffect, useState } from 'react';
import {
    Box, TextField, Button, FormControl, InputLabel, Select,
    MenuItem, Typography, IconButton, Paper
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { getAllCategoriesAPI, getProductByIdAPI, updateFurnitureAPI } from '../../services/UsersSevices';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from '../../routes';

const FurnitureDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const mainColor = '#3F5139';

    const [parentDesignId, setParentDesignId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [active, setActive] = useState(false);
    const [categoriesStyle1, setCategoriesStyle1] = useState([]);
    const [categoriesStyle0, setCategoriesStyle0] = useState([]);
    const [selectedStyleId, setSelectedStyleId] = useState('');
    const [selectedCategoryIds, setSelectedCategoryIds] = useState(['']);
    const [primaryImage, setPrimaryImage] = useState(null);
    const [images, setImages] = useState([]);
    const [removePrimaryImage, setRemovePrimaryImage] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [style1, style0, fur] = await Promise.all([
                    getAllCategoriesAPI(true),
                    getAllCategoriesAPI(false),
                    getProductByIdAPI(id)
                ]);

                setCategoriesStyle1(style1);
                setCategoriesStyle0(style0);

                setName(fur.name || '');
                setPrice(fur.price || '');
                setDescription(fur.description || '');
                setActive(fur.active);
                setSelectedStyleId(fur.style?.id || '');
                setSelectedCategoryIds(fur.categories?.map(c => c.id) || ['']);
                if (fur.primaryImage?.imageSource) {
                    setPrimaryImage({ preview: fur.primaryImage.imageSource, file: null });
                }

            } catch (error) {
                console.error(error);
                alert('Lỗi khi tải dữ liệu thiết kế');
            }
        };

        fetchData();
    }, [id]);

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('Name', name);
            formData.append('Price', price);
            formData.append('Description', description);
            formData.append('ParentDesignId', parentDesignId || '');
            formData.append('Active', active);
            formData.append('StyleId', selectedStyleId);
            selectedCategoryIds.filter(Boolean).forEach(id => {
                formData.append('CategoryIds', id);
            });
            if (removePrimaryImage) {
                formData.append('RemovePrimaryImage', 'true');
            } else if (primaryImage?.file) {
                formData.append('PrimaryImage', primaryImage.file);
            }

            images.forEach(img => formData.append('Images', img));

            await updateFurnitureAPI(id, formData);
            alert('Cập nhật thành công!');
            navigate(routes.furList);
        } catch (err) {
            console.error(err);
            alert('Lỗi khi cập nhật thiết kế');
        }
    };

    const handleCategoryChange = (index, value) => {
        const updated = [...selectedCategoryIds];
        updated[index] = value;
        setSelectedCategoryIds(updated);
    };

    return (
        <Paper elevation={3} sx={{ borderRadius: 3, maxWidth: 1200, mx: 'auto' }}>
            <Box sx={{ bgcolor: mainColor, p: 2, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
                <Typography variant="h5" color="#fff" align="center" fontWeight={600}>
                    Cập nhật nội thất
                </Typography>
            </Box>

            <Box component="form" noValidate autoComplete="off" sx={{ p: 4 }}>
                <Box display="flex" gap={3} alignItems="center">
                    <TextField
                        fullWidth label="Tên bản nội thất" value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="outlined"
                    />
                    <TextField
                        fullWidth label="Giá" value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        variant="outlined"
                    />
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="active-label" shrink>Tình trạng</InputLabel>
                        <Select
                            labelId="active-label"
                            label="Tình trạng"
                            value={active ? '1' : '0'}
                            onChange={(e) => setActive(e.target.value === '1')}
                        >
                            <MenuItem value="1">Còn hàng</MenuItem>
                            <MenuItem value="0">Hết hàng</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <TextField
                    fullWidth label="Mô tả"
                    multiline rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    variant="outlined"
                    margin="normal"
                />

                <Box display="flex" gap={3} alignItems="center" mt={2}>
                    <TextField
                        fullWidth
                        label="Thuộc thiết kế"
                        value={parentDesignId}
                        onChange={(e) => setParentDesignId(e.target.value)}
                        margin="normal"
                        sx={{ display: 'none' }}
                    />
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="style-label" shrink>Phong cách</InputLabel>
                        <Select
                            labelId="style-label"
                            label="Phong cách"
                            value={selectedStyleId}
                            onChange={(e) => setSelectedStyleId(e.target.value)}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 48 * 5,
                                    },
                                },
                            }}
                        >
                            {categoriesStyle1.map(cat => (
                                <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </Box>

                <Box mt={2}>
                    {selectedCategoryIds.map((selectedId, index) => (
                        <Box key={index} display="flex" alignItems="center" gap={1} mb={1}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel shrink id={`category-label-${index}`} >Danh mục {index + 1}</InputLabel>
                                <Select
                                    labelId={`category-label-${index}`}
                                    label={`Danh mục ${index + 1}`}
                                    value={selectedId}
                                    onChange={(e) => handleCategoryChange(index, e.target.value)}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 48 * 5,
                                            },
                                        },
                                    }}
                                >
                                    {categoriesStyle0.map(cat => (
                                        <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {selectedCategoryIds.length > 1 && (
                                <IconButton sx={{ color: 'red' }} onClick={() => {
                                    const updated = [...selectedCategoryIds];
                                    updated.splice(index, 1);
                                    setSelectedCategoryIds(updated);
                                }}>
                                    <RemoveCircleIcon />
                                </IconButton>
                            )}
                        </Box>
                    ))}
                    <Box display="flex" alignItems="center" mt={1}>
                        <IconButton sx={{ color: mainColor }} onClick={() => setSelectedCategoryIds(prev => [...prev, ''])}>
                            <AddCircleIcon />
                        </IconButton>
                        <Typography>Thêm danh mục</Typography>
                    </Box>
                </Box>

                <Box mt={3}>
                    <Typography>Ảnh chính</Typography>

                    {/* Nếu có ảnh hiện tại */}
                    {primaryImage && (
                        <Box mt={1} position="relative" display="inline-block">
                            <img
                                src={primaryImage.preview}
                                alt="Primary Preview"
                                style={{ width: 250, borderRadius: 8 }}
                            />
                            <IconButton
                                size="small"
                                onClick={() => {
                                    setPrimaryImage(null);
                                    setRemovePrimaryImage(true);
                                }}
                                sx={{
                                    position: 'absolute',
                                    top: 4,
                                    right: 4,
                                    backgroundColor: 'rgba(255,255,255,0.7)',
                                    '&:hover': { backgroundColor: 'red', color: 'white' }
                                }}
                            >
                                ×
                            </IconButton>
                        </Box>
                    )}

                    {/* Nếu ảnh cũ bị xóa, mới cho chọn ảnh mới */}
                    {!primaryImage && (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setPrimaryImage({
                                        preview: URL.createObjectURL(file),
                                        file: file
                                    });
                                    setRemovePrimaryImage(false);
                                }
                            }}
                        />
                    )}
                </Box>


                <Box mt={3}>
                    <Typography>Ảnh phụ</Typography>
                    <input type="file" accept="image/*" multiple onChange={(e) => {
                        setImages(Array.from(e.target.files));
                    }} />
                    <Box mt={1} display="flex" flexWrap="wrap" gap={2}>
                        {images.map((img, idx) => (
                            <img
                                key={idx}
                                src={URL.createObjectURL(img)}
                                alt=""
                                style={{ width: 150, borderRadius: 8 }}
                            />
                        ))}
                    </Box>
                </Box>

                <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
                    <Button
                        variant="outlined"
                        sx={{ borderColor: mainColor, color: mainColor }}
                        onClick={() => navigate(routes.furList)}
                    >
                        Hủy
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ bgcolor: mainColor, color: '#fff', '&:hover': { bgcolor: '#2f3e2b' } }}
                        onClick={handleUpdate}
                    >
                        Lưu
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default FurnitureDetail;
