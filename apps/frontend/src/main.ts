import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { initializeCapacitor } from './plugins/capacitor';
import { initStorage } from './services/storage';
import './assets/main.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);

// Initialise Capacitor + Storage avant le montage
// Les stores Pinia lisent le cache sync au premier accès
initializeCapacitor()
  .then(() => initStorage())
  .then(() => {
    app.mount('#app');
  });
