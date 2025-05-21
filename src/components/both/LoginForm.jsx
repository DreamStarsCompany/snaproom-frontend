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

export default function LoginForm({ values, onChange, onSubmit }) {
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
      <div>hththth </div>
      <Paper elevation={6} sx={{ width: 350, p: 4, borderRadius: 3 }}>
        <Typography variant="h5" align="center" fontWeight={600} gutterBottom>
          Sign In SnapRoom
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" gutterBottom>
          Please enter your email and password to continue
        </Typography>

        <Box component="form" onSubmit={onSubmit} mt={2}>
          <TextField
            label="Email address"
            type="email"
            value={values.email}
            onChange={onChange('email')}
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
            value={values.password}
            onChange={onChange('password')}
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

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 1}}>
            <Link
              href="#"
              variant="body2"
              underline="hover"
              sx={{ color: '#4e5c47', '&:hover': { color: '#3F5139' } }}
            >
              Forgot Password?
            </Link>
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                checked={values.remember}
                onChange={onChange('remember')}
                sx={{
                  color: '#4e5c47',
                  '&.Mui-checked': { color: '#3F5139' },
                }}
              />
            }
            label="Remember Password"
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
            Sign In
          </Button>
        </Box>

        <Typography variant="body2" align="center" mt={3}>
          Don’t have an account?{' '}
          <Link 
            to={routes.register}
            underline="hover"
            sx={{ color: '#4e5c47', '&:hover': { color: '#3F5139' } }}
          >
            Create Account
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
