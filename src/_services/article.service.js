import { handleResponse } from "./common.service";
import { requestUrl } from "../_constants";

let token = null;
const setToken = (newToken) => {
  token = newToken;
};

const getHeader = (type = "application/json") => {
  const header = {
    "Content-Type": type,
  };
  if (token) {
    header.authorization = `Token ${token}`;
  }
  return header;
};

const article = {
  getChunkArticles: (count, skip) => {
    const requestOptions = {
      method: "GET",
      headers: getHeader(),
    };
    return fetch(
      `${requestUrl.articles}?limit=${count}&offset=${skip ? skip * count : 0}`,
      requestOptions
    ).then(handleResponse);
  },
  getArticle: (slug) => {
    const requestOptions = {
      method: "GET",
      headers: getHeader(),
    };
    return fetch(`${requestUrl.articles}/${slug}`, requestOptions).then(
      handleResponse
    );
  },
  createArticle: (values) => {
    const requestOptions = {
      method: "POST",
      headers: getHeader(),
      body: JSON.stringify({ article: values }),
    };
    return fetch(requestUrl.articles, requestOptions).then(handleResponse);
  },
  updateArticle: (slug, values) => {
    const requestOptions = {
      method: "PUT",
      headers: getHeader(),
      body: JSON.stringify({ article: values }),
    };
    return fetch(`${requestUrl.articles}/${slug}`, requestOptions).then(
      handleResponse
    );
  },
  deleteArticle: (slug) => {
    const requestOptions = {
      method: "DELETE",
      headers: getHeader("text/plain"),
      mode: "cors",
    };
    return fetch(`${requestUrl.articles}/${slug}`, requestOptions).then(
      handleResponse
    );
  },
  favoriteArticle: (slug) => {
    const requestOptions = {
      method: "POST",
      headers: getHeader(),
    };
    return fetch(
      `${requestUrl.articles}/${slug}/favorite`,
      requestOptions
    ).then(handleResponse);
  },
  unfavoriteArticle: (slug) => {
    const requestOptions = {
      method: "DELETE",
      headers: getHeader(),
    };
    return fetch(
      `${requestUrl.articles}/${slug}/favorite`,
      requestOptions
    ).then(handleResponse);
  },
};

export { article, setToken };
