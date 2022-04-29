import axios from "axios";

let baseURL: "http://localhost:8888" | "http://flog.pythonanywhere.com";
if (process.env.NODE_ENV === "development") {
  // this requires you to run a local server on localhost:5000.
  baseURL = "http://localhost:8888";
} else {
  baseURL = "http://flog.pythonanywhere.com";
}

baseURL += "/v4";

const flog = axios.create({
  baseURL,
  timeout: 3500,
});

export default flog;
