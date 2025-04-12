
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/navigation/navbar';
import { PixelButton } from '@/components/ui/pixel-button';
import { MapLocation, AppRoute } from '@/types/game';
import { isUserLoggedIn, getUserData } from '@/lib/storage';
import { Utensils, Dumbbell, Trophy, MapPin } from 'lucide-react';

export default function Map() {
  const navigate = useNavigate();
  
  // Check if user is logged in
  useEffect(() => {
    if (!isUserLoggedIn()) {
      navigate('/');
    }
  }, [navigate]);
  
  const userData = getUserData();
  
  const mapLocations: MapLocation[] = [
    {
      name: 'Feeding Zones',
      route: '/feeding-zones',
      description: 'Visit dining halls to earn ember points',
      unlocked: true,
      icon: 'Utensils',
    },
    {
      name: 'Training Grounds',
      route: '/training-grounds',
      description: 'Build strength at campus gyms',
      unlocked: true,
      icon: 'Dumbbell',
    },
    {
      name: 'Lava Leaderboard',
      route: '/leaderboard',
      description: 'View tribe rankings',
      unlocked: userData?.emberPoints ? userData.emberPoints >= 20 : false,
      icon: 'Trophy',
    },
  ];
  
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils':
        return <Utensils className="h-6 w-6" />;
      case 'Dumbbell':
        return <Dumbbell className="h-6 w-6" />;
      case 'Trophy':
        return <Trophy className="h-6 w-6" />;
      default:
        return <MapPin className="h-6 w-6" />;
    }
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl mb-2">Ancient Lands Map</h1>
          <p className="text-sm text-stone">Explore the prehistoric campus!</p>
          
          {userData && (
            <div className="mt-4">
              <p>Welcome, <span className="text-ember font-bold">{userData.username}</span> the {userData.role}</p>
              {userData.streakDays > 1 && (
                <p className="text-xs mt-2">
                  🔥 Fire Streak: <span className="text-ember">{userData.streakDays} days</span>
                </p>
              )}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {mapLocations.map((location) => (
            <div
              key={location.name}
              className={`stone-panel text-center ${location.unlocked ? 'lava-glow' : 'opacity-60'}`}
            >
              <div className="flex justify-center mb-4 text-ember">
                {renderIcon(location.icon)}
              </div>
              
              <h2 className="text-xl mb-2">{location.name}</h2>
              <p className="text-sm mb-4 text-stone-dark">{location.description}</p>
              
              {location.unlocked ? (
                <PixelButton onClick={() => navigate(location.route as string)}>
                  Visit
                </PixelButton>
              ) : (
                <p className="text-xs text-stone">
                  (Requires 20+ ember points)
                </p>
              )}
            </div>
          ))}
        </div>
        
        {userData?.badges && userData.badges.length > 0 && (
          <div className="mt-12 max-w-md mx-auto stone-panel">
            <h2 className="text-xl mb-4 text-center">Stone Badges</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {userData.badges.map((badge) => (
                <div 
                  key={badge} 
                  className="bg-stone-dark text-white px-3 py-1 rounded-md text-xs"
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
