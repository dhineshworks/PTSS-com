import { AssetKey } from '@/assets';

export type ItemCategory = 'hat' | 'accessory';

export interface WardrobeItem {
  id: string;
  name: string;
  category: ItemCategory;
  price: number;
  requiredLevel: number;
  assetKey: AssetKey;
  description: string;
}

export const WARDROBE_ITEMS: WardrobeItem[] = [
  // Hats
  {
    id: 'hat-straw',
    name: 'Sunny Straw Hat',
    category: 'hat',
    price: 5,
    requiredLevel: 1,
    assetKey: 'items/hat-straw',
    description: 'Keeps the bright jungle sun away with a pretty green ribbon.',
  },
  {
    id: 'hat-party',
    name: 'Party Cone',
    category: 'hat',
    price: 10,
    requiredLevel: 1,
    assetKey: 'items/hat-party',
    description: 'Every day is a celebration in the jungle!',
  },
  {
    id: 'hat-explorer',
    name: 'Safari Helmet',
    category: 'hat',
    price: 25,
    requiredLevel: 2,
    assetKey: 'items/hat-explorer',
    description: 'Ready for deep jungle adventures and ancient discoveries.',
  },
  {
    id: 'flower-crown',
    name: 'Flower Wreath',
    category: 'hat',
    price: 25,
    requiredLevel: 2,
    assetKey: 'items/flower-crown',
    description: 'Woven with sweet blooming jungle blossoms and fresh leaves.',
  },
  {
    id: 'wizard-hat',
    name: 'Star Wizard Hat',
    category: 'hat',
    price: 50,
    requiredLevel: 3,
    assetKey: 'items/wizard-hat',
    description: 'Imbued with sparkling math magic and glowing stars.',
  },
  {
    id: 'hat-crown',
    name: 'Royal Golden Crown',
    category: 'hat',
    price: 100,
    requiredLevel: 5,
    assetKey: 'items/hat-crown',
    description: 'Fit for the true ruler of the Sunny Jungle Island!',
  },

  // Accessories
  {
    id: 'bowtie',
    name: 'Snazzy Bowtie',
    category: 'accessory',
    price: 5,
    requiredLevel: 1,
    assetKey: 'items/bowtie',
    description: 'Looks extra polite and dapper for Professor Owl’s class.',
  },
  {
    id: 'sunglasses',
    name: 'Cool Sunglasses',
    category: 'accessory',
    price: 10,
    requiredLevel: 1,
    assetKey: 'items/sunglasses',
    description: 'Super cool shades for the brightest sunny days.',
  },
  {
    id: 'scarf',
    name: 'Jungle Scarf',
    category: 'accessory',
    price: 25,
    requiredLevel: 2,
    assetKey: 'items/scarf',
    description: 'Warm and striped like tropical sunshine.',
  },
  {
    id: 'headphones',
    name: 'Beat Headphones',
    category: 'accessory',
    price: 50,
    requiredLevel: 3,
    assetKey: 'items/headphones',
    description: 'Vibing to cheerful jungle rhythms while solving math puzzles!',
  },
  {
    id: 'cape',
    name: 'Hero Cape',
    category: 'accessory',
    price: 50,
    requiredLevel: 4,
    assetKey: 'items/cape',
    description: 'Swishes majestically in the wind as you solve math problems.',
  },
  {
    id: 'medal',
    name: 'Star Champion Medal',
    category: 'accessory',
    price: 100,
    requiredLevel: 6,
    assetKey: 'items/medal',
    description: 'Awarded to supreme math adventurers of Numling Jungle!',
  },
];
