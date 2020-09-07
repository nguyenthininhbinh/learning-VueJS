import Vue from "vue";
import App from "./App.vue";
// import VueRouter from "vue-router";
// import { routes } from "./routes";
import store from "./store";
import axios from "axios";
import router from "./routes";

axios.defaults.baseURL = "https://pr-axios.firebaseio.com";
// axios.defaults.headers.common["Authorization"] = "abc";
axios.defaults.headers.get["Accepts"] = "application/json";

const reqInterceptor = axios.interceptors.request.use(config => {
  console.log("Request Interceptor", config);
  return config;
});
const resInterceptor = axios.interceptors.response.use(res => {
  console.log("Response Interceptor", res);
  return res;
});

axios.interceptors.request.eject(reqInterceptor);
axios.interceptors.response.eject(resInterceptor);
// Vue.use(VueRouter);
// const router = new VueRouter({
//   mode: "history",
//   store,
//   routes
// });

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});
