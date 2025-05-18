import React, { useState } from 'react';
import LoginForm from '../../components/both/LoginForm';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Gọi API login ở đây
      console.log('Sending to server:', form);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <LoginForm
      values={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
