
import { cn } from '@/lib/utils';
import { Role } from '@/types/game';

interface RoleCardProps {
  role: Role;
  selected: boolean;
  onClick: () => void;
}

export function RoleCard({ role, selected, onClick }: RoleCardProps) {
  const icons: Record<Role, string> = {
    'Hunter': '🪓',
    'Tracker': '🐾',
    'Gatherer': '🌿',
  };
  
  const descriptions: Record<Role, string> = {
    'Hunter': 'Strong and brave, Hunters excel at challenges requiring physical prowess.',
    'Tracker': 'Keen and observant, Trackers find hidden paths and rare rewards.',
    'Gatherer': 'Resourceful and patient, Gatherers collect more rewards over time.',
  };
  
  return (
    <div 
      className={cn(
        'stone-panel cursor-pointer transition-all hover:scale-105',
        'flex flex-col items-center p-6 min-h-[280px]',
        selected ? 'ring-4 ring-ember animate-lava-pulse' : ''
      )}
      onClick={onClick}
    >
      <div className="text-4xl mb-4 animate-float">
        {icons[role]}
      </div>
      
      <h3 className="text-xl mb-4 text-center">
        {role}
      </h3>
      
      <p className="text-sm text-center text-stone-dark">
        {descriptions[role]}
      </p>
      
      {selected && (
        <div className="mt-4 text-xs text-ember font-bold">
          Selected
        </div>
      )}
    </div>
  );
}
