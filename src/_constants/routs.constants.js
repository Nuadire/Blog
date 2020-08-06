export const ROUTS = {
  home: "/",
  createArticle: "/add",
  fullTextArticle: `/articles/:slug`,
  customFullTextArticle: (slug) => `/articles/${slug}`,
  editArticle: `/articles/:slug/edit`,
  login: "/login",
  signUp: "/signup",
};
