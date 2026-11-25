// src/assets/index.ts
// Single source of truth for all game assets with robust inline SVG/emoji fallbacks

export const ASSETS = {
  // Mascot
  'mascot-owl': '/assets/mascot-owl.png',

  // Pets
  'pet-mango': '/assets/pet-mango.png',
  'pet-leafy': '/assets/pet-leafy.png',
  'pet-bloop': '/assets/pet-bloop.png',
  'pet-sunny': '/assets/pet-sunny.png',
  'pet-zippy': '/assets/pet-zippy.png',
  'pet-woolzy': '/assets/pet-woolzy.png',
  'monster-helper': '/assets/monster-helper.png',

  // Eggs
  'egg-0': '/assets/egg-0.png',
  'egg-1': '/assets/egg-1.png',
  'egg-2': '/assets/egg-2.png',
  'egg-3': '/assets/egg-3.png',

  // Base & Currency
  'nest-base': '/assets/nest-base.png',
  'coin': '/assets/coin.png',

  // Backgrounds
  'bg-welcome': '/assets/bg-welcome.png',
  'bg-map': '/assets/bg-map.png',
  'bg-nest-room': '/assets/bg-nest-room.png',
  'bg-wardrobe': '/assets/bg-wardrobe.png',
  'bg-customize-barn': '/assets/bg-customize-barn.png',

  // Map Nodes
  'node-locked': '/assets/node-locked.png',
  'node-open': '/assets/node-open.png',
  'node-done': '/assets/node-done.png',

  // Wardrobe Items
  'items/hat-straw': '/assets/items/hat-straw.png',
  'items/hat-party': '/assets/items/hat-party.png',
  'items/hat-explorer': '/assets/items/hat-explorer.png',
  'items/hat-crown': '/assets/items/hat-crown.png',
  'items/flower-crown': '/assets/items/flower-crown.png',
  'items/sunglasses': '/assets/items/sunglasses.png',
  'items/bowtie': '/assets/items/bowtie.png',
  'items/scarf': '/assets/items/scarf.png',
  'items/cape': '/assets/items/cape.png',
  'items/headphones': '/assets/items/headphones.png',
  'items/medal': '/assets/items/medal.png',
  'items/wizard-hat': '/assets/items/wizard-hat.png',
} as const;

export type AssetKey = keyof typeof ASSETS;

// High-fidelity SVG fallbacks encoded as data URIs
function createSvgDataUri(svgContent: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
}

export const ASSET_FALLBACKS: Record<AssetKey, string> = {
  'mascot-owl': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle cx="100" cy="110" r="75" fill="#E28743"/>
      <circle cx="70" cy="95" r="28" fill="#FFF8E7"/>
      <circle cx="130" cy="95" r="28" fill="#FFF8E7"/>
      <circle cx="70" cy="95" r="14" fill="#0F4C5C"/>
      <circle cx="130" cy="95" r="14" fill="#0F4C5C"/>
      <polygon points="100,105 88,125 112,125" fill="#FFD23F"/>
      <polygon points="50,45 100,20 150,45 100,70" fill="#7B4DFF"/>
      <rect x="90" y="45" width="20" height="25" fill="#FFD23F"/>
    </svg>
  `),
  'pet-mango': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="70" fill="#FF7B54"/>
      <circle cx="50" cy="70" r="25" fill="#FF9E80"/>
      <circle cx="150" cy="70" r="25" fill="#FF9E80"/>
      <circle cx="75" cy="90" r="18" fill="#FFF8E7"/>
      <circle cx="125" cy="90" r="18" fill="#FFF8E7"/>
      <circle cx="75" cy="90" r="9" fill="#0F4C5C"/>
      <circle cx="125" cy="90" r="9" fill="#0F4C5C"/>
      <ellipse cx="100" cy="120" rx="30" ry="18" fill="#FFD23F"/>
    </svg>
  `),
  'pet-leafy': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="70" fill="#3DDC84"/>
      <circle cx="75" cy="85" r="22" fill="#FFF8E7"/>
      <circle cx="125" cy="85" r="22" fill="#FFF8E7"/>
      <circle cx="78" cy="85" r="10" fill="#0F4C5C"/>
      <circle cx="122" cy="85" r="10" fill="#0F4C5C"/>
      <path d="M 70 125 Q 100 150 130 125" stroke="#0F4C5C" stroke-width="8" fill="none" stroke-linecap="round"/>
    </svg>
  `),
  'pet-bloop': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle cx="100" cy="115" r="65" fill="#4EA8DE"/>
      <circle cx="65" cy="65" r="30" fill="#4EA8DE"/>
      <circle cx="135" cy="65" r="30" fill="#4EA8DE"/>
      <circle cx="65" cy="65" r="16" fill="#FFF8E7"/>
      <circle cx="135" cy="65" r="16" fill="#FFF8E7"/>
      <circle cx="65" cy="65" r="8" fill="#0F4C5C"/>
      <circle cx="135" cy="65" r="8" fill="#0F4C5C"/>
      <ellipse cx="100" cy="130" rx="35" ry="15" fill="#FF7B54"/>
    </svg>
  `),
  'pet-sunny': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="85" fill="#FF7B54"/>
      <circle cx="100" cy="100" r="60" fill="#FFD23F"/>
      <circle cx="75" cy="90" r="16" fill="#FFF8E7"/>
      <circle cx="125" cy="90" r="16" fill="#FFF8E7"/>
      <circle cx="75" cy="90" r="8" fill="#0F4C5C"/>
      <circle cx="125" cy="90" r="8" fill="#0F4C5C"/>
      <polygon points="100,105 92,118 108,118" fill="#FF7B54"/>
    </svg>
  `),
  'pet-zippy': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle cx="100" cy="105" r="65" fill="#7B4DFF"/>
      <polygon points="55,55 45,25 75,45" fill="#FFD23F"/>
      <polygon points="145,55 155,25 125,45" fill="#FFD23F"/>
      <circle cx="75" cy="95" r="16" fill="#FFF8E7"/>
      <circle cx="125" cy="95" r="16" fill="#FFF8E7"/>
      <circle cx="75" cy="95" r="8" fill="#0F4C5C"/>
      <circle cx="125" cy="95" r="8" fill="#0F4C5C"/>
    </svg>
  `),
  'pet-woolzy': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle cx="100" cy="110" r="65" fill="#009BF5"/>
      <ellipse cx="60" cy="100" rx="35" ry="30" fill="#008BE0"/>
      <ellipse cx="140" cy="100" rx="35" ry="30" fill="#008BE0"/>
      <circle cx="80" cy="95" r="14" fill="#FFF"/>
      <circle cx="120" cy="95" r="14" fill="#FFF"/>
      <circle cx="80" cy="95" r="7" fill="#00D2F5"/>
      <circle cx="120" cy="95" r="7" fill="#00D2F5"/>
      <rect x="92" y="110" width="16" height="35" rx="8" fill="#0080D0"/>
      <path d="M 65 135 Q 75 120 90 135" stroke="#00F5FF" stroke-width="6" fill="none"/>
      <path d="M 135 135 Q 125 120 110 135" stroke="#00F5FF" stroke-width="6" fill="none"/>
    </svg>
  `),
  'monster-helper': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <rect x="30" y="30" width="140" height="150" rx="40" fill="#7B4DFF"/>
      <circle cx="75" cy="85" r="20" fill="#FFF"/>
      <circle cx="125" cy="85" r="20" fill="#FFF"/>
      <circle cx="70" cy="85" r="9" fill="#0F4C5C"/>
      <circle cx="120" cy="85" r="9" fill="#0F4C5C"/>
      <path d="M 70 130 Q 100 155 130 130" stroke="#0F4C5C" stroke-width="8" fill="none"/>
    </svg>
  `),
  'egg-0': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <ellipse cx="100" cy="135" rx="75" ry="105" fill="#FFF8E7" stroke="#3DDC84" stroke-width="8"/>
      <circle cx="65" cy="110" r="18" fill="#3DDC84"/>
      <circle cx="135" cy="150" r="24" fill="#7B4DFF"/>
      <circle cx="95" cy="180" r="15" fill="#FFD23F"/>
    </svg>
  `),
  'egg-1': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <ellipse cx="100" cy="135" rx="75" ry="105" fill="#FFF8E7" stroke="#3DDC84" stroke-width="8"/>
      <circle cx="65" cy="110" r="18" fill="#3DDC84"/>
      <circle cx="135" cy="150" r="24" fill="#7B4DFF"/>
      <path d="M 85 90 L 105 120 L 95 140" stroke="#FFD23F" stroke-width="6" fill="none"/>
    </svg>
  `),
  'egg-2': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <ellipse cx="100" cy="135" rx="75" ry="105" fill="#FFF8E7" stroke="#FF7B54" stroke-width="8"/>
      <path d="M 70 70 L 100 110 L 80 140 L 120 170" stroke="#FFD23F" stroke-width="8" fill="none"/>
      <path d="M 110 90 L 135 125 L 115 155" stroke="#FFD23F" stroke-width="6" fill="none"/>
    </svg>
  `),
  'egg-3': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <ellipse cx="100" cy="175" rx="75" ry="55" fill="#FFF8E7" stroke="#7B4DFF" stroke-width="8"/>
      <circle cx="100" cy="90" r="45" fill="#FFD23F"/>
      <text x="100" y="105" font-size="40" text-anchor="middle">✨</text>
    </svg>
  `),
  'nest-base': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 100">
      <ellipse cx="120" cy="50" rx="110" ry="40" fill="#8B5A2B"/>
      <ellipse cx="120" cy="45" rx="95" ry="30" fill="#3DDC84"/>
      <circle cx="60" cy="45" r="12" fill="#FF7B54"/>
      <circle cx="180" cy="45" r="12" fill="#FFD23F"/>
    </svg>
  `),
  'coin': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="#FFD23F" stroke="#E5B800" stroke-width="6"/>
      <circle cx="50" cy="50" r="35" fill="#FFE27A"/>
      <text x="50" y="65" font-size="45" text-anchor="middle" fill="#0F4C5C">🌿</text>
    </svg>
  `),
  'bg-welcome': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600">
      <rect width="400" height="600" fill="#BDEBFF"/>
      <circle cx="200" cy="550" r="300" fill="#3DDC84"/>
      <circle cx="350" cy="80" r="60" fill="#FFD23F"/>
    </svg>
  `),
  'bg-map': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800">
      <rect width="400" height="800" fill="#BDEBFF"/>
      <path d="M 200 50 Q 80 250 220 450 T 200 750" stroke="#FFE27A" stroke-width="60" fill="none" stroke-linecap="round"/>
    </svg>
  `),
  'bg-nest-room': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600">
      <rect width="400" height="600" fill="#FFF8E7"/>
      <circle cx="200" cy="300" r="180" fill="#BDEBFF" opacity="0.3"/>
    </svg>
  `),
  'bg-wardrobe': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600">
      <rect width="400" height="600" fill="#8B5A2B"/>
      <rect x="20" y="20" width="360" height="560" rx="20" fill="#FFF8E7"/>
    </svg>
  `),
  'bg-customize-barn': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600">
      <rect width="400" height="600" fill="#5A2E1A"/>
      <rect x="30" y="100" width="340" height="460" rx="15" fill="#3D1C0F"/>
    </svg>
  `),
  'node-locked': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="#CBD5E0" stroke="#A0AEC0" stroke-width="6"/>
      <text x="50" y="65" font-size="40" text-anchor="middle">🔒</text>
    </svg>
  `),
  'node-open': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="#FFD23F" stroke="#E5B800" stroke-width="6"/>
      <text x="50" y="65" font-size="40" text-anchor="middle">✨</text>
    </svg>
  `),
  'node-done': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="#3DDC84" stroke="#2BA05D" stroke-width="6"/>
      <text x="50" y="65" font-size="45" text-anchor="middle" fill="#FFD23F">⭐</text>
    </svg>
  `),
  'items/hat-straw': createSvgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="70" font-size="60" text-anchor="middle">👒</text></svg>`),
  'items/hat-party': createSvgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="70" font-size="60" text-anchor="middle">🎉</text></svg>`),
  'items/hat-explorer': createSvgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="70" font-size="60" text-anchor="middle">🤠</text></svg>`),
  'items/hat-crown': createSvgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="70" font-size="60" text-anchor="middle">👑</text></svg>`),
  'items/flower-crown': createSvgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="70" font-size="60" text-anchor="middle">🌸</text></svg>`),
  'items/sunglasses': createSvgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="70" font-size="60" text-anchor="middle">🕶️</text></svg>`),
  'items/bowtie': createSvgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="70" font-size="60" text-anchor="middle">🎀</text></svg>`),
  'items/scarf': createSvgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="70" font-size="60" text-anchor="middle">🧣</text></svg>`),
  'items/cape': createSvgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="70" font-size="60" text-anchor="middle">🦸</text></svg>`),
  'items/headphones': createSvgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="70" font-size="60" text-anchor="middle">🎧</text></svg>`),
  'items/medal': createSvgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="70" font-size="60" text-anchor="middle">🏅</text></svg>`),
  'items/wizard-hat': createSvgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="70" font-size="60" text-anchor="middle">🧙</text></svg>`),
};

export function getAssetUrl(key: AssetKey): string {
  return ASSETS[key] || '';
}

export function getAssetFallback(key: AssetKey): string {
  return ASSET_FALLBACKS[key] || '';
}
