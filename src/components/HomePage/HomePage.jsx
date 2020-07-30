import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getArticles } from "../../_actions";
import { ArticleNote } from "../ArticleNote/ArticleNote";
import { Spinner } from "../Spinner/Spinner";
import "./HomePage.scss";

class HomePage extends React.PureComponent {
  componentDidMount() {
    const { getAllActions } = this.props;
    getAllActions();
  }

  render() {
    const { articles, loadingArticles } = this.props;
    if (loadingArticles) {
      return (
        <div className="spinner-container">
          <Spinner text="Loading..." />
        </div>
      );
    }
    return (
      <>
        {articles &&
          articles.map((article) => {
            return (
              <ArticleNote
                key={article.slug}
                {...article}
                changeLike={this.changeLike}
              />
            );
          })}
      </>
    );
  }
}
HomePage.propTypes = {
  // user: PropTypes.shape({ username: PropTypes.string }).isRequired,
  getAllActions: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  articles: PropTypes.array,
  loadingArticles: PropTypes.bool,
};

HomePage.defaultProps = {
  loadingArticles: true,
  articles: [],
};

function mapState(state) {
  const {
    articlesReducer: { articles, loadingArticles },
    authentication: { loggedIn },
  } = state;
  return { articles, loggedIn, loadingArticles };
}

const actionCreators = { getAllActions: getArticles };

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
