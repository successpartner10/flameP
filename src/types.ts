export type AppMode = 'lunch' | 'night';

export type NavTab = 'home' | 'menu' | 'stories' | 'reserve' | 'bag';

export interface MenuItem {
  id: string;
  name: string;
  category: 'lunch' | 'small-plates' | 'pasta-mains' | 'night' | 'cocktails' | 'desserts';
  categoryLabel: string;
  description: string;
  price: number;
  image: string;
  tags?: ('Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Chef Special' | 'Organic' | 'Popular' | 'Signature' | 'Quick Lunch')[];
  pairing?: string;
  calories?: string;
  availableInMode?: 'both' | 'lunch' | 'night';
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface ReservationDetails {
  date: string;
  time: string;
  guests: number;
  seatingArea: 'sunlit-corner' | 'main-hall' | 'chefs-counter' | 'cabaret-lounge';
  name: string;
  email: string;
  phone: string;
  occasion?: string;
  dietaryNotes?: string;
}

export interface StorySlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  category: string;
  tagline: string;
  actionText?: string;
  dishId?: string;
}
