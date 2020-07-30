import {
  articlesRequest,
  articlesSuccess,
  articlesFailure,
  articleFavorited,
  articleUnfavorited,
  alertError,
} from "./actions";
import { article } from "../_services";

export const getArticles = (skip) => async (dispatch) => {
  dispatch(articlesRequest());
  try {
    const response = await article.getArticles(10, skip);
    dispatch(articlesSuccess(response.articles));
  } catch (error) {
    dispatch(articlesFailure(error));
    dispatch(alertError(error.message));
  }
};

export const createArticles = (articleObj) => async (dispatch) => {
  dispatch(articlesRequest());
  try {
    const response = await article.createArticle(articleObj);
    dispatch(articlesSuccess(response.articles));
  } catch (error) {
    dispatch(articlesFailure(error));
    dispatch(alertError(error.message));
  }
};
export const updateArticles = (articleObj) => async (dispatch) => {
  dispatch(articlesRequest());
  try {
    const response = await article.updateArticle(articleObj);
    dispatch(articlesSuccess(response.articles));
  } catch (error) {
    dispatch(articlesFailure(error));
    dispatch(alertError(error.message));
  }
};
export const deleteArticles = (slug) => async (dispatch) => {
  dispatch(articlesRequest());
  try {
    const response = await article.deleteArticle(slug);
    dispatch(articlesSuccess(response.articles));
  } catch (error) {
    dispatch(articlesFailure(error));
    dispatch(alertError(error.message));
  }
};
export const favoritArticle = (slug, token) => async (dispatch) => {
  try {
    const response = await article.favoriteArticle(slug, token);
    dispatch(articleFavorited(response.article));
  } catch (error) {
    dispatch(alertError(error.message));
  }
};
export const unfavoritArticle = (slug, token) => async (dispatch) => {
  try {
    const response = await article.unfavoriteArticle(slug, token);
    dispatch(articleUnfavorited(response.article));
  } catch (error) {
    dispatch(alertError(error.message));
  }
};

