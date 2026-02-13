import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { initializeCapacitor } from './plugins/capacitor';
import { initStorage } from './services/storage';
import './assets/main.css';

const app = createApp(App);
app.use(createPinia());

// Initialise Capacitor + Storage avant le montage du router
// Router enregistré APRÈS storage init pour garantir cache peuplé
// Évite le race condition où les stores lisent un cache vide
initializeCapacitor()
  .then(() => initStorage())
  .then(() => {
    app.use(router);
    app.mount('#app');
  });
