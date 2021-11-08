import axios from "axios";
require("dotenv").config();

const API_KEY = process.env.REACT_APP_API_KEY;

axios.defaults.baseURL = "https://newsapi.org/v2/";

const setParams = (params) =>
  (axios.defaults.params = { apiKey: API_KEY, ...params });

export const getPictures = (query, page) => {
  setParams({
    q: query,
    per_page: 12,
    page,
  });

  return axios
    .get(`everything`)
    .then(({ data }) => {
      const images = data.articles.map((item) => {
        return {
          title: item.title,
          url: item.urlToImage,
        };
      });
      return images;
    })
    .catch((err) => {
      throw err;
    });
};
