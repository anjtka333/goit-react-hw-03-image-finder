import axios from "axios";
const API_KEY = "23779410-abe809331958b49ace969e642";

axios.defaults.baseURL = "https://pixabay.com/api/";

const setParams = (params) =>
  (axios.defaults.params = { key: API_KEY, ...params });

export const getPictures = (query = "cat", page = 1) => {
  setParams({
    q: query,
    per_page: 12,
    page,
  });
  return axios
    .get()
    .then(({ data }) => data)
    .catch((err) => {
      throw err;
    });
};
