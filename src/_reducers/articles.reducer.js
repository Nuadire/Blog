import { handleActions } from "redux-actions";
import {
  articlesRequest,
  articlesSuccess,
  articlesFailure,
  articleFavorited,
  articleUnfavorited,
  selectedArticleSuccess,
  createArticleSuccess,
  deleteArticlesSuccess,
  userLogout,
} from "../_actions/actions";

const toggleFavorites = (state, { payload }) => {
  return {
    ...state,
    selectedArticle: payload,
    articles:
      state.articles &&
      state.articles.map((article) => {
        if (article.slug === payload.slug) {
          return {
            ...article,
            favorited: payload.favorited,
            favoritesCount: payload.favoritesCount,
          };
        }
        return article;
      }),
  };
};

export const articlesReducer = handleActions(
  {
    [articlesRequest]: (state) => ({ ...state, loadingArticles: true }),
    [selectedArticleSuccess]: (state, { payload: { article } }) => ({
      ...state,
      selectedArticle: article,
      loadingArticles: false,
    }),
    [articlesSuccess]: (
      state,
      { payload: { articles, articlesCount, currentPage } }
    ) => ({
      ...state,
      currentPage,
      articles,
      articlesCount,
      loadingArticles: false,
    }),
    [createArticleSuccess]: (state, { payload: { article }}) => ({
      ...state,
      selectedArticle: article,
      loadingArticles: false,
    }),
    [deleteArticlesSuccess]: (state) => ({
      ...state,
      selectedArticle: null,
      loadingArticles: true,
    }),
    [articlesFailure]: (state) => ({ ...state, loadingArticles: false }),
    [articleFavorited]: toggleFavorites,
    [articleUnfavorited]: toggleFavorites,
    [userLogout]: ({ currentPage }) => ({ currentPage, loadingArticles: true }),
  },
  { currentPage: 0, loadingArticles: true }
);
