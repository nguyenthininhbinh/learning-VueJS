<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <router-link to="/" class="navbar-brand">Vue-Complete Guide</router-link>
      </div>

      <div class="collapse navbar-collapse">
        <!-- <ul class="nav navbar-nav navbar-right">
          <router-link to="/signUp" tag="li" v-if="!auth" active-class="active">
            <a>SignUp</a>
          </router-link>
          <router-link to="/signIn" tag="li" v-if="!auth" active-class="active">
            <a>SignIn</a>
          </router-link>
          <router-link to="/dashboard" tag="li" v-if="auth" active-class="active">
            <a>Dashboard</a>
          </router-link>
          <button
            @click="onLogout"
            type="button"
            v-if="auth"
            class="btn btn-default navbar-btn"
          >LogOut</button>
        </ul>-->
        <ul class="nav navbar-nav navbar-right">
          <router-link to="/signUp" tag="li" active-class="active">
            <a>SignUp</a>
          </router-link>
          <router-link to="/signIn" tag="li" active-class="active">
            <a>SignIn</a>
          </router-link>
          <router-link to="/dashboard" tag="li" active-class="active">
            <a>Dashboard</a>
          </router-link>
          <button @click="onLogout" type="button" class="btn btn-default navbar-btn">LogOut</button>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  // computed: {
  //   auth() {
  //     return this.$store.getters.isAuthenticated;
  //   },
  // },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style>
body {
  padding: 30px;
}
</style>