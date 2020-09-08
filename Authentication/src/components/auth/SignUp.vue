<template>
  <div class="container">
    <form action @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <div class="form-group" :class="{invalid:$v.email.$error}">
            <label>Mail</label>
            <input
              type="text"
              id="email"
              class="form-control"
              v-model="email"
              @blur="$v.email.$touch()"
            />
            <p v-if="!$v.email.email">Please provide a valid email address.</p>
            <p v-if="!$v.email.required">This field must not be empty.</p>
          </div>
          <div class="form-group" :class="{invalid:$v.age.$error}">
            <label for="age">Your Age</label>
            <input
              type="number"
              id="age"
              class="form-control"
              v-model.number="age"
              @blur="$v.age.$touch()"
            />
            <p
              v-if="!$v.age.minVal"
            >Your have to be at least {{$v.age.$params.minVal.min}} year old.</p>
          </div>

          <div class="form-group" :class="{invalid:$v.password.$error}">
            <label>Password</label>
            <input
              type="password"
              class="form-control"
              v-model="password"
              @blur="$v.password.$touch()"
            />
            <p v-if="!$v.password.required">Password is required.</p>
            <p
              v-if="!$v.password.minLen"
            >Password must have at least {{ $v.password.$params.minLen.min }} letters.</p>
          </div>

          <div class="form-group" :class="{invalid:$v.confirmpassword.$error}">
            <label>Confirm Password</label>
            <input
              type="password"
              class="form-control"
              v-model=" confirmpassword"
              @blur="$v.confirmpassword.$touch()"
            />
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
          <div class="hobbies">
            <strong>Add some Hobbies</strong>
            <br />
            <button @click="onAddHobby" type="button" class="button">Add Hobby</button>
            <div class="hobby-list">
              <div
                class="form-group"
                v-for="(hobbyInput, index) in hobbyInputs"
                :class="{invalid: $v.hobbyInputs.$each[index].$error}"
                :key="hobbyInput.id"
              >
                <label :for="hobbyInput.id">Hobby #{{ index }}</label>
                <input
                  :id="hobbyInput.id"
                  @blur="$v.hobbyInputs.$each[index].value.$touch()"
                  v-model="hobbyInput.value"
                />
                <button @click="onDeleteHobby(hobbyInput.id)" class="button" type="button">X</button>
              </div>
              <p
                v-if="!$v.hobbyInputs.minLen"
              >Your have to specify at least {{$v.hobbyInputs.$params.minLen.min}} hobbies.</p>
              <p v-if="!$v.hobbyInputs.required">Please add hobbies</p>
            </div>
          </div>

          <div class="form-group form-check" :class="{invalid:$v.terms.$invalid}">
            <input
              type="checkbox"
              class="form-check-input"
              v-model="terms"
              @change="$v.terms.$touch()"
            />
            <label class="form-check-label">Accept Terms of Use</label>
          </div>
          <button class="btn btn-default navbar-btn" type="submit" :disabled="$v.$invalid">Submit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {
  email,
  required,
  numeric,
  minValue,
  minLength,
  sameAs,
  requiredUnless,
} from "vuelidate/lib/validators";
import axios from "axios";
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
  validations: {
    email: {
      email,
      required,
      unique: (val) => {
        if (val === "") return true;
        return axios
          .get('/users.json?orderBy="email"&equalTo="' + val + '"')
          .then((res) => {
            return Object.keys(res.data).length === 0;
          });
      },
    },
    age: {
      required,
      numeric,
      minVal: minValue(18),
    },
    password: {
      minLen: minLength(6),
      required,
    },
    confirmpassword: {
      // sameAs: sameAs("password"),
      //hoac minh tao function
      sameAs: sameAs((vm) => {
        return vm.password;
      }),
    },
    terms: {
      required: requiredUnless((vm) => {
        return vm.country === "vietnam";
      }),
    },
    hobbyInputs: {
      required,
      minLen: minLength(2),
      $each: {
        value: {
          required,
          minLen: minLength(5),
        },
      },
    },
  },
  methods: {
    onAddHobby() {
      const newHobby = {
        id: Math.random() * Math.random() * 1000,
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
      this.$store.dispatch("signup", formData);
    },
  },
};
</script>

<style>
.button {
  background: purple;
  color: #fff;
  padding: 3px 12px;
  border-radius: 7px;
}
.form-group.invalid input {
  border: 1px solid red;
  background-color: bisque;
}
.form-group.invalid label {
  color: red;
}
</style>