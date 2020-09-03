import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import { routes } from "./routes";
import store from "./components/store/store";

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.root = "https://final-ex-8f78d.firebaseio.com/";
Vue.filter("currency", value => {
  return "$" + value.toLocaleString();
});
const router = new VueRouter({
  mode: "history",
  //neu giong tren thi chi can routes
  routes
});
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
