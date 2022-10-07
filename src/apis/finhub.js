import React from "react";
import { useEffect } from "react";
import axios from "axios";

const token = "ccvdroqad3i3vkhgi53gccvdroqad3i3vkhgi540";

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: token,
  },
});
