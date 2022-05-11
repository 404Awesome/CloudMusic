import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "plyr/dist/plyr.css";
import "./assets/css/base.css";

let app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
