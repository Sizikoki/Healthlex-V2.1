import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getUser, logout, isLoggedIn, getStats } from '@/utils/storage';
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
  const stats = loggedIn ? getStats() : null;

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

  const navLinks = loggedIn
    ? [
        { path: '/', label: 'Panelim' },
        { path: '/study', label: 'Kelime Kartları' },
        { path: '/games', label: 'Oyunlar' },
        { path: '/progress', label: 'İlerleme' },
      ]
    : [
        { path: '/', label: 'Ana Sayfa' },
        { path: '/study', label: 'Kelime Kartları' },
        { path: '/games', label: 'Oyunlar' },
        { path: '/progress', label: 'İlerleme' },
      ];

  return (
    <nav className="sticky top-0 z-50 bg-[#F1F4EF]/94 backdrop-blur-md border-b border-[#D6DED4]" data-purpose="main-header">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-[#0E6B5C] p-2 rounded-md">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12h4l2 7 4-14 2 7h6" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#131C18]">
              Health<span className="text-[#0E6B5C] font-semibold font-serif italic">Lex</span>Med
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-[0.92rem] font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-white border border-[#D6DED4] text-[#131C18] shadow-sm rounded-lg'
                    : 'text-[#5C6B63] hover:text-[#131C18] hover:bg-[#E8ECE4] rounded-lg'
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
                  <div className="flex items-center gap-[14px] cursor-pointer select-none">
                    <div className="streak-badge flex items-center gap-[6px] bg-[#FBEFE1] border border-[#EAD8B8] px-[12px] py-[7px] rounded-[20px] font-semibold text-[0.85rem] text-[#B8862E]">
                      🔥 {stats?.currentStreak || 0} gün
                    </div>
                    <div className="avatar w-[36px] h-[36px] rounded-full bg-[#0A3F37] text-white flex items-center justify-center font-semibold text-[0.95rem]">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  </div>
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