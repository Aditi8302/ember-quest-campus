
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isUserLoggedIn } from '@/lib/storage';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is logged in, go to map, otherwise go to registration
    if (isUserLoggedIn()) {
      navigate('/map');
    } else {
      navigate('/registration');
    }
  }, [navigate]);
  
  // Loading screen while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <div className="text-center">
        <div className="text-4xl mb-4 animate-fire-flicker">🔥</div>
        <h1 className="text-2xl font-pixel mb-4">Loading thy quest...</h1>
      </div>
    </div>
  );
};

export default Index;
