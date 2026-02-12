<script setup lang="ts">
import NotebookCard from '@/components/ui/NotebookCard.vue';

/**
 * ParentGuideContent — Contenu réutilisable du guide parent
 *
 * Utilisé dans ParentGuideScreen (premier lancement) et ParentGuideModal (accès permanent)
 */
</script>

<template>
  <div class="flex flex-col gap-6 md:gap-8 w-full">
    <!-- Section 1 : Introduction -->
    <NotebookCard variant="light" padding="lg" rounded="lg" class="animate-slide-down">
      <div class="flex flex-col gap-4 text-left">
        <h2 class="text-xl md:text-2xl font-bold text-sky-700">
          Plumi, c'est quoi ?
        </h2>
        <p class="text-base md:text-lg text-stone-700 leading-relaxed">
          Plumi propose des cahiers d'exercices interactifs pour s'entraîner en français et en mathématiques, niveau CE1. Ce ne sont pas des cours : votre enfant découvre des exercices pour <strong>pratiquer</strong> et <strong>consolider</strong> ce qu'il apprend à l'école ou avec vous.
        </p>
        <p class="text-base md:text-lg text-stone-700 leading-relaxed">
          Si votre enfant découvre une notion pour la première fois (par exemple, la conjugaison du verbe "être" au présent), il risque de se sentir perdu. C'est normal ! Plumi n'est pas là pour enseigner de zéro, mais pour s'entraîner sur des notions déjà vues.
        </p>
      </div>
    </NotebookCard>

    <!-- Section 2 : Conseils d'accompagnement -->
    <NotebookCard variant="light" padding="lg" rounded="lg" class="animate-slide-down" style="animation-delay: 150ms">
      <div class="flex flex-col gap-4 text-left">
        <h2 class="text-xl md:text-2xl font-bold text-sky-700">
          Comment accompagner votre enfant ?
        </h2>
        <div class="flex flex-col gap-3 text-base md:text-lg text-stone-700 leading-relaxed">
          <p>
            <strong>• Restez à côté, surtout au début.</strong> Votre enfant rencontre une notion peu maîtrisée ? Prenez le temps d'expliquer, de donner des exemples, de rassurer. Plumi encourage toujours, jamais de punition ni de chronomètre stressant.
          </p>
          <p>
            <strong>• Sessions courtes et régulières.</strong> 10 à 15 minutes par jour, c'est plus efficace qu'une heure le week-end. Votre enfant progresse par répétition espacée : les exercices reviennent naturellement.
          </p>
          <p>
            <strong>• Célébrez les progrès, même petits.</strong> Chaque étoile gagnée, chaque chapitre terminé mérite des encouragements. L'erreur est une étape d'apprentissage, pas un échec.
          </p>
        </div>
        <p class="text-base md:text-lg text-stone-700 leading-relaxed italic">
          Votre rôle est essentiel : vous êtes le guide, Plumi est l'outil d'entraînement.
        </p>
      </div>
    </NotebookCard>
  </div>
</template>
