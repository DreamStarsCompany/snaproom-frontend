import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    TextField,
    Typography,
    Paper,
    IconButton,
    InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { routes } from "../../routes";

export default function RegisterForm({ values, onChange, onSubmit }) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: '#354933',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'Segoe UI, sans-serif',
            }}
        >
            <Paper elevation={6} sx={{ width: 500, p: 4, borderRadius: 3 }}>
                <Typography variant="h5" align="center" fontWeight={600} gutterBottom>
                    Designer Registration
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary" gutterBottom>
                    Please send us your information
                </Typography>

                <Box component="form" onSubmit={onSubmit} mt={2}>
                    <TextField
                        label="Email address"
                        type="email"
                        fullWidth
                        margin="normal"
                        required
                        InputLabelProps={{ sx: { color: '#3F5139' } }}
                        sx={{
                            '& label.Mui-focused': { color: '#3F5139' },
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': { borderColor: '#3F5139' },
                            },
                        }}
                    />

                    <TextField
                        label="Full Name"
                        type="text"
                        fullWidth
                        margin="normal"
                        required
                        InputLabelProps={{ sx: { color: '#3F5139' } }}
                        sx={{
                            '& label.Mui-focused': { color: '#3F5139' },
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': { borderColor: '#3F5139' },
                            },
                        }}
                    />

                    <TextField
                        label="Phone Number"
                        type="number"
                        fullWidth
                        margin="normal"
                        required
                        InputLabelProps={{ sx: { color: '#3F5139' } }}
                        sx={{
                            '& label.Mui-focused': { color: '#3F5139' },
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': { borderColor: '#3F5139' },
                            },
                        }}
                    />

                    <TextField
                        label="Portfolio Link"
                        type="text"
                        fullWidth
                        margin="normal"
                        required
                        InputLabelProps={{ sx: { color: '#3F5139' } }}
                        sx={{
                            '& label.Mui-focused': { color: '#3F5139' },
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': { borderColor: '#3F5139' },
                            },
                        }}
                    />

                    <TextField
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        margin="normal"
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={togglePasswordVisibility} edge="end">
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        InputLabelProps={{ sx: { color: '#3F5139' } }}
                        sx={{
                            '& label.Mui-focused': { color: '#3F5139' },
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': { borderColor: '#3F5139' },
                            },
                        }}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                sx={{
                                    color: '#4e5c47',
                                    '&.Mui-checked': { color: '#3F5139' },
                                }}
                            />
                        }
                        label="I accept terms and conditions"
                        sx={{ mt: 1 }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 3,
                            bgcolor: '#4e5c47',
                            ':hover': { bgcolor: '#3d4a38' },
                        }}
                    >
                        Send
                    </Button>
                </Box>

                <Typography variant="body2" align="center" mt={3}>
                    Already have an account?{' '}
                    <Link
                        to={routes.login}
                        underline="hover"
                        sx={{ color: '#4e5c47', '&:hover': { color: '#3F5139' } }}
                    >
                        Login
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
}
