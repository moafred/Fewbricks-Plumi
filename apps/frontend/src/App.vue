<script setup lang="ts">
import { CONJUGATIONS } from '@plumi/shared';

const etre = CONJUGATIONS.find(v => v.id === 'etre');
const avoir = CONJUGATIONS.find(v => v.id === 'avoir');
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-950 text-white flex flex-col items-center justify-center p-8">
    <h1 class="text-4xl md:text-6xl font-bold text-amber-300 mb-4">
      Plumi
    </h1>
    <p class="text-lg md:text-xl text-purple-200 mb-12">
      La Plume Magique
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl w-full">
      <div
        v-if="etre"
        class="bg-white/10 backdrop-blur rounded-2xl p-6"
      >
        <h2 class="text-2xl font-bold text-emerald-300 mb-4">
          {{ etre.infinitive }}
        </h2>
        <ul class="space-y-2">
          <li
            v-for="form in etre.forms"
            :key="form.pronoun"
            class="text-lg"
          >
            <span class="text-purple-300">{{ form.pronoun }}</span>
            <span class="text-amber-200 ml-2 font-semibold">{{ form.form }}</span>
          </li>
        </ul>
      </div>

      <div
        v-if="avoir"
        class="bg-white/10 backdrop-blur rounded-2xl p-6"
      >
        <h2 class="text-2xl font-bold text-emerald-300 mb-4">
          {{ avoir.infinitive }}
        </h2>
        <ul class="space-y-2">
          <li
            v-for="form in avoir.forms"
            :key="form.pronoun"
            class="text-lg"
          >
            <span class="text-purple-300">{{ form.pronoun }}</span>
            <span class="text-amber-200 ml-2 font-semibold">{{ form.form }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
