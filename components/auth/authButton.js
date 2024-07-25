'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { useAuth } from '@/app/context/AuthContext';


export default function AuthButton() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    logout();
    router.push('/login');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  if (user) {
    return <Button onClick={handleLogout}>Logout</Button>;
  } else {
    return <Button onClick={handleLogin}>Login</Button>;
  }
}