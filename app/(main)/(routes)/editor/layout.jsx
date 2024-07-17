'use client'
import { redirect } from "next/navigation";
import { useConvexAuth } from "convex/react";
import { Navigation } from "../../_componenets/navigation"

export default function EditorLayout({ children }) {
    const {isAuthenticated, isLoading} = useConvexAuth()
if (!isAuthenticated) {
    return (
        <div>
            Spinner [TO REPLACE]
        </div>
    )
}
    return (
    <div className="h-screen flex">
        <Navigation />
        <main className="flex-1 h-full overflow-y-auto">
        {children}
        </main>
        
    </div>
  );
}

