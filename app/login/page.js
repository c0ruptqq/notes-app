'use client'
import LoginForm from "@/components/auth/loginForm";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (<div className='w-full flex justify-center pt-3'><span>Loading...</span></div>)
  }

  return (
    <div className='w-full flex justify-center pt-3'>
      {user ?
      <div>Logged In</div> 
      :
      <LoginForm /> 
}
    </div>
  )
}