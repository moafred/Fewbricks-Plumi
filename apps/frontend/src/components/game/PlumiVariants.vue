<script setup lang="ts">
/**
 * PlumiVariants — Page de preview des 8 variantes de la plume Plumi
 *
 * Composant temporaire pour choisir la nouvelle mascotte.
 * Affiche les 8 variantes en grille 2×4 avec nom en dessous.
 */

const variants = [
  'Classique',
  'Calligraphie',
  'Magique',
  'Ronde',
  'Panache',
  'Cristalline',
  'Plume-Crayon',
  'Flamme',
] as const;
</script>

<template>
  <div class="plumi-variants p-6">
    <h2 class="text-2xl font-bold text-sky-600 mb-6 text-center">
      Choisis ta plume !
    </h2>

    <div class="grid grid-cols-2 gap-6 max-w-xl mx-auto">
      <!-- 1. Classique — Plume complète symétrique -->
      <div class="flex flex-col items-center gap-2">
        <svg viewBox="0 0 200 200" class="w-32 h-32" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="varGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#faf0d5" />
              <stop offset="50%" stop-color="#e3c16f" />
              <stop offset="100%" stop-color="#d4a64a" />
            </linearGradient>
          </defs>
          <!-- Corps gauche -->
          <path
            d="M 100 20 Q 80 40 70 60 Q 60 80 65 100 Q 70 120 80 140 Q 90 160 100 180 L 100 20 Z"
            fill="url(#varGrad1)" stroke="#e3c16f" stroke-width="1.5"
          />
          <!-- Corps droit -->
          <path
            d="M 100 20 Q 120 40 130 60 Q 140 80 135 100 Q 130 120 120 140 Q 110 160 100 180 L 100 20 Z"
            fill="url(#varGrad1)" stroke="#e3c16f" stroke-width="1.5"
          />
          <!-- Tige -->
          <line x1="100" y1="20" x2="100" y2="180" stroke="#8e5e0e" stroke-width="3" stroke-linecap="round" />
          <!-- Barbes droites -->
          <path d="M 100 40 Q 118 50 125 70" stroke="#e3c16f" stroke-width="1.5" fill="none" />
          <path d="M 100 65 Q 114 75 120 95" stroke="#e3c16f" stroke-width="1.5" fill="none" />
          <path d="M 100 90 Q 110 98 115 115" stroke="#e3c16f" stroke-width="1.5" fill="none" />
          <!-- Barbes gauches -->
          <path d="M 100 40 Q 82 50 75 70" stroke="#e3c16f" stroke-width="1.5" fill="none" />
          <path d="M 100 65 Q 86 75 80 95" stroke="#e3c16f" stroke-width="1.5" fill="none" />
          <path d="M 100 90 Q 90 98 85 115" stroke="#e3c16f" stroke-width="1.5" fill="none" />
        </svg>
        <span class="text-sm font-semibold text-stone-600">{{ variants[0] }}</span>
      </div>

      <!-- 2. Calligraphie — Fine et élégante, pointe d'écriture -->
      <div class="flex flex-col items-center gap-2">
        <svg viewBox="0 0 200 200" class="w-32 h-32" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="varGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#faf0d5" />
              <stop offset="50%" stop-color="#e3c16f" />
              <stop offset="100%" stop-color="#d4a64a" />
            </linearGradient>
          </defs>
          <!-- Corps fin et élancé -->
          <path
            d="M 100 15 Q 112 35 115 55 Q 118 75 114 95 Q 110 115 106 135 Q 103 155 100 175 Q 97 155 94 135 Q 90 115 86 95 Q 82 75 85 55 Q 88 35 100 15 Z"
            fill="url(#varGrad2)" stroke="#e3c16f" stroke-width="1.5"
          />
          <!-- Tige fine -->
          <line x1="100" y1="15" x2="100" y2="175" stroke="#8e5e0e" stroke-width="2" stroke-linecap="round" />
          <!-- Pointe d'écriture en bas -->
          <path d="M 100 175 L 96 190 Q 100 195 104 190 Z" fill="#8e5e0e" />
          <!-- Barbes fines et élégantes -->
          <path d="M 100 35 Q 110 42 113 55" stroke="#e3c16f" stroke-width="1" fill="none" />
          <path d="M 100 35 Q 90 42 87 55" stroke="#e3c16f" stroke-width="1" fill="none" />
          <path d="M 100 60 Q 108 66 112 78" stroke="#e3c16f" stroke-width="1" fill="none" />
          <path d="M 100 60 Q 92 66 88 78" stroke="#e3c16f" stroke-width="1" fill="none" />
          <!-- Courbe calligraphique décorative -->
          <path d="M 96 190 Q 85 185 80 178 Q 75 172 78 168" stroke="#d4a64a" stroke-width="1.5" fill="none" />
        </svg>
        <span class="text-sm font-semibold text-stone-600">{{ variants[1] }}</span>
      </div>

      <!-- 3. Magique — Étoile à la pointe, étincelles -->
      <div class="flex flex-col items-center gap-2">
        <svg viewBox="0 0 200 200" class="w-32 h-32" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="varGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#faf0d5" />
              <stop offset="50%" stop-color="#e3c16f" />
              <stop offset="100%" stop-color="#d4a64a" />
            </linearGradient>
          </defs>
          <!-- Corps de la plume -->
          <path
            d="M 100 25 Q 118 45 125 65 Q 132 85 128 105 Q 122 125 112 145 Q 106 158 100 170
               Q 94 158 88 145 Q 78 125 72 105 Q 68 85 75 65 Q 82 45 100 25 Z"
            fill="url(#varGrad3)" stroke="#e3c16f" stroke-width="1.5"
          />
          <!-- Tige -->
          <line x1="100" y1="25" x2="100" y2="170" stroke="#8e5e0e" stroke-width="3" stroke-linecap="round" />
          <!-- Barbes -->
          <path d="M 100 45 Q 115 52 120 65" stroke="#e3c16f" stroke-width="1.5" fill="none" />
          <path d="M 100 45 Q 85 52 80 65" stroke="#e3c16f" stroke-width="1.5" fill="none" />
          <path d="M 100 75 Q 112 80 118 95" stroke="#e3c16f" stroke-width="1.5" fill="none" />
          <path d="M 100 75 Q 88 80 82 95" stroke="#e3c16f" stroke-width="1.5" fill="none" />
          <!-- Étoile à la pointe -->
          <polygon
            points="100,172 103,180 112,180 105,186 108,195 100,190 92,195 95,186 88,180 97,180"
            fill="#e3c16f" stroke="#d4a64a" stroke-width="0.5"
          />
          <!-- Étincelles autour -->
          <circle cx="75" cy="40" r="2.5" fill="#e3c16f" opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="130" cy="50" r="2" fill="#d4a64a" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="68" cy="80" r="1.5" fill="#e3c16f" opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.1;0.7" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="135" cy="90" r="2" fill="#e3c16f" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.4s" repeatCount="indefinite" />
          </circle>
          <!-- Trainée lumineuse -->
          <path d="M 100 170 Q 105 178 100 185" stroke="#e3c16f" stroke-width="1" fill="none" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
          </path>
        </svg>
        <span class="text-sm font-semibold text-stone-600">{{ variants[2] }}</span>
      </div>

      <!-- 4. Ronde — Formes rondes/kawaii, silhouette douce -->
      <div class="flex flex-col items-center gap-2">
        <svg viewBox="0 0 200 200" class="w-32 h-32" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="varGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#faf0d5" />
              <stop offset="50%" stop-color="#e3c16f" />
              <stop offset="100%" stop-color="#d4a64a" />
            </linearGradient>
          </defs>
          <!-- Corps rond et doux -->
          <path
            d="M 100 30 Q 135 50 140 80 Q 145 110 130 135 Q 118 155 100 170
               Q 82 155 70 135 Q 55 110 60 80 Q 65 50 100 30 Z"
            fill="url(#varGrad4)" stroke="#e3c16f" stroke-width="2"
          />
          <!-- Tige courte et arrondie -->
          <path d="M 100 170 Q 102 178 100 188" stroke="#8e5e0e" stroke-width="4" stroke-linecap="round" fill="none" />
          <!-- Barbes arrondies -->
          <path d="M 100 55 Q 120 60 125 78" stroke="#e3c16f" stroke-width="2" fill="none" stroke-linecap="round" />
          <path d="M 100 55 Q 80 60 75 78" stroke="#e3c16f" stroke-width="2" fill="none" stroke-linecap="round" />
          <path d="M 100 85 Q 118 90 122 105" stroke="#e3c16f" stroke-width="2" fill="none" stroke-linecap="round" />
          <path d="M 100 85 Q 82 90 78 105" stroke="#e3c16f" stroke-width="2" fill="none" stroke-linecap="round" />
          <!-- Ligne centrale douce -->
          <path d="M 100 30 Q 100 100 100 170" stroke="#8e5e0e" stroke-width="2.5" stroke-linecap="round" fill="none" />
        </svg>
        <span class="text-sm font-semibold text-stone-600">{{ variants[3] }}</span>
      </div>

      <!-- 5. Panache — Large et majestueuse -->
      <div class="flex flex-col items-center gap-2">
        <svg viewBox="0 0 200 200" class="w-32 h-32" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="varGrad5" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#faf0d5" />
              <stop offset="50%" stop-color="#e3c16f" />
              <stop offset="100%" stop-color="#d4a64a" />
            </linearGradient>
          </defs>
          <!-- Corps large et panachée -->
          <path
            d="M 100 15 Q 145 35 155 60 Q 165 85 150 110 Q 140 130 120 150 Q 110 165 100 178
               Q 90 165 80 150 Q 60 130 50 110 Q 35 85 45 60 Q 55 35 100 15 Z"
            fill="url(#varGrad5)" stroke="#e3c16f" stroke-width="1.5"
          />
          <!-- Tige -->
          <line x1="100" y1="15" x2="100" y2="190" stroke="#8e5e0e" stroke-width="3" stroke-linecap="round" />
          <!-- Barbes volumineuses droites -->
          <path d="M 100 30 Q 130 40 145 58" stroke="#e3c16f" stroke-width="1.5" fill="none" />
          <path d="M 100 50 Q 128 60 142 80" stroke="#e3c16f" stroke-width="1.5" fill="none" />
          <path d="M 100 70 Q 125 80 138 100" stroke="#e3c16f" stroke-width="1.5" fill="none" />
          <path d="M 100 95 Q 118 102 128 118" stroke="#e3c16f" stroke-width="1.5" fill="none" />
          <!-- Barbes volumineuses gauches -->
          <path d="M 100 30 Q 70 40 55 58" stroke="#e3c16f" stroke-width="1.5" fill="none" />
          <path d="M 100 50 Q 72 60 58 80" stroke="#e3c16f" stroke-width="1.5" fill="none" />
          <path d="M 100 70 Q 75 80 62 100" stroke="#e3c16f" stroke-width="1.5" fill="none" />
          <path d="M 100 95 Q 82 102 72 118" stroke="#e3c16f" stroke-width="1.5" fill="none" />
        </svg>
        <span class="text-sm font-semibold text-stone-600">{{ variants[4] }}</span>
      </div>

      <!-- 6. Cristalline — Géométrique, facettes angulaires -->
      <div class="flex flex-col items-center gap-2">
        <svg viewBox="0 0 200 200" class="w-32 h-32" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="varGrad6a" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#faf0d5" />
              <stop offset="100%" stop-color="#e3c16f" />
            </linearGradient>
            <linearGradient id="varGrad6b" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#e3c16f" />
              <stop offset="100%" stop-color="#d4a64a" />
            </linearGradient>
          </defs>
          <!-- Facette gauche haute -->
          <polygon points="100,20 75,55 100,65" fill="url(#varGrad6a)" stroke="#e3c16f" stroke-width="1" />
          <!-- Facette droite haute -->
          <polygon points="100,20 125,55 100,65" fill="url(#varGrad6b)" stroke="#e3c16f" stroke-width="1" />
          <!-- Facette gauche milieu -->
          <polygon points="100,65 70,75 75,110 100,105" fill="url(#varGrad6a)" stroke="#e3c16f" stroke-width="1" />
          <!-- Facette droite milieu -->
          <polygon points="100,65 130,75 125,110 100,105" fill="url(#varGrad6b)" stroke="#e3c16f" stroke-width="1" />
          <!-- Facette gauche basse -->
          <polygon points="100,105 75,110 82,145 100,140" fill="url(#varGrad6a)" stroke="#e3c16f" stroke-width="1" />
          <!-- Facette droite basse -->
          <polygon points="100,105 125,110 118,145 100,140" fill="url(#varGrad6b)" stroke="#e3c16f" stroke-width="1" />
          <!-- Pointe basse -->
          <polygon points="100,140 82,145 100,180 118,145" fill="#d4a64a" stroke="#e3c16f" stroke-width="1" />
          <!-- Tige cristalline -->
          <line x1="100" y1="20" x2="100" y2="180" stroke="#8e5e0e" stroke-width="2" stroke-linecap="round" />
          <!-- Reflets -->
          <line x1="85" y1="42" x2="95" y2="52" stroke="#faf0d5" stroke-width="1.5" opacity="0.6" />
          <line x1="108" y1="80" x2="118" y2="90" stroke="#faf0d5" stroke-width="1.5" opacity="0.5" />
          <line x1="88" y1="118" x2="95" y2="128" stroke="#faf0d5" stroke-width="1.5" opacity="0.4" />
        </svg>
        <span class="text-sm font-semibold text-stone-600">{{ variants[5] }}</span>
      </div>

      <!-- 7. Plume-Crayon — Hybride plume + crayon -->
      <div class="flex flex-col items-center gap-2">
        <svg viewBox="0 0 200 200" class="w-32 h-32" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="varGrad7" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#faf0d5" />
              <stop offset="50%" stop-color="#e3c16f" />
              <stop offset="100%" stop-color="#d4a64a" />
            </linearGradient>
          </defs>
          <!-- Corps plume (partie haute) -->
          <path
            d="M 100 18 Q 122 38 128 58 Q 134 78 128 95 Q 122 108 112 115
               Q 106 118 100 120 Q 94 118 88 115 Q 78 108 72 95
               Q 66 78 72 58 Q 78 38 100 18 Z"
            fill="url(#varGrad7)" stroke="#e3c16f" stroke-width="1.5"
          />
          <!-- Barbes -->
          <path d="M 100 38 Q 115 45 120 58" stroke="#e3c16f" stroke-width="1.5" fill="none" />
          <path d="M 100 38 Q 85 45 80 58" stroke="#e3c16f" stroke-width="1.5" fill="none" />
          <path d="M 100 65 Q 112 70 118 85" stroke="#e3c16f" stroke-width="1.5" fill="none" />
          <path d="M 100 65 Q 88 70 82 85" stroke="#e3c16f" stroke-width="1.5" fill="none" />
          <!-- Transition : bague dorée -->
          <rect x="88" y="118" width="24" height="8" rx="2" fill="#d4a64a" stroke="#8e5e0e" stroke-width="1" />
          <!-- Corps crayon (partie basse) -->
          <rect x="90" y="126" width="20" height="42" rx="2" fill="#e3c16f" stroke="#d4a64a" stroke-width="1" />
          <!-- Pointe du crayon -->
          <polygon points="90,168 100,190 110,168" fill="#faf0d5" stroke="#d4a64a" stroke-width="1" />
          <!-- Mine -->
          <circle cx="100" cy="188" r="2" fill="#8e5e0e" />
          <!-- Tige plume -->
          <line x1="100" y1="18" x2="100" y2="118" stroke="#8e5e0e" stroke-width="2.5" stroke-linecap="round" />
        </svg>
        <span class="text-sm font-semibold text-stone-600">{{ variants[6] }}</span>
      </div>

      <!-- 8. Flamme — Barbes en flammes douces -->
      <div class="flex flex-col items-center gap-2">
        <svg viewBox="0 0 200 200" class="w-32 h-32" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="varGrad8" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#faf0d5" />
              <stop offset="50%" stop-color="#e3c16f" />
              <stop offset="100%" stop-color="#d4a64a" />
            </linearGradient>
            <linearGradient id="flameGrad" x1="50%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stop-color="#d4a64a" />
              <stop offset="60%" stop-color="#e3c16f" />
              <stop offset="100%" stop-color="#faf0d5" />
            </linearGradient>
          </defs>
          <!-- Corps de la plume -->
          <path
            d="M 100 30 Q 118 48 124 68 Q 130 88 126 108 Q 120 128 110 148 Q 105 160 100 172
               Q 95 160 90 148 Q 80 128 74 108 Q 70 88 76 68 Q 82 48 100 30 Z"
            fill="url(#varGrad8)" stroke="#e3c16f" stroke-width="1.5"
          />
          <!-- Tige -->
          <line x1="100" y1="30" x2="100" y2="185" stroke="#8e5e0e" stroke-width="3" stroke-linecap="round" />
          <!-- Barbes-flammes droites -->
          <path d="M 100 45 Q 118 48 128 40 Q 122 55 130 65 Q 118 62 115 68" fill="url(#flameGrad)" opacity="0.85" />
          <path d="M 100 72 Q 116 75 125 68 Q 120 82 126 90 Q 115 88 112 95" fill="url(#flameGrad)" opacity="0.8" />
          <path d="M 100 100 Q 114 102 120 95 Q 116 108 122 115 Q 112 112 110 120" fill="url(#flameGrad)" opacity="0.75" />
          <!-- Barbes-flammes gauches -->
          <path d="M 100 45 Q 82 48 72 40 Q 78 55 70 65 Q 82 62 85 68" fill="url(#flameGrad)" opacity="0.85" />
          <path d="M 100 72 Q 84 75 75 68 Q 80 82 74 90 Q 85 88 88 95" fill="url(#flameGrad)" opacity="0.8" />
          <path d="M 100 100 Q 86 102 80 95 Q 84 108 78 115 Q 88 112 90 120" fill="url(#flameGrad)" opacity="0.75" />
          <!-- Petites étincelles -->
          <circle cx="135" cy="45" r="1.5" fill="#e3c16f" opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.3s" repeatCount="indefinite" />
          </circle>
          <circle cx="60" cy="55" r="1.5" fill="#e3c16f" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.6s" repeatCount="indefinite" />
          </circle>
        </svg>
        <span class="text-sm font-semibold text-stone-600">{{ variants[7] }}</span>
      </div>
    </div>
  </div>
</template>
