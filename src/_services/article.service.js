import { handleResponse } from "./common.service";
import { requestUrl } from "../_constants";

const getHeader = (token) => {
  const header = {
    "Content-Type": "application/json",
  };
  if (token) {
    header.authorization = `Token ${token}`;
  }
  return header;
};

export const article = {
  getArticles: (count, skip) => {
    const requestOptions = {
      method: "GET",
      headers: getHeader(),
    };
    return fetch(
      `${requestUrl.articles}?limit=${count}&offset=${skip ? skip * count : 0}`,
      requestOptions
    ).then(handleResponse);
  },
  createArticle: () => {
    const requestOptions = {
      method: "POST",
      headers: getHeader(),
    };
    return fetch(requestUrl.articles, requestOptions).then(handleResponse);
  },
  updateArticle: (slug, obj) => {
    const requestOptions = {
      method: "PUT",
      headers: getHeader(),
    };
    return fetch(
      `${requestUrl.articles}/articles/${slug}`,
      requestOptions
    ).then(handleResponse);
  },
  deleteArticle: (slug) => {
    const requestOptions = {
      method: "DELTE",
      headers: getHeader(),
    };
    return fetch(
      `${requestUrl.articles}/articles/${slug}`,
      requestOptions
    ).then(handleResponse);
  },
  favoriteArticle: (slug, token) => {
    const requestOptions = {
      method: "POST",
      headers: getHeader(token),
    };
    return fetch(
      `${requestUrl.articles}/${slug}/favorite`,
      requestOptions
    ).then(handleResponse);
  },
  unfavoriteArticle: (slug, token) => {
    const requestOptions = {
      method: "DELETE",
      headers: getHeader(token),
    };
    return fetch(
      `${requestUrl.articles}/${slug}/favorite`,
      requestOptions
    ).then(handleResponse);
  },
};
