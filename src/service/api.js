import axios from "axios";
require("dotenv").config();
console.log(process.env); // як записати в env API_KEY?

const API_KEY = "d335026227984500a8905e832ae515ac";

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
