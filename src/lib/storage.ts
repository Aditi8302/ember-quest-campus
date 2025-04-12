
import { UserData, Role, Zone, Badge, Visit } from '../types/game';

const USER_DATA_KEY = 'ember_quest_user_data';

// Initialize a new user
export const initializeUser = (username: string, role: Role): UserData => {
  const today = new Date().toISOString();
  
  const userData: UserData = {
    username,
    role,
    emberPoints: 0,
    streakDays: 0,
    lastVisit: today,
    badges: [],
    visits: {
      'Mosspit': undefined,
      'Riverfang': undefined,
      'Stonegrill': undefined,
      'Clawstone Crater': undefined,
      'Bone Spear Range': undefined
    },
    frozenEmberRelicEarned: false,
  };

  saveUserData(userData);
  return userData;
};

// Get user data from localStorage
export const getUserData = (): UserData | null => {
  const data = localStorage.getItem(USER_DATA_KEY);
  if (!data) return null;
  
  try {
    return JSON.parse(data) as UserData;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

// Save user data to localStorage
export const saveUserData = (userData: UserData): void => {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
};

// Log a visit to a zone
export const logVisit = (zone: Zone): { success: boolean; message: string; emberAwarded: number } => {
  const userData = getUserData();
  if (!userData) {
    return { success: false, message: "No user data found", emberAwarded: 0 };
  }
  
  const today = new Date().toDateString();
  const currentVisit = userData.visits[zone];
  
  // Check if user already visited this zone today
  if (currentVisit && new Date(currentVisit.date).toDateString() === today && currentVisit.rewarded) {
    return { 
      success: false, 
      message: `Thou hast already visited ${zone} today.`, 
      emberAwarded: 0 
    };
  }
  
  // Log the visit and award embers
  userData.visits[zone] = {
    date: new Date().toISOString(),
    rewarded: true,
  };
  
  userData.emberPoints += 10;
  
  // Update streak if visiting on consecutive days
  const lastVisitDate = new Date(userData.lastVisit);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (lastVisitDate.toDateString() === yesterday.toDateString() || 
      lastVisitDate.toDateString() === new Date().toDateString()) {
    userData.streakDays += 1;
  } else {
    userData.streakDays = 1; // Reset streak but count today
  }
  
  userData.lastVisit = new Date().toISOString();
  
  // Check for badge unlocks based on visits
  checkAndAwardBadges(userData);
  
  // Check for Frozen Ember Relic
  const totalVisits = Object.values(userData.visits).length;
  if (totalVisits >= 100 && !userData.frozenEmberRelicEarned) {
    userData.frozenEmberRelicEarned = true;
  }
  
  saveUserData(userData);
  
  return { 
    success: true, 
    message: `+10 Embers earned at ${zone}!`, 
    emberAwarded: 10 
  };
};

// Check for and award badges based on visits
const checkAndAwardBadges = (userData: UserData): void => {
  // Mighty Hunter badge - visited both training grounds
  const visitedTrainingGrounds = [
    userData.visits['Clawstone Crater'], 
    userData.visits['Bone Spear Range']
  ].filter(Boolean).length === 2;
  
  if (visitedTrainingGrounds && !userData.badges.includes('Mighty Hunter')) {
    userData.badges.push('Mighty Hunter');
  }
  
  // Hungry Hunter badge - visited all feeding zones
  const visitedFeedingZones = [
    userData.visits['Mosspit'], 
    userData.visits['Riverfang'],
    userData.visits['Stonegrill']
  ].filter(Boolean).length === 3;
  
  if (visitedFeedingZones && !userData.badges.includes('Hungry Hunter')) {
    userData.badges.push('Hungry Hunter');
  }
  
  // Fire Keeper badge - 7+ day streak
  if (userData.streakDays >= 7 && !userData.badges.includes('Fire Keeper')) {
    userData.badges.push('Fire Keeper');
  }
};

// Clear user data (logout)
export const clearUserData = (): void => {
  localStorage.removeItem(USER_DATA_KEY);
};

// Check if user is logged in
export const isUserLoggedIn = (): boolean => {
  return getUserData() !== null;
};
