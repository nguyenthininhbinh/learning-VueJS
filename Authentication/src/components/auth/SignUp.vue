<template>
  <div class="container">
    <form action @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <div class="form-group">
            <label>Mail</label>
            <input type="text" class="form-control" v-model="email" />
          </div>
          <div class="form-group">
            <label for="age">Your Age</label>
            <input type="text" class="form-control" v-model.number="age" />
          </div>

          <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="password" />
          </div>
          <div class="form-group">
            <label>Confirm Password</label>
            <input type="password" class="form-control" v-model=" confirmpassword" />
          </div>
          <div class="form-group">
            <label for>Country</label>

            <select class="form-control" v-model="country">
              <option value="usa">USA</option>
              <option value="vietnam">Vietnam</option>
              <option value="cambodia">Cambodia</option>
              <option value="singapore">Singapore</option>
              <option value="japan">Japan</option>
              <option value="china">China</option>
            </select>
          </div>
          <div class="form-group">
            <strong>Add some Hobbies</strong>
            <br />
            <button class="button" @click="onAddHobby">Add Hobby</button>
            <div class="hobby-list">
              <div class="input" v-for="(hobbyInput, index) in hobbyInputs" :key="hobbyInput.id">
                <label :for="hobbyInput.id">Hobby #{{ index }}</label>
                <input type="text" :id="hobbyInput.id" v-model="hobbyInput.value" />
                <button @click="onDeleteHobby(hobbyInput.id)" type="button">X</button>
              </div>
            </div>
          </div>

          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" v-model="terms" />
            <label class="form-check-label">Accept Terms of Use</label>
          </div>

          <button type="submit">Submit</button>
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
      age: null,
      password: "",
      confirmpassword: "",
      country: "usa",
      hobbyInputs: [],
      terms: "",
    };
  },
  methods: {
    onAddHobby() {
      const newHobby = {
        id: Math.random() * Math.random * 1000,
        value: "",
      };
      this.hobbyInputs.push(newHobby);
    },
    onDeleteHobby(id) {
      this.hobbyInputs = this.hobbyInputs.filter((hobby) => hobby.id !== id);
    },
    onSubmit() {
      const formData = {
        email: this.email,
        age: this.age,
        password: this.password,
        confirmpassword: this.confirmpassword,
        country: this.country,
        hobbies: this.hobbyInputs.map((hobby) => hobby.value),
        terms: this.terms,
      };
      console.log(formData);
      this.$store.dispatch("signup", {
        email: formData.email,
        password: formData.password,
      });
    },
  },
};
</script>

<style>
.button {
  background: purple;
  color: #fff;
  padding: 7px 15px;
  border-radius: 7px;
}
</style>