import React from "react";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="flex h-screen w-full">
            <div className="lg:w-1/2 size-full flex-center">
                {children}
            </div>
            <div className="auth-layout">Welcome to Bright</div>
        </main>
    )
}