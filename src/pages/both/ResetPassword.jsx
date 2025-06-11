import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { resetPasswordAPI } from '../../services/UsersSevices';
import { toast } from 'react-toastify';
import ResetPasswordForm from '../../components/both/ResetPasswordForm'; // nhớ import đúng đường dẫn

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const handleResetPassword = async (newPassword) => {
    try {
      await resetPasswordAPI(token, newPassword);
      toast.success('Đặt lại mật khẩu thành công');
      // Có thể redirect về trang login nếu muốn
    } catch (error) {
      toast.error('Đặt lại mật khẩu thất bại');
    }
  };

  return <ResetPasswordForm onSubmit={handleResetPassword} />;
}
