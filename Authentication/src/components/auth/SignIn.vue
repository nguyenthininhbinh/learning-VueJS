<template>
  <div class="container">
    <form action>
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <div class="form-group">
            <label for>Mail</label>
            <input type="text" class="form-control" v-model="email" />
          </div>
          <div class="form-group">
            <label for>Password</label>
            <input type="password" class="form-control" v-model="password" />
          </div>
          <button>Submit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        email: this.email,
        password: this.password,
      };
      console.log(formData);
      this.$store.dispatch("login", {
        email: formData.email,
        password: formData.password,
      });
    },
  },
};
</script>

<style>
</style>