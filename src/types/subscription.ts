export type PlanType = 'personal' | 'business' | 'enterprise';

export interface Plan {
  id: PlanType;
  name: string;
  price: number;
  features: string[];
  buttonText: string;
  recommended?: boolean;
}

export interface SubscriptionState {
  currentPlan: PlanType | null;
  isSubscribed: boolean;
}