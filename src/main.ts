import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./assets/css/base.css";
import "plyr/dist/plyr.css";

let app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount("#app");
