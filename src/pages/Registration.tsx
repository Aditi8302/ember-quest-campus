
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Role } from '@/types/game';
import { RoleCard } from '@/components/role-card';
import { PixelButton } from '@/components/ui/pixel-button';
import { initializeUser } from '@/lib/storage';
import { toast } from '@/components/ui/use-toast';

export default function Registration() {
  const [username, setUsername] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !selectedRole) {
      toast({
        title: "Invalid form",
        description: "Please provide a username and select a role.",
        variant: "destructive",
      });
      return;
    }
    
    // Initialize user data
    initializeUser(username, selectedRole);
    
    toast({
      title: "Registration complete!",
        description: `Welcome, ${username} the ${selectedRole}!`,
    });
    
    // Redirect to map
    navigate('/map');
  };
  
  const isFormValid = username.length >= 3 && username.length <= 20 && selectedRole !== null;
  
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-10">
          <div className="text-4xl md:text-6xl mb-4 flex justify-center">
            <span className="animate-float">🦖</span>
            <span className="animate-float" style={{ animationDelay: '1s' }}>🔥</span>
          </div>
          <h1 className="text-2xl md:text-4xl mb-4 text-stone-dark">Quest For Campus Embers</h1>
          <p className="text-sm md:text-base text-stone">Begin thy prehistoric adventure!</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="stone-panel">
            <label htmlFor="username" className="block text-sm font-medium mb-2">
              Choose thy Tribal Name (3-20 characters)
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-stone-light border-2 border-stone-dark font-pixel focus:outline-none focus:ring-2 focus:ring-ember"
              maxLength={20}
              minLength={3}
            />
          </div>
          
          <div>
            <h2 className="text-center text-xl mb-4">Select thy Tribal Role</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(['Hunter', 'Tracker', 'Gatherer'] as Role[]).map((role) => (
                <RoleCard
                  key={role}
                  role={role}
                  selected={selectedRole === role}
                  onClick={() => setSelectedRole(role)}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-center">
            <PixelButton 
              type="submit" 
              disabled={!isFormValid}
              size="lg"
              className="w-full max-w-xs"
            >
              Begin Thy Quest!
            </PixelButton>
          </div>
        </form>
      </div>
    </div>
  );
}
