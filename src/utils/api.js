import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY

const api = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1',
    headers: {
      accept: 'application/json',
    },
  });

api.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  
 
  api.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  
  export default api;