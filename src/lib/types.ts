export interface Meal {
  id: string;
  imageUrl: string;
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  description: string;
  timestamp: Date;
}

export interface UserProfile {
  name: string;
  age: number;
  weight: number;
  height: number;
  dailyCalorieGoal: number;
  avatar?: string;
}

export interface DailyStats {
  date: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  mealsCount: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}
