
// User Roles
export type Role = 'Hunter' | 'Tracker' | 'Gatherer';

// Zone types
export type FeedingZone = 'Mosspit' | 'Riverfang' | 'Stonegrill';
export type TrainingZone = 'Clawstone Crater' | 'Bone Spear Range';
export type Zone = FeedingZone | TrainingZone;

// Badge types
export type Badge = 'Mighty Hunter' | 'Hungry Hunter' | 'Fire Keeper' | 'Trail Blazer';

// Visit data structure
export interface Visit {
  date: string; // ISO date
  rewarded: boolean;
  image?: string; // Base64 encoded
}

// User data structure for localStorage
export interface UserData {
  username: string;
  role: Role;
  emberPoints: number;
  streakDays: number;
  lastVisit: string; // ISO date 
  badges: Badge[];
  visits: Record<Zone, Visit | undefined>;
  frozenEmberRelicEarned: boolean;
}

// Navigation routes
export type AppRoute = '/' | '/map' | '/feeding-zones' | '/training-grounds' | '/leaderboard';

// Map locations
export interface MapLocation {
  name: string;
  route: AppRoute;
  description: string;
  unlocked: boolean;
  icon: string;
}
