'use client'
import { redirect } from "next/navigation";
import { useConvexAuth } from "convex/react";

export default function VaultLayout({ children }) {
    const {isAuthenticated, isLoading} = useConvexAuth()
if (!isAuthenticated) {
    return redirect('/');
}
    return (
    <div>
        {children}
    </div>
  );
}

