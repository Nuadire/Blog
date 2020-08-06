import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ArticleNote } from "../ArticleNote/ArticleNote";
import { getArticle } from "../../_actions";
import { Spinner } from "../Spinner/Spinner";

class ViewArticlePage extends React.PureComponent {
  componentDidMount() {
    const {
      getArticleFunc,
      match: {
        params: { slug },
      },
    } = this.props;
    getArticleFunc(slug);
  }

  render() {
    const {
      username,
      selectedArticle,
      loadingArticles,
      match: {
        params: { slug },
      },
    } = this.props;

    if (loadingArticles || !selectedArticle || selectedArticle.slug !== slug) {
      return (
        <div className="spinner-container">
          <Spinner button="Loading..." />
        </div>
      );
    }
    const isMyArticle = username === selectedArticle.author.username;
    return (
      <div className="view-article">
        <ArticleNote isMyArticle={isMyArticle} {...selectedArticle} />
        {selectedArticle.body && (
          <div className="view-article__body">{selectedArticle.body}</div>
        )}
      </div>
    );
  }
}

ViewArticlePage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  selectedArticle: PropTypes.object,
  username: PropTypes.string.isRequired,
  loadingArticles: PropTypes.bool.isRequired,
  getArticleFunc: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

ViewArticlePage.defaultProps = {
  selectedArticle: null
}

function mapState(state) {
  const {
    articlesReducer: { selectedArticle, loadingArticles },
    authentication: { user },
  } = state;
  return {
    selectedArticle,
    loadingArticles,
    username: user ? user.username : "",
  };
}

const actionCreators = {
  getArticleFunc: getArticle,
};

const ConnectEditArticlePage = connect(
  mapState,
  actionCreators
)(ViewArticlePage);
export { ConnectEditArticlePage as ViewArticlePage };
