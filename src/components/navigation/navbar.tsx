
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FireEmber } from '@/components/ui/fire-ember';
import { PixelButton } from '@/components/ui/pixel-button';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { clearUserData } from '@/lib/storage';
import { toast } from '@/components/ui/use-toast';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const showBackButton = location.pathname !== '/map';
  
  const handleLogout = () => {
    clearUserData();
    toast({
      title: "Logout successful",
      description: "Your quest has been abandoned... for now.",
    });
    navigate('/');
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <nav className="w-full bg-stone-light border-b-4 border-stone-dark py-2 px-4 mb-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and back button section */}
        <div className="flex items-center gap-4">
          {showBackButton && (
            <button 
              onClick={handleBack}
              className="flex items-center text-xs hover:text-ember"
            >
              <ArrowLeft size={16} className="mr-1" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}
          
          <div className="font-pixel text-base sm:text-lg text-ember flex items-center">
            <span className="animate-fire-flicker">🦖</span>
            <span className="ml-2 hidden sm:inline">Quest For Campus Embers</span>
            <span className="ml-2 sm:hidden">QFCE</span>
          </div>
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-4">
          <FireEmber />
          <PixelButton 
            variant="destructive"
            size="sm"
            onClick={handleLogout}
          >
            Logout
          </PixelButton>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-14 left-0 right-0 bg-stone-light border-b-4 border-stone-dark z-50 py-4 px-6">
          <div className="flex flex-col gap-4">
            <FireEmber />
            <PixelButton
              variant="destructive" 
              onClick={handleLogout}
              className="w-full"
            >
              Logout
            </PixelButton>
          </div>
        </div>
      )}
    </nav>
  );
}
