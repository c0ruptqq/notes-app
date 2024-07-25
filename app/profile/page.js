import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import LogoutButton from '@/components/auth/authButton';


export default function ProfilePage() {
  const cookieStore = cookies();
  const token = cookieStore.get('session_token');
  
  let username = 'Unknown';
  
  if (token) {
    try {
      const decoded = verify(token.value, process.env.SESSION_SECRET);
      username = decoded.username;
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  }

  return (
    <div className='w-full flex justify-center pt-3'>
      <h1>Profile Page</h1>
      <p>Welcome, {username}!</p>
      <LogoutButton />
    </div>
  );
}