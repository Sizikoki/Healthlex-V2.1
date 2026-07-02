import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getUser, logout, isLoggedIn } from '@/utils/storage';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/config';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const loggedIn = isLoggedIn();
  const user = getUser();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
    logout();
    window.location.href = '/login';
  };


  const navLinks = [
    { path: '/', label: 'Ana Sayfa' },
    { path: '/study', label: 'Kelime Kartları' },
    { path: '/games', label: 'Oyunlar' },
    { path: '/progress', label: 'İlerleme' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-medical-light/95 backdrop-blur-md border-b border-gray-200" data-purpose="main-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-medical-dark p-2 rounded-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
            <span className="text-2xl font-bold text-medical-dark tracking-tight">HealthLexMed</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-white rounded-full text-medical-dark shadow-sm'
                    : 'text-gray-600 hover:text-medical-dark hover:bg-white/50 rounded-full'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Menu / Auth Actions */}
          <div className="hidden md:flex items-center gap-4">
            {loggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-200">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-50">
                      <User className="w-4 h-4 mr-2 text-gray-500" />
                      Profilim
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-100" />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer px-4 py-2 hover:bg-red-50">
                    <LogOut className="w-4 h-4 mr-2" />
                    Çıkış Yap
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors bg-white">
                  Giriş Yap
                </Link>
                <Link to="/register" className="px-6 py-2 bg-medical-accent text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                  Ücretsiz Başla
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-medical-dark hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-100">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-medical-dark text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              {loggedIn ? (
                <>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start">
                      <User className="w-4 h-4 mr-2" />
                      {user?.name}
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Çıkış Yap
                  </Button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2 px-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2 border border-gray-300 rounded-lg font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Giriş Yap
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2 bg-medical-accent text-white rounded-lg font-medium hover:opacity-90">
                    Ücretsiz Başla
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};