import { AssetKey } from '@/assets';

export type Rarity = 'common' | 'rare';

export interface PetDefinition {
  type: string;
  defaultName: string;
  rarity: Rarity;
  species: string;
  description: string;
  assetKey: AssetKey;
  weight: number;
}

export const PET_DEFINITIONS: Record<string, PetDefinition> = {
  mango: {
    type: 'mango',
    defaultName: 'Mango',
    rarity: 'common',
    species: 'Orange Baby Monkey',
    description: 'A cheerful monkey who loves swinging and eating sweet bananas!',
    assetKey: 'pet-mango',
    weight: 25,
  },
  leafy: {
    type: 'leafy',
    defaultName: 'Leafy',
    rarity: 'common',
    species: 'Green Chameleon',
    description: 'A clever chameleon with big bright eyes and a bouncy tail!',
    assetKey: 'pet-leafy',
    weight: 25,
  },
  bloop: {
    type: 'bloop',
    defaultName: 'Bloop',
    rarity: 'common',
    species: 'Blue Frog',
    description: 'A happy frog who loves splashing in jungle ponds!',
    assetKey: 'pet-bloop',
    weight: 25,
  },
  sunny: {
    type: 'sunny',
    defaultName: 'Sunny',
    rarity: 'rare',
    species: 'Yellow Lion Cub',
    description: 'A golden lion cub with a warm flower mane and a brave roar!',
    assetKey: 'pet-sunny',
    weight: 12.5,
  },
  zippy: {
    type: 'zippy',
    defaultName: 'Zippy',
    rarity: 'rare',
    species: 'Purple Baby Dragon',
    description: 'A magical dragon who glides through the treetops with star sparkles!',
    assetKey: 'pet-zippy',
    weight: 12.5,
  },
  woolzy: {
    type: 'woolzy',
    defaultName: 'Woolzy',
    rarity: 'rare',
    species: 'Blue Baby Elephant',
    description: 'An adorable magical elephant with glowing tusks and wings!',
    assetKey: 'pet-woolzy',
    weight: 12.5,
  },
};

export function getRandomHatchedPet(): PetDefinition {
  const list = Object.values(PET_DEFINITIONS);
  const totalWeight = list.reduce((sum, pet) => sum + pet.weight, 0);
  let random = Math.random() * totalWeight;

  for (const pet of list) {
    if (random < pet.weight) {
      return pet;
    }
    random -= pet.weight;
  }
  return list[0];
}
