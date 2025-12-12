import { Meal, UserProfile, Badge } from './types';

const STORAGE_KEYS = {
  MEALS: 'kimacal_meals',
  PROFILE: 'kimacal_profile',
  BADGES: 'kimacal_badges'
};

// Meals
export function saveMeal(meal: Meal): void {
  const meals = getMeals();
  meals.unshift(meal);
  localStorage.setItem(STORAGE_KEYS.MEALS, JSON.stringify(meals));
}

export function getMeals(): Meal[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.MEALS);
  if (!data) return [];
  return JSON.parse(data).map((m: any) => ({
    ...m,
    timestamp: new Date(m.timestamp)
  }));
}

export function deleteMeal(id: string): void {
  const meals = getMeals().filter(m => m.id !== id);
  localStorage.setItem(STORAGE_KEYS.MEALS, JSON.stringify(meals));
}

// Profile
export function saveProfile(profile: UserProfile): void {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
}

export function getProfile(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
  return data ? JSON.parse(data) : null;
}

// Badges
export function getBadges(): Badge[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.BADGES);
  if (!data) {
    // Inicializar badges padrão
    const defaultBadges: Badge[] = [
      {
        id: '1',
        name: 'Primeira Refeição',
        description: 'Registre sua primeira refeição',
        icon: '🎯',
        unlocked: false
      },
      {
        id: '2',
        name: 'Sequência de 3 dias',
        description: 'Registre refeições por 3 dias seguidos',
        icon: '🔥',
        unlocked: false
      },
      {
        id: '3',
        name: 'Meta Atingida',
        description: 'Atinja sua meta de calorias diárias',
        icon: '⭐',
        unlocked: false
      },
      {
        id: '4',
        name: 'Semana Completa',
        description: 'Registre refeições por 7 dias seguidos',
        icon: '👑',
        unlocked: false
      },
      {
        id: '5',
        name: '50 Refeições',
        description: 'Registre 50 refeições no total',
        icon: '💎',
        unlocked: false
      }
    ];
    localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(defaultBadges));
    return defaultBadges;
  }
  return JSON.parse(data).map((b: any) => ({
    ...b,
    unlockedAt: b.unlockedAt ? new Date(b.unlockedAt) : undefined
  }));
}

export function unlockBadge(badgeId: string): void {
  const badges = getBadges();
  const badge = badges.find(b => b.id === badgeId);
  if (badge && !badge.unlocked) {
    badge.unlocked = true;
    badge.unlockedAt = new Date();
    localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(badges));
  }
}

// Stats
export function getTodayStats() {
  const meals = getMeals();
  const today = new Date().toDateString();
  const todayMeals = meals.filter(m => new Date(m.timestamp).toDateString() === today);
  
  return {
    totalCalories: todayMeals.reduce((sum, m) => sum + m.calories, 0),
    totalProtein: todayMeals.reduce((sum, m) => sum + m.protein, 0),
    totalCarbs: todayMeals.reduce((sum, m) => sum + m.carbs, 0),
    totalFat: todayMeals.reduce((sum, m) => sum + m.fat, 0),
    mealsCount: todayMeals.length
  };
}

export function getWeeklyStats() {
  const meals = getMeals();
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const weekMeals = meals.filter(m => new Date(m.timestamp) >= weekAgo);
  
  const dailyStats: { [key: string]: any } = {};
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = date.toLocaleDateString('pt-BR', { weekday: 'short' });
    dailyStats[dateStr] = { calories: 0, date: dateStr };
  }
  
  weekMeals.forEach(meal => {
    const dateStr = new Date(meal.timestamp).toLocaleDateString('pt-BR', { weekday: 'short' });
    if (dailyStats[dateStr]) {
      dailyStats[dateStr].calories += meal.calories;
    }
  });
  
  return Object.values(dailyStats).reverse();
}
