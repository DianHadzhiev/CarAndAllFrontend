// components/Header.jsx
'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/app/context/AuthContext";
import { Menu } from "@headlessui/react";
import { MenuIcon, User, Calendar, LogOut } from 'lucide-react';

const Header = () => {
    const router = useRouter();
    const { user, logout, isAuthenticated } = useAuth();
    
    return (
        <nav className="bg-blue-700">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
                <h1 className="text-white text-2xl font-semibold cursor-pointer" onClick={() => router.push('/')}>CarAndAll</h1>
                <div className="flex items-center gap-4">
                    {isAuthenticated && user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-white font-medium hidden sm:inline">Welkom, {user.email}</span>
                            <Menu as="div" className="relative inline-block text-left">
                                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                    <MenuIcon className="w-5 h-5" aria-hidden="true" />
                                </Menu.Button>
                                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                    <div className="px-1 py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={`${
                                                        active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                    onClick={() => router.push('/account')}
                                                >
                                                    <User className="w-5 h-5 mr-2" aria-hidden="true" />
                                                    Account Settings
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={`${
                                                        active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                    onClick={() => router.push('/bookings')}
                                                >
                                                    <Calendar className="w-5 h-5 mr-2" aria-hidden="true" />
                                                    Bookings
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                    <div className="px-1 py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={`${
                                                        active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                    onClick={logout}
                                                >
                                                    <LogOut className="w-5 h-5 mr-2" aria-hidden="true" />
                                                    Uitloggen
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Menu>
                        </div>
                    ) : (
                        <div className="flex gap-4">
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
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;