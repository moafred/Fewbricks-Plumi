import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { initializeCapacitor } from './plugins/capacitor';
import './assets/main.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);

// Initialise Capacitor avant le montage (noop en mode web)
initializeCapacitor().then(() => {
  app.mount('#app');
});
