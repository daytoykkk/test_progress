import axios from "axios"; // 引用axios
import config from "./config.js";

const instance = axios.create({
  baseURL: config.baseUrl.dev,
  timeout: 60000,
});
//get请求
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params: params,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
//post请求
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    instance.post(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

export function put(url, data = {}, token) {
  return new Promise((resolve, reject) => {
    instance.defaults.headers.common["token"] = token
    instance.defaults.headers["Content-Type"] = 'application/json'
    instance.put(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
