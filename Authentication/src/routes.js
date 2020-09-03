import Home from "./components/Home.vue";
import SignIn from "./components/auth/SignIn.vue";
import SignUp from "./components/auth/SignUp.vue";
import Dashboard from "./components/dashboard/Dashboard.vue";

export const routes = [
  { path: "/", component: Home },
  { path: "/signUp", component: SignUp },
  { path: "/signIn", component: SignIn },
  { path: "/dashboard", component: Dashboard }
];
