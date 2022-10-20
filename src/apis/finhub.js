import React from "react";
import { useEffect } from "react";
import axios from "axios";

const token = "<your-rapid-API>";

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: token,
  },
});
