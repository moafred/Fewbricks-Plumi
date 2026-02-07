import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { initializeCapacitor } from './plugins/capacitor';
import './assets/main.css';

const app = createApp(App);
app.use(createPinia());

// Initialise Capacitor avant le montage (noop en mode web)
initializeCapacitor().then(() => {
  app.mount('#app');
});
