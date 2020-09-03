<template>
  <div class="home">
    <h1>Time to learn something new!</h1>
    <p>Your found the best place to learn - and now you're just one sign in(or sign up) away from it!</p>
    <div class="home_click">
      <ul class>
        <router-link to="/signUp">Sign Up</router-link>
        <router-link to="/signIn">Sign In</router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.home {
  text-align: center;
  width: 80%;
  margin: auto;
}
.home_click {
  width: 300px;
  margin: auto;
  text-align: center;
}
.home_click a {
  margin: 10px;
  text-decoration: none;
  display: inline-block;
  border: 1px solid #521751;
  border-radius: 3px;
  width: 100px;
  padding: 10px;
  box-sizing: border-box;
  color: #521751;
}
</style>