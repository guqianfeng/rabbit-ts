import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { createPinia } from "pinia";

// import XtxSkeleton from '@/components/skeleton/index.vue'

import XtxUi from "@/components/index";

import "normalize.css";
import "@/assets/styles/common.less";

const app = createApp(App);
// app.component('XtxSkeleton', XtxSkeleton)
app.use(XtxUi);
app.use(router);
app.use(createPinia());
app.mount("#app");
