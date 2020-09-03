import axios from "axios";

const instance = axios.create({
  baseURL: "https://pr-axios.firebaseio.com"
});

instance.defaults.headers.common["SOMETHING"] = "something";

export default instance;
