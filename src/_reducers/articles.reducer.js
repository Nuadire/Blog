import { handleActions } from "redux-actions";
import {
  articlesRequest,
  articlesSuccess,
  articlesFailure,
  articleFavorited,
  articleUnfavorited,
} from "../_actions/actions";

const toggleFavorites = (state, { payload }) => ({
  ...state,
  articles: state.articles.map((article) => {
    if (article.slug === payload.slug) {
      return {
        ...article,
        favorited: payload.favorited,
        favoritesCount: payload.favoritesCount,
      };
    }
    return article;
  }),
});

export const articlesReducer = handleActions(
  {
    [articlesRequest]: (state) => ({ ...state, loadingArticles: true }),
    [articlesSuccess]: (state, { payload: { articles, articlesCount, currentPage } }) => ({
      // ...state,
      currentPage,
      articles,
      articlesCount,
      loadingArticles: false,
    }),
    [articlesFailure]: (state) => ({...state, loadingArticles: false }),
    [articleFavorited]: toggleFavorites,
    [articleUnfavorited]: toggleFavorites,
  },
  { currentPage: 0, loadingArticles: true }
);
