import axios from "axios";

let baseURL: "http://127.0.0.1:5000" | "http://flog.flask.fun";
if (process.env.NODE_ENV === "development") {
    // this requires you to run a local server on localhost:5000.
    baseURL = "http://127.0.0.1:5000";
} else {
    baseURL = "http://flog.flask.fun";
}

const flog = axios.create({
    baseURL,
    timeout: 3500,
});

export default flog;
