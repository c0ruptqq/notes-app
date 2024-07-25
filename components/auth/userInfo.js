'use client';

import { useAuth } from "@/app/context/AuthContext";


export default function UserInfo() {
    const { user, loading } = useAuth();

    if (loading) {
      return <span>Loading...</span>;
    }
  
    return user ? <span>Welcome, {user}!</span> : <span>Not logged in</span>;
  }