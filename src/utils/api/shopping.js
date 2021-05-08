const axios = require("axios");

exports.axios = axios.create({ baseURL: "http://localhost:4000" });
