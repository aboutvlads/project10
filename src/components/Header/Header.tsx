import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}
      `}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img
              src="https://cdn.prod.website-files.com/675c4bb1a6111f64bc92535b/675c4ff2a1636ad4ee500785_Untitled%20design%20(1).svg"
              alt="Tripwingz"
              className="h-12 sm:h-16 w-auto"
            />
          </a>

          {/* Auth Buttons */}
          <div className="hidden md:block">
            {user ? (
              <Button 
                variant="outline" 
                onClick={handleLogout}
              >
                Log out
              </Button>
            ) : (
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
              >
                Log in
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-[#1B1B1B]" />
            ) : (
              <Menu className="h-6 w-6 text-[#1B1B1B]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            {user ? (
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="w-full"
              >
                Log out
              </Button>
            ) : (
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="w-full"
              >
                Log in
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}