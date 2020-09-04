import Home from "./components/Home.vue";
import SignIn from "./components/auth/SignIn.vue";
import SignUp from "./components/auth/SignUp.vue";
import Dashboard from "./components/dashboard/Dashboard.vue";
import store from "./store";
export const routes = [
  { path: "/", component: Home },
  { path: "/signUp", component: SignUp },
  { path: "/signIn", component: SignIn },
  {
    path: "/dashboard",
    component: Dashboard,
    beforeEnter(to, from, next) {
      if (store.state.idToken) {
        next();
      } else {
        next("/signin");
      }
    }
  }
];
