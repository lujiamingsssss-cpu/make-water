export type AppMode = 'menu' | 'water' | 'potion';

export type Ingredient = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  hexColor: string;
};

export type BrewResult = {
  name: string;
  description: string;
  color: string;
  animation: 'explode' | 'sparkle' | 'poison' | 'void' | 'weird';
};
