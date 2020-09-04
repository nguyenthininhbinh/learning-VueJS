import Vue from "vue";
import Vuex from "vuex";
import axios from "./axios";
import globalaxios from "./axios";
import { routes } from "./routes";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null
  },
  mutations: {
    authUser(state, userData) {
      (state.idToken = userData.token), (state.userId = userData.userId);
    },
    storeUser(state, user) {
      state.user = user;
    },
    clearAuthData(state) {
      (state.idToken = null), (state.userId = null);
    }
  },
  actions: {
    setLogOutTimer({ commit }, expirationTime) {
      setTimeout(() => {
        commit("clearAuthData");
      }, expirationTime);
    },
    signup({ commit, dispatch }, authData) {
      axios
        .post("/accounts:signUp?key=AIzaSyD9bww1jZTvP3nHUfh7VxJGT4Z-NaM5t7M", {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          console.log(res);
          commit("authUser", {
            token: res.data.idToken,
            userId: res.data.localId
          });
          dispatch("storeUser", authData);
          dispatch("setLogOutTimer");
        })
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
    login({ commit, dispatch }, authData) {
      axios
        .post(
          "/accounts:signInWithPassword?key=AIzaSyD9bww1jZTvP3nHUfh7VxJGT4Z-NaM5t7M",
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          }
        )
        .then(res => {
          console.log(res);
          commit("authUser", {
            token: res.data.idToken,
            userId: res.data.localId
          });
          dispatch("setLogOutTimer", res.data.expirationTime);
        })
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
    logout({ commit }) {
      commit("clearAuthData");

      let routes = routes.replace("/signIn");
      // routes.replace("/signIn");
    },
    storeUser({ commit, state }, userData) {
      if (!state.idToken) {
        return;
      }
      globalaxios
        .post("/users.json" + "?auth=" + state.idToken, userData)
        .then(res => console.log(res))
        .catch(error => console.log(error));
    },
    fetchUser({ commit, state }) {
      if (!state.idToken) {
        return;
      }
      globalaxios
        .get("/users.json" + "?auth=" + state.idToken)
        .then(res => {
          console.log(res);
          const data = res.data;
          const users = [];
          for (let key in data) {
            const user = data[key];
            user.id = key;
            users.push(user);
          }
          console.log(users);
          commit("storeUser", users[0]);
        })
        .catch(error => console.log(error));
    }
  },
  getters: {
    user(state) {
      return state.user;
    }
  }
  // isAuthenticated(state) {
  //   return state.idToken !== null;
  // }
});
