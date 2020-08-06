import {
  articlesRequest,
  articlesSuccess,
  articlesFailure,
  articleFavorited,
  articleUnfavorited,
  selectedArticleSuccess,
  deleteArticlesSuccess,
  alertError,
} from "./actions";
import { ROUTS , LIMIT_ARTICLES_PAGE } from "../_constants";
import { article } from "../_services";


export const getChunkArticles = (skip) => async (dispatch) => {
  dispatch(articlesRequest());
  try {
    const response = await article.getChunkArticles(LIMIT_ARTICLES_PAGE, skip);
    dispatch(articlesSuccess({...response, currentPage: skip}));
  } catch (error) {
    dispatch(articlesFailure(error));
    dispatch(alertError(error.message));
  }
};
export const getArticle = (slug) => async (dispatch) => {
  dispatch(articlesRequest());
  try {
    const response = await article.getArticle(slug);
    dispatch(selectedArticleSuccess(response));
  } catch (error) {
    dispatch(articlesFailure(error));
    dispatch(alertError(error.message));
  }
};

export const createArticles = (values, redirect) => async (dispatch) => {
  dispatch(articlesRequest());
  try {
    const response = await article.createArticle(values);
    redirect(ROUTS.customFullTextArticle(response.article.slug));
    dispatch(articlesSuccess(response.article));
  } catch (error) {
    dispatch(selectedArticleSuccess(error));
    dispatch(alertError(error.message));
  }
};
export const updateArticles = (slug, values, redirect) => async (dispatch) => {
  dispatch(articlesRequest());
  try {
    const response = await article.updateArticle(slug, values);
    redirect(ROUTS.customFullTextArticle(response.article.slug));
    dispatch(selectedArticleSuccess(response.article));
  } catch (error) {
    dispatch(articlesFailure(error));
    dispatch(alertError(error.message));
  }
};
export const deleteArticles = (slug, redirect) => async (dispatch) => {
  dispatch(articlesRequest());
  try {
    await article.deleteArticle(slug);
    redirect();
    dispatch(deleteArticlesSuccess());
  } catch (error) {
    dispatch(articlesFailure(error));
    dispatch(alertError(error.message));
  }
};
export const favoritArticle = (slug) => async (dispatch) => {
  try {
    const response = await article.favoriteArticle(slug);
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

