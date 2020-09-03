import Vue from "vue";
import Vuex from "vuex";
import axios from "./axios";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null
  },
  mutations: {},
  actions: {
    signup({ commit }, authData) {
      axios
        .post("/accounts:signUp?key=AIzaSyD9bww1jZTvP3nHUfh7VxJGT4Z-NaM5t7M", {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => console.log(res))
        .catch(error => {
          if (error.response) {
            console.log(error.response.data);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    },
    login({ commit }, authData) {
      axios
        .post(
          "/accounts:signInWithPassword?key=AIzaSyD9bww1jZTvP3nHUfh7VxJGT4Z-NaM5t7M",
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          }
        )
        .then(res => console.log(res))
        .catch(error => {
          if (error.response) {
            console.log(error.response.data);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    }
  },
  getters: {}
});
