// Menu rendering constants
export const MENU_CONSTANTS = {
  FILTER_TEXT_WIDTH: 50,
  BUTTON_WIDTH: 80,
  GAP_WIDTH: 6,
  EXTRA_NUMBER_WIDTH: 30,
  TEXT_CHAR_WIDTH: 7,
  BADGE_PADDING: 20,
  INTERACTION_TIMEOUT: 1000,
  SCROLL_DELAY: 150,
} as const;

// Labels and text
export const MENU_LABELS = {
  sv: {
    filter: 'Filter:',
    all: 'Alla',
    change: 'Ändra',
    clearFilter: 'Rensa filter',
    close: 'Stäng filter',
    categories: 'kategorier',
    extraIngredients: 'Extra ingredienser',
    otherOptions: 'Övriga alternativ',
    showing: 'Visar',
    of: 'av',
  },
  en: {
    filter: 'Filter:',
    all: 'All',
    change: 'Change',
    clearFilter: 'Clear filter',
    close: 'Close filters',
    categories: 'categories',
    extraIngredients: 'Extra ingredients',
    otherOptions: 'Other options',
    showing: 'Showing',
    of: 'of',
  }
} as const;

// Animation delays and timing
export const ANIMATION_CONSTANTS = {
  HOVER_SCALE: 1.05,
  TRANSITION_DURATION: 200,
  CHIP_BUTTON_FOCUS_RING: 'focus:outline-none focus:ring-2 focus:ring-primary/30 rounded-full',
} as const;