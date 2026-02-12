<script setup lang="ts">
defineProps<{
  id: string;
}>();

/**
 * Ce composant génère des visuels SVG pour les stickers Plumi.
 * Les stickers sont basés sur l'ID (ex: st-fr-1, st-math-1001).
 * On utilise des formes géométriques simples et colorées pour créer les animaux/objets.
 * Le composant remplit son conteneur parent — dimensionner via Tailwind sur le parent.
 */
</script>

<template>
  <div class="w-full h-full flex items-center justify-center pointer-events-none select-none">
    <!-- Chat (st-fr-1) -->
    <svg v-if="id === 'st-fr-1'" viewBox="0 0 100 100" class="w-full h-full">
      <circle cx="50" cy="55" r="35" fill="#C3DBFA" />
      <path d="M25 35 L35 15 L45 35 Z" fill="#C3DBFA" />
      <path d="M55 35 L65 15 L75 35 Z" fill="#C3DBFA" />
      <circle cx="40" cy="50" r="4" fill="#283F66" />
      <circle cx="60" cy="50" r="4" fill="#283F66" />
      <path d="M45 65 Q50 70 55 65" stroke="#283F66" fill="none" stroke-width="3" stroke-linecap="round" />
    </svg>

    <!-- Lapin (st-fr-2, st-math-1010) -->
    <svg v-else-if="id === 'st-fr-2' || id === 'st-math-1010'" viewBox="0 0 100 100" class="w-full h-full">
      <circle cx="50" cy="60" r="30" fill="#F4E0A8" />
      <ellipse cx="40" cy="25" rx="8" ry="20" fill="#F4E0A8" />
      <ellipse cx="60" cy="25" rx="8" ry="20" fill="#F4E0A8" />
      <circle cx="42" cy="55" r="3" fill="#5E3D16" />
      <circle cx="58" cy="55" r="3" fill="#5E3D16" />
      <path d="M48 65 L50 67 L52 65 Z" fill="#C95D45" />
    </svg>

    <!-- Hibou (st-fr-3, st-fr-15, st-math-1013) -->
    <svg v-else-if="id === 'st-fr-3' || id === 'st-fr-15' || id === 'st-math-1013'" viewBox="0 0 100 100" class="w-full h-full">
      <path d="M20 70 Q50 90 80 70 L80 30 Q50 10 20 30 Z" fill="#8DAA68" />
      <circle cx="40" cy="45" r="12" fill="white" />
      <circle cx="60" cy="45" r="12" fill="white" />
      <circle cx="40" cy="45" r="5" fill="#303A28" />
      <circle cx="60" cy="45" r="5" fill="#303A28" />
      <path d="M45 60 L50 70 L55 60 Z" fill="#D4A64A" />
    </svg>

    <!-- Oiseau (st-fr-4, st-fr-11, st-fr-12, st-math-1019) -->
    <svg v-else-if="id === 'st-fr-4' || id === 'st-fr-11' || id === 'st-fr-12' || id === 'st-math-1019'" viewBox="0 0 100 100" class="w-full h-full">
      <circle cx="50" cy="50" r="30" fill="#9AC4F6" />
      <path d="M75 45 L95 50 L75 55 Z" fill="#9AC4F6" />
      <path d="M25 50 L10 40 L15 60 Z" fill="#D4A64A" />
      <circle cx="60" cy="45" r="3" fill="#283F66" />
      <path d="M40 70 Q50 85 60 70" fill="none" stroke="#5A8FD4" stroke-width="2" />
    </svg>

    <!-- Ours (st-fr-5, st-fr-14, st-math-1002, st-math-1021) -->
    <svg v-else-if="id === 'st-fr-5' || id === 'st-fr-14' || id === 'st-math-1002' || id === 'st-math-1021'" viewBox="0 0 100 100" class="w-full h-full">
      <circle cx="50" cy="55" r="35" fill="#E3C16F" />
      <circle cx="30" cy="30" r="12" fill="#E3C16F" />
      <circle cx="70" cy="30" r="12" fill="#E3C16F" />
      <circle cx="40" cy="50" r="4" fill="#5E3D16" />
      <circle cx="60" cy="50" r="4" fill="#5E3D16" />
      <ellipse cx="50" cy="65" rx="10" ry="7" fill="#FDF9EF" opacity="0.5" />
      <circle cx="50" cy="63" r="3" fill="#5E3D16" />
    </svg>

    <!-- Ecureuil (st-fr-8, st-math-1004) -->
    <svg v-else-if="id === 'st-fr-8' || id === 'st-math-1004'" viewBox="0 0 100 100" class="w-full h-full">
      <circle cx="50" cy="60" r="28" fill="#F5A898" />
      <path d="M70 60 Q95 30 75 10 Q60 0 55 30 Z" fill="#F5A898" opacity="0.8" />
      <circle cx="42" cy="55" r="3" fill="#672F25" />
      <circle cx="58" cy="55" r="3" fill="#672F25" />
      <path d="M48 65 Q50 68 52 65" stroke="#672F25" fill="none" stroke-width="2" />
    </svg>

    <!-- Renard (st-fr-24, st-math-1001) -->
    <svg v-else-if="id === 'st-fr-24' || id === 'st-math-1001'" viewBox="0 0 100 100" class="w-full h-full">
      <path d="M50 20 L85 80 L15 80 Z" fill="#E07761" />
      <path d="M50 80 L85 80 L65 60 Z" fill="white" opacity="0.4" />
      <path d="M50 80 L15 80 L35 60 Z" fill="white" opacity="0.4" />
      <circle cx="40" cy="65" r="3" fill="#38150f" />
      <circle cx="60" cy="65" r="3" fill="#38150f" />
      <circle cx="50" cy="75" r="4" fill="#38150f" />
    </svg>

    <!-- Tortue (st-fr-13) -->
    <svg v-else-if="id === 'st-fr-13'" viewBox="0 0 100 100" class="w-full h-full">
      <ellipse cx="50" cy="60" rx="35" ry="25" fill="#2DA872" />
      <circle cx="80" cy="55" r="12" fill="#85DEB2" />
      <circle cx="85" cy="52" r="2" fill="#154833" />
      <path d="M30 80 L35 85" stroke="#154833" stroke-width="4" stroke-linecap="round" />
      <path d="M70 80 L65 85" stroke="#154833" stroke-width="4" stroke-linecap="round" />
    </svg>

    <!-- Éléphant (st-fr-14, st-math-1021) -->
    <svg v-else-if="id === 'st-fr-14' || id === 'st-math-1021'" viewBox="0 0 100 100" class="w-full h-full">
      <circle cx="50" cy="55" r="30" fill="#B6BBC5" />
      <ellipse cx="25" cy="45" rx="15" ry="20" fill="#B6BBC5" />
      <ellipse cx="75" cy="45" rx="15" ry="20" fill="#B6BBC5" />
      <path d="M50 60 Q50 85 40 85" stroke="#B6BBC5" stroke-width="12" fill="none" stroke-linecap="round" />
      <circle cx="42" cy="50" r="3" fill="#343740" />
      <circle cx="58" cy="50" r="3" fill="#343740" />
    </svg>

    <!-- Abeille / Insecte (st-fr-31, st-fr-32, st-math-1011) -->
    <svg v-else-if="id === 'st-fr-31' || id === 'st-fr-32' || id === 'st-math-1011'" viewBox="0 0 100 100" class="w-full h-full">
      <ellipse cx="50" cy="60" rx="20" ry="30" fill="#D4A64A" />
      <path d="M35 50 L65 50 M35 60 L65 60 M35 70 L65 70" stroke="#362009" stroke-width="4" />
      <ellipse cx="30" cy="45" rx="15" ry="10" fill="#DDEAFC" opacity="0.7" />
      <ellipse cx="70" cy="45" rx="15" ry="10" fill="#DDEAFC" opacity="0.7" />
      <circle cx="50" cy="30" r="12" fill="#362009" />
    </svg>

    <!-- Gâteau / Part (st-math-1017, st-math-1018) -->
    <svg v-else-if="id === 'st-math-1017' || id === 'st-math-1018'" viewBox="0 0 100 100" class="w-full h-full">
      <path d="M50 20 L90 80 L10 80 Z" fill="#F5A898" />
      <rect x="10" y="70" width="80" height="10" fill="#C95D45" />
      <circle cx="50" cy="20" r="8" fill="#C95D45" />
      <path d="M30 50 Q50 40 70 50" stroke="white" stroke-width="4" fill="none" opacity="0.6" />
    </svg>

    <!-- Horloge (st-math-1013) -->
    <svg v-else-if="id === 'st-math-1013'" viewBox="0 0 100 100" class="w-full h-full">
      <circle cx="50" cy="50" r="40" fill="white" stroke="#5A8FD4" stroke-width="5" />
      <path d="M50 50 L50 25 M50 50 L70 50" stroke="#283F66" stroke-width="4" stroke-linecap="round" />
      <circle cx="50" cy="50" r="3" fill="#283F66" />
      <rect x="48" y="10" width="4" height="6" fill="#5A8FD4" />
      <rect x="84" y="48" width="6" height="4" fill="#5A8FD4" />
      <rect x="48" y="84" width="4" height="6" fill="#5A8FD4" />
      <rect x="10" y="48" width="6" height="4" fill="#5A8FD4" />
    </svg>

    <!-- Monnaie (st-math-1014, st-math-1023) -->
    <svg v-else-if="id === 'st-math-1014' || id === 'st-math-1023'" viewBox="0 0 100 100" class="w-full h-full">
      <circle cx="50" cy="50" r="40" fill="#E3C16F" stroke="#D4A64A" stroke-width="4" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="#D4A64A" stroke-width="2" stroke-dasharray="4 4" />
      <text x="50" y="65" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="40" fill="#8E5E0E">€</text>
    </svg>

    <!-- Étoile par défaut (si ID non trouvé) -->
    <svg v-else viewBox="0 0 100 100" class="w-full h-full">
      <path d="M50 5 L64 35 L95 40 L72 62 L78 95 L50 80 L22 95 L28 62 L5 40 L36 35 Z" fill="#D4A64A" />
      <path d="M50 20 L58 38 L78 41 L63 55 L67 75 L50 65 L33 75 L37 55 L22 41 L42 38 Z" fill="#F4E0A8" opacity="0.5" />
    </svg>
  </div>
</template>
