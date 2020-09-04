<template>
  <div class="dashboard">
    <h1>That's the dashboard!</h1>
    <p class="text-dashboard">You should only get here if you're authenticated!</p>
    <p v-if="email" class="text-dashboard">Your email address:{{email}}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  // data() {
  //   return {
  //     email: "",
  //   };
  // },
  computed: {
    email() {
      return !this.$store.getters.user ? false : this.$store.getters.user.email;
    },
  },
  created() {
    this.$store.dispatch("fetchUser");
  },
};
</script>

<style>
.text-dashboard {
  color: red;
  text-align: center;
}
.dashboard {
  text-align: center;
  line-height: 30px;
}
</style>