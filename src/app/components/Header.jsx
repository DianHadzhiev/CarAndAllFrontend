'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";

const Header = () => {
    const router = useRouter();
    const {user, logout} = useAuth();
    
    return (
        <nav className="bg-blue-700">
            <div className="max-w-screen-xl mx-80 flex justify-between items-center px-4 py-2">
                <h1 className="text-white text-2xl font-semibold cursor-pointer mb-4 mr-4 mt-4" onClick={() => router.push('/')}>CarAndAll</h1>
                <div className="flex gap-4 pr-4">
                    {user?(
                        <div className="flex items-center gap-4">
                            <span className="text-white font-medium">Welkom, {user.email}</span>
                                <button className="px-4 py2 bg-white text-blue-700 border-blue-700 rounded hover:bg-blue-700:text-white transition" onClick={logout}>
                                    Uitloggen
                                </button>
                        </div>
                    ): (
                        <>
                    <button
                        className="px-4 py-2 bg-white text-blue-700 border border-blue-700 rounded hover:bg-blue-700 hover:text-white transition"
                        onClick={() => router.push('/login')}
                    >
                        Inloggen
                    </button>
                    <button
                        className="px-4 py-2 bg-white text-blue-700 border border-blue-700 rounded hover:bg-blue-700 hover:text-white transition"
                        onClick={() => router.push('/register')}
                    >
                        Registreren
                    </button>
                    </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
