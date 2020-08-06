import { createAction } from "redux-actions";

export const alertSuccess = createAction("ALERT_SUCCESS");
export const alertError = createAction("ALERT_ERROR");
export const alertClear = createAction("ALERT_CLEAR");

export const userRegisterRequest = createAction("USERS_REGISTER_REQUEST");
export const userRegisterSuccess = createAction("USERS_REGISTER_SUCCESS");
export const userRegisterFailure = createAction("USERS_REGISTER_FAILURE");

export const userLoginRequest = createAction("USERS_LOGIN_REQUEST");
export const userLoginSuccess = createAction("USERS_LOGIN_SUCCESS");
export const userLoginFailure = createAction("USERS_LOGIN_FAILURE");

export const userLogout = createAction("USERS_LOGOUT");

export const articlesRequest = createAction("ARTICLES_REQUEST");
export const articlesSuccess = createAction("ARTICLES_SUCCESS");
export const articlesFailure = createAction("ARTICLES_FAILURE");

export const selectedArticleSuccess = createAction("SELECTED_ARTICLE_SUCCESS");
export const createArticleSuccess = createAction("CREATE_ARTICLES_SUCCESS");
export const deleteArticlesSuccess = createAction("DELETE_ARTICLES_SUCCESS");

export const articlesUpdateRequest = createAction("ARTICLE_UPDATE_REQUEST");
export const articlesUpdateSuccess = createAction("ARTICLE_UPDATE_SUCCESS");
export const articlesUpdateFailure = createAction("ARTICLE_UPDATE_FAILURE");

export const articleFavorited = createAction('ARTICLE_FAVORITED');
export const articleUnfavorited = createAction('ARTICLE_UNFAVORITED');