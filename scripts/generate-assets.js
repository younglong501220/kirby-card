import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve('public');
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Helper to create crisp, high-res colorful game illustration SVGs and convert to JPG
const assets = [
  {
    filename: 'normal-kp.jpg',
    width: 600,
    height: 600,
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
        <defs>
          <radialGradient id="skyGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fff5f8" />
            <stop offset="100%" stop-color="#ffd1dc" />
          </radialGradient>
          <radialGradient id="kirbyBody" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#ffb2cb" />
            <stop offset="60%" stop-color="#ff7399" />
            <stop offset="100%" stop-color="#e63e6f" />
          </radialGradient>
          <radialGradient id="kirbyFoot" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#ff3b69" />
            <stop offset="100%" stop-color="#b80033" />
          </radialGradient>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="16" stdDeviation="12" flood-color="#a82346" flood-opacity="0.3"/>
          </filter>
        </defs>
        <rect width="600" height="600" fill="url(#skyGlow)"/>
        
        <!-- Ground Shadow -->
        <ellipse cx="300" cy="510" rx="180" ry="32" fill="#d9758e" opacity="0.35"/>
        
        <!-- Left Foot -->
        <ellipse cx="205" cy="460" rx="75" ry="46" fill="url(#kirbyFoot)" transform="rotate(-15 205 460)" filter="url(#shadow)"/>
        <!-- Right Foot -->
        <ellipse cx="385" cy="465" rx="75" ry="46" fill="url(#kirbyFoot)" transform="rotate(18 385 465)" filter="url(#shadow)"/>
        
        <!-- Left Arm Waving -->
        <circle cx="160" cy="275" r="48" fill="url(#kirbyBody)" filter="url(#shadow)"/>
        <!-- Right Arm Waving Up -->
        <circle cx="440" cy="245" r="48" fill="url(#kirbyBody)" filter="url(#shadow)"/>
        
        <!-- Main Kirby Body -->
        <circle cx="300" cy="310" r="160" fill="url(#kirbyBody)" filter="url(#shadow)"/>
        
        <!-- Pink Cheek Blushes -->
        <ellipse cx="215" cy="335" rx="28" ry="16" fill="#ff4d79" opacity="0.75"/>
        <ellipse cx="385" cy="335" rx="28" ry="16" fill="#ff4d79" opacity="0.75"/>
        
        <!-- Eyes -->
        <!-- Left Eye -->
        <ellipse cx="260" cy="270" rx="18" ry="36" fill="#1b1d36"/>
        <ellipse cx="260" cy="256" rx="11" ry="18" fill="#ffffff"/>
        <ellipse cx="260" cy="288" rx="10" ry="12" fill="#2d68c4"/>
        
        <!-- Right Eye -->
        <ellipse cx="340" cy="270" rx="18" ry="36" fill="#1b1d36"/>
        <ellipse cx="340" cy="256" rx="11" ry="18" fill="#ffffff"/>
        <ellipse cx="340" cy="288" rx="10" ry="12" fill="#2d68c4"/>
        
        <!-- Cheerful Smile -->
        <path d="M 282 340 Q 300 365 318 340" stroke="#7a1430" stroke-width="6" fill="#a81a3e" stroke-linecap="round"/>
        <path d="M 288 343 Q 300 357 312 343" fill="#ff7da7"/>
        
        <!-- Sparkling Yellow Star Badge -->
        <polygon points="460,160 472,192 506,194 480,215 488,248 460,230 432,248 440,215 414,194 448,192" fill="#ffd426" stroke="#f0a500" stroke-width="4"/>
        <circle cx="460" cy="205" r="8" fill="#ffffff" opacity="0.8"/>
      </svg>
    `
  },
  {
    filename: 'sword-kp.jpg',
    width: 600,
    height: 600,
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
        <defs>
          <radialGradient id="skySword" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#f0fff4" />
            <stop offset="100%" stop-color="#bbf7d0" />
          </radialGradient>
          <radialGradient id="kirbyBody" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#ffb2cb" />
            <stop offset="60%" stop-color="#ff7399" />
            <stop offset="100%" stop-color="#e63e6f" />
          </radialGradient>
          <radialGradient id="kirbyFoot" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#ff3b69" />
            <stop offset="100%" stop-color="#b80033" />
          </radialGradient>
          <linearGradient id="bladeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="50%" stop-color="#e2e8f0"/>
            <stop offset="100%" stop-color="#94a3b8"/>
          </linearGradient>
          <linearGradient id="hatGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#48bb78"/>
            <stop offset="100%" stop-color="#166534"/>
          </linearGradient>
        </defs>
        <rect width="600" height="600" fill="url(#skySword)"/>
        
        <!-- Ground Shadow -->
        <ellipse cx="300" cy="515" rx="190" ry="32" fill="#047857" opacity="0.25"/>
        
        <!-- Feet -->
        <ellipse cx="200" cy="470" rx="75" ry="46" fill="url(#kirbyFoot)" transform="rotate(-10 200 470)"/>
        <ellipse cx="380" cy="470" rx="75" ry="46" fill="url(#kirbyFoot)" transform="rotate(15 380 470)"/>
        
        <!-- Left Arm -->
        <circle cx="165" cy="330" r="46" fill="url(#kirbyBody)"/>
        
        <!-- Kirby Body -->
        <circle cx="290" cy="330" r="150" fill="url(#kirbyBody)"/>
        
        <!-- Face Features -->
        <ellipse cx="215" cy="345" rx="26" ry="14" fill="#ff4d79" opacity="0.75"/>
        <ellipse cx="355" cy="345" rx="26" ry="14" fill="#ff4d79" opacity="0.75"/>
        <ellipse cx="250" cy="305" rx="16" ry="32" fill="#1b1d36"/>
        <ellipse cx="250" cy="292" rx="10" ry="16" fill="#ffffff"/>
        <ellipse cx="250" cy="320" rx="9" ry="10" fill="#2d68c4"/>
        <ellipse cx="325" cy="305" rx="16" ry="32" fill="#1b1d36"/>
        <ellipse cx="325" cy="292" rx="10" ry="16" fill="#ffffff"/>
        <ellipse cx="325" cy="320" rx="9" ry="10" fill="#2d68c4"/>
        <path d="M 272 355 Q 288 375 304 355" stroke="#7a1430" stroke-width="6" fill="#a81a3e" stroke-linecap="round"/>
        
        <!-- Green Warrior Cap (Link-style hat) -->
        <path d="M 170 240 Q 280 140 430 220 Q 320 190 280 100 Q 200 160 170 240 Z" fill="url(#hatGrad)"/>
        <path d="M 160 250 C 200 210, 360 210, 420 250 C 370 230, 210 230, 160 250 Z" fill="#eab308" stroke="#ca8a04" stroke-width="3"/>
        <!-- Star on Hat -->
        <polygon points="290,195 296,210 312,212 300,222 304,238 290,230 276,238 280,222 268,212 284,210" fill="#facc15"/>
        
        <!-- Right Arm Holding Sword -->
        <circle cx="420" cy="310" r="46" fill="url(#kirbyBody)"/>
        
        <!-- Shiny Sword -->
        <g transform="translate(420, 140) rotate(25)">
          <!-- Blade -->
          <polygon points="15,-10 30,160 0,160" fill="url(#bladeGrad)" stroke="#64748b" stroke-width="3"/>
          <line x1="15" y1="-5" x2="15" y2="155" stroke="#ffffff" stroke-width="3"/>
          <!-- Crossguard -->
          <rect x="-15" y="160" width="60" height="16" rx="6" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
          <circle cx="15" cy="168" r="5" fill="#3b82f6"/>
          <!-- Handle & Pommel -->
          <rect x="8" y="176" width="14" height="42" rx="4" fill="#78350f"/>
          <circle cx="15" cy="226" r="12" fill="#fbbf24"/>
        </g>
        
        <!-- Slash Wave Effect -->
        <path d="M 440 100 A 180 180 0 0 1 540 320" fill="none" stroke="#67e8f9" stroke-width="12" stroke-linecap="round" opacity="0.8"/>
        <path d="M 460 120 A 150 150 0 0 1 525 300" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    filename: 'ice-kp.jpg',
    width: 600,
    height: 600,
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
        <defs>
          <radialGradient id="skyIce" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#f0f9ff" />
            <stop offset="100%" stop-color="#bae6fd" />
          </radialGradient>
          <radialGradient id="kirbyBodyIce" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#e0f2fe" />
            <stop offset="50%" stop-color="#a5f3fc" />
            <stop offset="100%" stop-color="#38bdf8" />
          </radialGradient>
          <radialGradient id="kirbyFootIce" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#0284c7" />
            <stop offset="100%" stop-color="#0369a1" />
          </radialGradient>
          <linearGradient id="crownGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="50%" stop-color="#38bdf8"/>
            <stop offset="100%" stop-color="#0284c7"/>
          </linearGradient>
        </defs>
        <rect width="600" height="600" fill="url(#skyIce)"/>
        
        <!-- Ground Ice Ring -->
        <ellipse cx="300" cy="510" rx="200" ry="35" fill="#38bdf8" opacity="0.3"/>
        
        <!-- Feet -->
        <ellipse cx="205" cy="465" rx="75" ry="46" fill="url(#kirbyFootIce)" transform="rotate(-12 205 465)"/>
        <ellipse cx="385" cy="465" rx="75" ry="46" fill="url(#kirbyFootIce)" transform="rotate(12 385 465)"/>
        
        <!-- Floating Arms -->
        <circle cx="160" cy="310" r="48" fill="url(#kirbyBodyIce)"/>
        <circle cx="440" cy="310" r="48" fill="url(#kirbyBodyIce)"/>
        
        <!-- Body (Cyan/Ice shimmer) -->
        <circle cx="300" cy="325" r="150" fill="url(#kirbyBodyIce)"/>
        
        <!-- Face Features -->
        <ellipse cx="225" cy="345" rx="24" ry="14" fill="#38bdf8" opacity="0.9"/>
        <ellipse cx="375" cy="345" rx="24" ry="14" fill="#38bdf8" opacity="0.9"/>
        <ellipse cx="260" cy="300" rx="16" ry="32" fill="#0f172a"/>
        <ellipse cx="260" cy="288" rx="10" ry="16" fill="#ffffff"/>
        <ellipse cx="260" cy="315" rx="9" ry="10" fill="#0284c7"/>
        <ellipse cx="340" cy="300" rx="16" ry="32" fill="#0f172a"/>
        <ellipse cx="340" cy="288" rx="10" ry="16" fill="#ffffff"/>
        <ellipse cx="340" cy="315" rx="9" ry="10" fill="#0284c7"/>
        <path d="M 284 350 Q 300 370 316 350" stroke="#0369a1" stroke-width="5" fill="#0ea5e9" stroke-linecap="round"/>
        
        <!-- Ice Crown (Crystal tiara) -->
        <path d="M 180 230 L 220 150 L 260 210 L 300 110 L 340 210 L 380 150 L 420 230 Q 300 210 180 230 Z" fill="url(#crownGrad)" stroke="#ffffff" stroke-width="4"/>
        <circle cx="300" cy="110" r="14" fill="#ffffff"/>
        <circle cx="220" cy="150" r="10" fill="#ffffff"/>
        <circle cx="380" cy="150" r="10" fill="#ffffff"/>
        <polygon points="300,165 305,178 318,180 308,188 311,201 300,195 289,201 292,188 282,180 295,178" fill="#fef08a"/>
        
        <!-- Frost Magic Snowflakes -->
        <g stroke="#ffffff" stroke-width="5" stroke-linecap="round">
          <line x1="120" y1="180" x2="120" y2="240"/>
          <line x1="90" y1="210" x2="150" y2="210"/>
          <line x1="100" y1="190" x2="140" y2="230"/>
          <line x1="100" y1="230" x2="140" y2="190"/>
          
          <line x1="480" y1="180" x2="480" y2="240"/>
          <line x1="450" y1="210" x2="510" y2="210"/>
          <line x1="460" y1="190" x2="500" y2="230"/>
          <line x1="460" y1="230" x2="500" y2="190"/>
        </g>
      </svg>
    `
  },
  {
    filename: 'stone-kp.jpg',
    width: 600,
    height: 600,
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
        <defs>
          <radialGradient id="skyStone" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fffbeb" />
            <stop offset="100%" stop-color="#fef3c7" />
          </radialGradient>
          <linearGradient id="rockGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#94a3b8" />
            <stop offset="50%" stop-color="#64748b" />
            <stop offset="100%" stop-color="#334155" />
          </linearGradient>
          <radialGradient id="kirbyBody" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#ffb2cb" />
            <stop offset="60%" stop-color="#ff7399" />
            <stop offset="100%" stop-color="#e63e6f" />
          </radialGradient>
        </defs>
        <rect width="600" height="600" fill="url(#skyStone)"/>
        
        <!-- Ground Impact Cracks -->
        <ellipse cx="300" cy="520" rx="220" ry="30" fill="#78350f" opacity="0.2"/>
        <path d="M 220 520 L 150 540 M 240 530 L 190 560 M 360 525 L 430 550 M 340 535 L 390 565" stroke="#64748b" stroke-width="5" stroke-linecap="round"/>
        
        <!-- Massive Stone Statue / Kirby Stone Transformation -->
        <path d="M 180 480 L 150 280 L 220 180 L 380 180 L 450 280 L 420 480 Z" fill="url(#rockGrad)" stroke="#1e293b" stroke-width="8"/>
        
        <!-- Carved Star on Forehead -->
        <polygon points="300,210 310,235 338,238 316,256 323,284 300,268 277,284 284,256 262,238 290,235" fill="#facc15" stroke="#ca8a04" stroke-width="3"/>
        
        <!-- Stone Face Details -->
        <!-- Eyes (Determined blocky eyes) -->
        <polygon points="220,310 270,300 265,335 225,335" fill="#0f172a"/>
        <polygon points="380,310 330,300 335,335 375,335" fill="#0f172a"/>
        <!-- Pupils -->
        <circle cx="250" cy="318" r="8" fill="#ffffff"/>
        <circle cx="350" cy="318" r="8" fill="#ffffff"/>
        <!-- Mouth (Stoic determined smile) -->
        <path d="M 270 380 L 330 380" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        
        <!-- Rock Texture Highlights -->
        <path d="M 170 300 L 210 360 M 410 320 L 380 390" stroke="#cbd5e1" stroke-width="4" stroke-linecap="round"/>
        
        <!-- Impact Spark Dust -->
        <polygon points="120,460 135,450 130,470" fill="#e2e8f0"/>
        <polygon points="480,460 465,450 470,470" fill="#e2e8f0"/>
        <polygon points="110,490 140,495 125,510" fill="#cbd5e1"/>
        <polygon points="490,490 460,495 475,510" fill="#cbd5e1"/>
      </svg>
    `
  },
  {
    filename: 'enemyknight-kp.jpg',
    width: 600,
    height: 600,
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
        <defs>
          <radialGradient id="skyKnight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fff1f2" />
            <stop offset="100%" stop-color="#fecdd3" />
          </radialGradient>
          <linearGradient id="armorGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#64748b" />
            <stop offset="50%" stop-color="#334155" />
            <stop offset="100%" stop-color="#0f172a" />
          </linearGradient>
          <linearGradient id="goldTrim" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#fef08a"/>
            <stop offset="100%" stop-color="#eab308"/>
          </linearGradient>
        </defs>
        <rect width="600" height="600" fill="url(#skyKnight)"/>
        
        <!-- Shadow -->
        <ellipse cx="300" cy="510" rx="180" ry="28" fill="#881337" opacity="0.25"/>
        
        <!-- Little Brown Feet -->
        <ellipse cx="230" cy="470" rx="55" ry="35" fill="#78350f"/>
        <ellipse cx="370" cy="470" rx="55" ry="35" fill="#78350f"/>
        
        <!-- Armor Body / Helmet -->
        <ellipse cx="300" cy="340" rx="150" ry="140" fill="url(#armorGrad)" stroke="#1e293b" stroke-width="6"/>
        
        <!-- Gold Trim / Plume Horn -->
        <path d="M 285 200 L 300 110 L 315 200 Z" fill="url(#goldTrim)" stroke="#ca8a04" stroke-width="4"/>
        <circle cx="300" cy="110" r="14" fill="#ef4444"/>
        
        <!-- Helmet Visor (Dark slit with glowing yellow eyes) -->
        <rect x="200" y="290" width="200" height="60" rx="15" fill="#020617" stroke="url(#goldTrim)" stroke-width="5"/>
        <!-- Glowing Yellow Eyes -->
        <ellipse cx="250" cy="320" rx="20" ry="14" fill="#facc15"/>
        <ellipse cx="350" cy="320" rx="20" ry="14" fill="#facc15"/>
        <circle cx="250" cy="320" r="8" fill="#ffffff"/>
        <circle cx="350" cy="320" r="8" fill="#ffffff"/>
        
        <!-- Blade Knight's Hand and Little Sword -->
        <circle cx="430" cy="370" r="35" fill="#64748b" stroke="#334155" stroke-width="4"/>
        <g transform="translate(450, 240) rotate(20)">
          <!-- Sword Blade -->
          <polygon points="12,-20 24,110 0,110" fill="#e2e8f0" stroke="#475569" stroke-width="3"/>
          <line x1="12" y1="-15" x2="12" y2="105" stroke="#ffffff" stroke-width="2"/>
          <!-- Hilt -->
          <rect x="-10" y="110" width="44" height="12" rx="4" fill="#eab308"/>
          <rect x="6" y="122" width="12" height="30" fill="#78350f"/>
        </g>
        
        <!-- Left Hand Shield -->
        <g transform="translate(130, 320)">
          <ellipse cx="40" cy="40" rx="50" ry="65" fill="#dc2626" stroke="#fbbf24" stroke-width="6"/>
          <polygon points="40,20 46,34 60,36 48,46 52,60 40,52 28,60 32,46 20,36 34,34" fill="#fef08a"/>
        </g>
      </svg>
    `
  },
  {
    filename: 'enemypenguin-kp.jpg',
    width: 600,
    height: 600,
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
        <defs>
          <radialGradient id="skyPenguin" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#eff6ff" />
            <stop offset="100%" stop-color="#bfdbfe" />
          </radialGradient>
          <radialGradient id="penguinBody" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#60a5fa" />
            <stop offset="70%" stop-color="#2563eb" />
            <stop offset="100%" stop-color="#1e40af" />
          </radialGradient>
        </defs>
        <rect width="600" height="600" fill="url(#skyPenguin)"/>
        
        <!-- Shadow -->
        <ellipse cx="300" cy="510" rx="180" ry="28" fill="#1e3a8a" opacity="0.2"/>
        
        <!-- Orange Webbed Feet -->
        <ellipse cx="220" cy="480" rx="60" ry="32" fill="#f97316"/>
        <ellipse cx="380" cy="480" rx="60" ry="32" fill="#f97316"/>
        
        <!-- Penguin Flippers -->
        <ellipse cx="140" cy="340" rx="35" ry="70" fill="#2563eb" transform="rotate(-30 140 340)"/>
        <ellipse cx="460" cy="340" rx="35" ry="70" fill="#2563eb" transform="rotate(30 460 340)"/>
        
        <!-- Chubby Blue Body -->
        <ellipse cx="300" cy="330" rx="160" ry="155" fill="url(#penguinBody)"/>
        
        <!-- White Belly -->
        <ellipse cx="300" cy="360" rx="110" ry="115" fill="#f8fafc"/>
        
        <!-- Big Cute Beak -->
        <ellipse cx="300" cy="315" rx="36" ry="22" fill="#f59e0b" stroke="#d97706" stroke-width="3"/>
        
        <!-- Eyes -->
        <ellipse cx="250" cy="270" rx="16" ry="26" fill="#0f172a"/>
        <circle cx="250" cy="260" r="8" fill="#ffffff"/>
        <ellipse cx="350" cy="270" rx="16" ry="26" fill="#0f172a"/>
        <circle cx="350" cy="260" r="8" fill="#ffffff"/>
        
        <!-- Pink Blush Cheeks -->
        <ellipse cx="205" cy="315" rx="22" ry="12" fill="#f43f5e" opacity="0.6"/>
        <ellipse cx="395" cy="315" rx="22" ry="12" fill="#f43f5e" opacity="0.6"/>
        
        <!-- Warm Knit Beanie with Pom-Pom (Chilly character style) -->
        <path d="M 170 230 C 180 120, 420 120, 430 230 Z" fill="#ef4444"/>
        <rect x="160" y="210" width="280" height="40" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="4"/>
        <!-- Pom-pom -->
        <circle cx="300" cy="115" r="32" fill="#ffffff" stroke="#f1f5f9" stroke-width="4"/>
        <!-- Bell on Hat -->
        <circle cx="300" cy="180" r="16" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
        
        <!-- Little Ice Crystals Floating Around -->
        <polygon points="120,220 130,240 110,240" fill="#38bdf8"/>
        <polygon points="480,210 490,230 470,230" fill="#38bdf8"/>
      </svg>
    `
  },
  {
    filename: 'bossbird-kp.jpg',
    width: 600,
    height: 600,
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
        <defs>
          <radialGradient id="skyBoss" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fff7ed" />
            <stop offset="100%" stop-color="#ffedd5" />
          </radialGradient>
          <radialGradient id="birdBody" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#fb923c" />
            <stop offset="70%" stop-color="#ea580c" />
            <stop offset="100%" stop-color="#9a3412" />
          </radialGradient>
        </defs>
        <rect width="600" height="600" fill="url(#skyBoss)"/>
        
        <!-- Shadow -->
        <ellipse cx="300" cy="520" rx="210" ry="32" fill="#7c2d12" opacity="0.3"/>
        
        <!-- Giant Bird Feet -->
        <ellipse cx="210" cy="485" rx="65" ry="35" fill="#eab308"/>
        <ellipse cx="390" cy="485" rx="65" ry="35" fill="#eab308"/>
        
        <!-- Giant Feather Wings -->
        <path d="M 160 320 C 60 220, 40 400, 160 420 Z" fill="#c2410c"/>
        <path d="M 440 320 C 540 220, 560 400, 440 420 Z" fill="#c2410c"/>
        
        <!-- Round Chubby Bird Body -->
        <ellipse cx="300" cy="330" rx="175" ry="165" fill="url(#birdBody)" stroke="#7c2d12" stroke-width="6"/>
        
        <!-- Soft Yellow Chest Feathers -->
        <ellipse cx="300" cy="380" rx="115" ry="110" fill="#fef08a"/>
        
        <!-- Greedy Fierce Eyes -->
        <ellipse cx="235" cy="255" rx="25" ry="35" fill="#0f172a"/>
        <circle cx="230" cy="245" r="10" fill="#ffffff"/>
        <ellipse cx="365" cy="255" rx="25" ry="35" fill="#0f172a"/>
        <circle cx="360" cy="245" r="10" fill="#ffffff"/>
        
        <!-- Giant Golden Beak (Open, ready to gobble cake!) -->
        <path d="M 220 290 Q 300 250 380 290 L 300 370 Z" fill="#f59e0b" stroke="#b45309" stroke-width="5"/>
        <path d="M 250 310 Q 300 330 350 310" stroke="#78350f" stroke-width="4"/>
        
        <!-- Greedy King's Golden Crown -->
        <path d="M 220 180 L 250 110 L 300 160 L 350 110 L 380 180 Z" fill="#facc15" stroke="#ca8a04" stroke-width="5"/>
        <circle cx="250" cy="110" r="10" fill="#ef4444"/>
        <circle cx="300" cy="160" r="12" fill="#3b82f6"/>
        <circle cx="350" cy="110" r="10" fill="#ef4444"/>
        
        <!-- Cake Crumb and Stars Spit Out -->
        <polygon points="170,180 180,200 200,205 185,220 190,240 170,225 150,240 155,220 140,205 160,200" fill="#fde047" stroke="#eab308" stroke-width="2"/>
        <circle cx="420" cy="210" r="16" fill="#f43f5e"/>
      </svg>
    `
  },
  {
    filename: 'bgstage1-kp.jpg',
    width: 800,
    height: 450,
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
        <defs>
          <linearGradient id="skyStage1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#bae6fd" />
            <stop offset="60%" stop-color="#fed7aa" />
            <stop offset="100%" stop-color="#fecdd3" />
          </linearGradient>
          <linearGradient id="grassGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#86efac" />
            <stop offset="50%" stop-color="#22c55e" />
            <stop offset="100%" stop-color="#15803d" />
          </linearGradient>
        </defs>
        <rect width="800" height="450" fill="url(#skyStage1)"/>
        
        <!-- Fluffy Clouds -->
        <ellipse cx="140" cy="90" rx="90" ry="40" fill="#ffffff" opacity="0.85"/>
        <ellipse cx="200" cy="70" rx="60" ry="35" fill="#ffffff" opacity="0.85"/>
        <ellipse cx="640" cy="110" rx="100" ry="45" fill="#ffffff" opacity="0.85"/>
        
        <!-- Distant Candy Hills -->
        <path d="M -50 320 Q 150 180 350 320 Q 550 200 850 320 L 850 450 L -50 450 Z" fill="#fda4af" opacity="0.7"/>
        <path d="M 0 350 Q 200 240 450 360 Q 650 260 850 360 L 850 450 L 0 450 Z" fill="#f472b6" opacity="0.8"/>
        
        <!-- Foreground Sweet Grassy Ground -->
        <path d="M 0 360 Q 250 330 500 360 Q 700 340 800 360 L 800 450 L 0 450 Z" fill="url(#grassGrad)"/>
        
        <!-- Giant Strawberry Tree on Left -->
        <g transform="translate(60, 200)">
          <!-- Chocolate Trunk -->
          <rect x="40" y="90" width="30" height="90" rx="8" fill="#78350f"/>
          <!-- Strawberry Top -->
          <path d="M 10 90 C -20 10, 130 10, 100 90 C 80 140, 30 140, 10 90 Z" fill="#ef4444"/>
          <!-- Green Leaf Calyx -->
          <path d="M 25 15 C 55 -15, 60 5, 55 15 C 65 -10, 85 5, 80 15" fill="#22c55e" stroke="#15803d" stroke-width="4"/>
          <!-- Yellow Seeds -->
          <ellipse cx="35" cy="50" rx="3" ry="5" fill="#fef08a"/>
          <ellipse cx="75" cy="50" rx="3" ry="5" fill="#fef08a"/>
          <ellipse cx="55" cy="75" rx="3" ry="5" fill="#fef08a"/>
          <ellipse cx="55" cy="100" rx="3" ry="5" fill="#fef08a"/>
        </g>
        
        <!-- Giant Sweet Strawberry on Right -->
        <g transform="translate(640, 240)">
          <rect x="35" y="80" width="25" height="70" rx="6" fill="#78350f"/>
          <path d="M 5 80 C -15 15, 105 15, 85 80 C 70 120, 20 120, 5 80 Z" fill="#ef4444"/>
          <ellipse cx="30" cy="50" rx="3" ry="5" fill="#fef08a"/>
          <ellipse cx="65" cy="50" rx="3" ry="5" fill="#fef08a"/>
          <ellipse cx="48" cy="70" rx="3" ry="5" fill="#fef08a"/>
        </g>
        
        <!-- Little Daisy Flowers on Ground -->
        <circle cx="280" cy="400" r="10" fill="#fde047"/>
        <circle cx="380" cy="410" r="8" fill="#f43f5e"/>
        <circle cx="480" cy="395" r="10" fill="#ffffff"/>
      </svg>
    `
  },
  {
    filename: 'bgstage2-kp.jpg',
    width: 800,
    height: 450,
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
        <defs>
          <linearGradient id="skyStage2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#38bdf8" />
            <stop offset="60%" stop-color="#bae6fd" />
            <stop offset="100%" stop-color="#e0f2fe" />
          </linearGradient>
          <linearGradient id="waterfallBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#38bdf8" />
            <stop offset="50%" stop-color="#e0f2fe" />
            <stop offset="100%" stop-color="#0284c7" />
          </linearGradient>
          <linearGradient id="cliffGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#334155" />
            <stop offset="100%" stop-color="#64748b" />
          </linearGradient>
        </defs>
        <rect width="800" height="450" fill="url(#skyStage2)"/>
        
        <!-- Rainbow in Mist -->
        <ellipse cx="400" cy="300" rx="320" ry="180" fill="none" stroke="#f43f5e" stroke-width="8" opacity="0.35"/>
        <ellipse cx="400" cy="300" rx="308" ry="172" fill="none" stroke="#f59e0b" stroke-width="8" opacity="0.35"/>
        <ellipse cx="400" cy="300" rx="296" ry="164" fill="none" stroke="#10b981" stroke-width="8" opacity="0.35"/>
        <ellipse cx="400" cy="300" rx="284" ry="156" fill="none" stroke="#3b82f6" stroke-width="8" opacity="0.35"/>
        
        <!-- Rocky Cliffs on both sides -->
        <polygon points="0,0 220,0 180,350 0,400" fill="url(#cliffGrad)"/>
        <polygon points="800,0 600,0 640,350 800,400" fill="url(#cliffGrad)"/>
        
        <!-- Rushing Center Waterfall -->
        <rect x="240" y="0" width="340" height="360" fill="url(#waterfallBody)"/>
        <!-- Waterfall Texture Lines -->
        <g stroke="#ffffff" stroke-width="3" opacity="0.8">
          <line x1="280" y1="0" x2="280" y2="350"/>
          <line x1="330" y1="0" x2="330" y2="350"/>
          <line x1="390" y1="0" x2="390" y2="350"/>
          <line x1="450" y1="0" x2="450" y2="350"/>
          <line x1="510" y1="0" x2="510" y2="350"/>
        </g>
        
        <!-- Foamy River at Bottom -->
        <rect x="0" y="350" width="800" height="100" fill="#0284c7"/>
        <ellipse cx="400" cy="360" rx="240" ry="40" fill="#ffffff" opacity="0.85"/>
        <ellipse cx="300" cy="380" rx="160" ry="30" fill="#bae6fd" opacity="0.9"/>
        <ellipse cx="500" cy="380" rx="160" ry="30" fill="#bae6fd" opacity="0.9"/>
        
        <!-- Lush Green Cliff Tops -->
        <path d="M 0 60 Q 110 30 220 60 L 220 80 L 0 80 Z" fill="#22c55e"/>
        <path d="M 600 60 Q 700 30 800 60 L 800 80 L 600 80 Z" fill="#22c55e"/>
      </svg>
    `
  },
  {
    filename: 'obstaclewaterfall-kp.jpg',
    width: 600,
    height: 600,
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
        <defs>
          <linearGradient id="fallStream" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0284c7" />
            <stop offset="50%" stop-color="#38bdf8" />
            <stop offset="100%" stop-color="#e0f2fe" />
          </linearGradient>
        </defs>
        <rect width="600" height="600" fill="#f0f9ff"/>
        
        <!-- Raging Water Column Obstacle -->
        <path d="M 150 0 L 450 0 L 420 540 L 180 540 Z" fill="url(#fallStream)"/>
        
        <!-- Water Crests & Rapids -->
        <g stroke="#ffffff" stroke-width="8" stroke-linecap="round">
          <line x1="220" y1="80" x2="220" y2="380"/>
          <line x1="290" y1="40" x2="290" y2="440"/>
          <line x1="360" y1="100" x2="360" y2="400"/>
        </g>
        
        <!-- Turbulent Splash Eddies at Base -->
        <circle cx="220" cy="500" r="50" fill="#ffffff" opacity="0.9"/>
        <circle cx="300" cy="510" r="65" fill="#ffffff" opacity="0.95"/>
        <circle cx="380" cy="500" r="50" fill="#ffffff" opacity="0.9"/>
        
        <!-- Danger Warning Water Sign -->
        <polygon points="300,180 370,300 230,300" fill="#facc15" stroke="#b45309" stroke-width="8"/>
        <text x="290" y="275" font-family="Arial, sans-serif" font-size="70" font-weight="bold" fill="#000000">!</text>
      </svg>
    `
  },
  {
    filename: 'bgstage3-kp.jpg',
    width: 800,
    height: 450,
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
        <defs>
          <radialGradient id="caveGlow" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#475569" />
            <stop offset="60%" stop-color="#1e293b" />
            <stop offset="100%" stop-color="#090d16" />
          </radialGradient>
        </defs>
        <rect width="800" height="450" fill="url(#caveGlow)"/>
        
        <!-- Stalactites Hanging from Ceiling -->
        <polygon points="40,0 90,0 65,140" fill="#334155"/>
        <polygon points="120,0 180,0 150,90" fill="#475569"/>
        <polygon points="260,0 340,0 300,160" fill="#334155"/>
        <polygon points="450,0 520,0 485,110" fill="#475569"/>
        <polygon points="620,0 700,0 660,180" fill="#334155"/>
        <polygon points="720,0 790,0 755,90" fill="#475569"/>
        
        <!-- Glowing Minerals & Crystals -->
        <polygon points="140,240 160,200 170,250" fill="#ec4899"/>
        <polygon points="660,260 685,210 695,270" fill="#a855f7"/>
        <polygon points="380,280 400,240 410,290" fill="#06b6d4"/>
        
        <!-- Cave Underground Floor -->
        <polygon points="0,350 800,350 800,450 0,450" fill="#1e293b"/>
        
        <!-- Lantern hanging -->
        <line x1="220" y1="0" x2="220" y2="120" stroke="#71717a" stroke-width="3"/>
        <circle cx="220" cy="135" r="22" fill="#fbbf24" opacity="0.9"/>
        <circle cx="220" cy="135" r="45" fill="#fde047" opacity="0.2"/>
      </svg>
    `
  },
  {
    filename: 'obstaclespikes-kp.jpg',
    width: 600,
    height: 600,
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
        <defs>
          <linearGradient id="metalSpike" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#f8fafc"/>
            <stop offset="50%" stop-color="#94a3b8"/>
            <stop offset="100%" stop-color="#334155"/>
          </linearGradient>
        </defs>
        <rect width="600" height="600" fill="#0f172a" fill-opacity="0.1"/>
        
        <!-- Stone Base Floor -->
        <rect x="20" y="440" width="560" height="90" rx="12" fill="#334155" stroke="#1e293b" stroke-width="6"/>
        
        <!-- Row of Sharp Gleaming Spikes -->
        <polygon points="50,440 100,160 150,440" fill="url(#metalSpike)" stroke="#0f172a" stroke-width="5"/>
        <polygon points="150,440 200,120 250,440" fill="url(#metalSpike)" stroke="#0f172a" stroke-width="5"/>
        <polygon points="250,440 300,140 350,440" fill="url(#metalSpike)" stroke="#0f172a" stroke-width="5"/>
        <polygon points="350,440 400,110 450,440" fill="url(#metalSpike)" stroke="#0f172a" stroke-width="5"/>
        <polygon points="450,440 500,150 550,440" fill="url(#metalSpike)" stroke="#0f172a" stroke-width="5"/>
        
        <!-- Gleam Glints on Spike Tips -->
        <polygon points="100,160 90,175 110,175" fill="#ffffff"/>
        <polygon points="200,120 190,135 210,135" fill="#ffffff"/>
        <polygon points="300,140 290,155 310,155" fill="#ffffff"/>
        <polygon points="400,110 390,125 410,125" fill="#ffffff"/>
        <polygon points="500,150 490,165 510,165" fill="#ffffff"/>
      </svg>
    `
  },
  {
    filename: 'bgboss-kp.jpg',
    width: 800,
    height: 450,
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
        <defs>
          <linearGradient id="skyBossNight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#1e1b4b" />
            <stop offset="50%" stop-color="#4c1d95" />
            <stop offset="100%" stop-color="#831843" />
          </linearGradient>
        </defs>
        <rect width="800" height="450" fill="url(#skyBossNight)"/>
        
        <!-- Twinkling Stars in Twilight -->
        <circle cx="100" cy="50" r="3" fill="#ffffff"/>
        <circle cx="220" cy="80" r="2" fill="#ffffff"/>
        <circle cx="340" cy="40" r="4" fill="#fde047"/>
        <circle cx="500" cy="70" r="2.5" fill="#ffffff"/>
        <circle cx="650" cy="50" r="3.5" fill="#fde047"/>
        <circle cx="740" cy="90" r="2" fill="#ffffff"/>
        
        <!-- Golden Crescent Moon -->
        <path d="M 680 40 A 50 50 0 0 0 740 100 A 40 40 0 0 1 680 40 Z" fill="#fde047"/>
        
        <!-- Giant Tiered Strawberry Cream Cake (The Castle Prize!) -->
        <g transform="translate(250, 160)">
          <!-- Tier 3 Top -->
          <rect x="90" y="40" width="120" height="50" rx="10" fill="#fbcfe8"/>
          <!-- Whipped Cream Frosting -->
          <ellipse cx="150" cy="40" rx="60" ry="12" fill="#ffffff"/>
          <!-- Top Giant Strawberry -->
          <circle cx="150" cy="20" r="18" fill="#ef4444"/>
          <path d="M 145 5 C 150 0, 155 0, 152 6" stroke="#22c55e" stroke-width="4"/>
          
          <!-- Tier 2 Middle -->
          <rect x="50" y="90" width="200" height="60" rx="10" fill="#f472b6"/>
          <ellipse cx="150" cy="90" rx="100" ry="16" fill="#ffffff"/>
          
          <!-- Tier 1 Base -->
          <rect x="10" y="150" width="280" height="70" rx="12" fill="#fb7185"/>
          <ellipse cx="150" cy="150" rx="140" ry="20" fill="#ffffff"/>
        </g>
        
        <!-- Castle Rooftop Battlements Floor -->
        <rect x="0" y="360" width="800" height="90" fill="#fda4af"/>
        <g fill="#f43f5e">
          <rect x="40" y="320" width="60" height="40" rx="6"/>
          <rect x="160" y="320" width="60" height="40" rx="6"/>
          <rect x="580" y="320" width="60" height="40" rx="6"/>
          <rect x="700" y="320" width="60" height="40" rx="6"/>
        </g>
        <!-- Golden Decorative Trim -->
        <rect x="0" y="355" width="800" height="10" fill="#facc15"/>
      </svg>
    `
  }
];

async function generateAll() {
  console.log(`Generating ${assets.length} assets...`);
  for (const item of assets) {
    const filePath = path.join(PUBLIC_DIR, item.filename);
    const buffer = Buffer.from(item.svg);
    await sharp(buffer)
      .jpeg({ quality: 92 })
      .toFile(filePath);
    console.log(`Saved: ${filePath}`);
  }
  console.log('All image assets successfully created!');
}

generateAll().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
