'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/app/context/AuthContext";
import { Menu } from "@headlessui/react";
import { MenuIcon, User, Calendar, LogOut } from 'lucide-react';

const Header = () => {
    const router = useRouter();
    const { user, logout, isAuthenticated } = useAuth();
    
    const handleKeyPress = (event, action) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            action();
        }
    };
    
    return (
        <header role="banner">
            <nav 
                className="bg-blue-700" 
                aria-label="Main navigation"
            >
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
                    <div 
                        className="text-white text-2xl font-semibold cursor-pointer"
                        role="heading"
                        aria-level="1"
                        onClick={() => router.push('/')}
                        onKeyDown={(e) => handleKeyPress(e, () => router.push('/'))}
                        tabIndex="0"
                    >
                        CarAndAll
                    </div>
                    
                    <div className="flex items-center gap-4">
                        {isAuthenticated && user ? (
                            <div className="flex items-center gap-4">
                                <span 
                                    className="text-white font-medium hidden sm:inline"
                                    aria-label={`Logged in as ${user.email}`}
                                >
                                    Welkom, {user.email}
                                </span>
                                
                                <Menu as="div" className="relative inline-block text-left">
                                    {({ open }) => (
                                        <>
                                            <Menu.Button 
                                                className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700"
                                                aria-label="Open user menu"
                                                aria-expanded={open}
                                            >
                                                <MenuIcon className="w-5 h-5" aria-hidden="true" />
                                            </Menu.Button>
                                            
                                            <Menu.Items 
                                                className="absolute right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                                                aria-label="User menu"
                                            >
                                                <div className="px-1 py-1">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                className={`${
                                                                    active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                                                } group flex rounded-md items-center w-full px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                                                onClick={() => router.push('/account')}
                                                                aria-label="Go to account settings"
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
                                                                } group flex rounded-md items-center w-full px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                                                onClick={() => router.push('/bookings')}
                                                                aria-label="View your bookings"
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
                                                                } group flex rounded-md items-center w-full px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                                                onClick={logout}
                                                                aria-label="Log out of your account"
                                                            >
                                                                <LogOut className="w-5 h-5 mr-2" aria-hidden="true" />
                                                                Uitloggen
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                </div>
                                            </Menu.Items>
                                        </>
                                    )}
                                </Menu>
                            </div>
                        ) : (
                            <div 
                                className="flex gap-4"
                                role="group"
                                aria-label="Authentication options"
                            >
                                <button
                                    className="px-4 py-2 bg-white text-blue-700 border border-blue-700 rounded hover:bg-blue-700 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    onClick={() => router.push('/login')}
                                    aria-label="Log in to your account"
                                >
                                    Inloggen
                                </button>
                                <button
                                    className="px-4 py-2 bg-white text-blue-700 border border-blue-700 rounded hover:bg-blue-700 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    onClick={() => router.push('/register')}
                                    aria-label="Create a new account"
                                >
                                    Registreren
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;