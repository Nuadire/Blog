import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { favoritArticle, unfavoritArticle } from "../../_actions";

class Like extends React.PureComponent {
  toggleFavorites = () => {
    const { favorited, slug, unfavorit, favorit, loggedIn } = this.props;
    if (!loggedIn) {
      return;
    }
    if (favorited) {
      unfavorit(slug);
    } else {
      favorit(slug);
    }
  };

  render() {
    const { favorited, favoritesCount, loggedIn } = this.props;
    return (
      <label className="like">
        {loggedIn ? (
          <input
            type="checkbox"
            className="like__checkbox-hide"
            checked={favorited}
            onChange={this.toggleFavorites}
          />
        ) : (
          <input
            type="checkbox"
            className="like__checkbox-hide"
            checked={false}
            readOnly
          />
        )}
        <span className="like__icon" />
        {favoritesCount}
      </label>
    );
  }
}

Like.propTypes = {
  favorited: PropTypes.bool.isRequired,
  favorit: PropTypes.func.isRequired,
  unfavorit: PropTypes.func.isRequired,
  favoritesCount: PropTypes.number,
  slug: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

Like.defaultProps = {
  favoritesCount: 0,
};

function mapState(state) {
  const { loggedIn } = state.authentication;
  return {
    loggedIn,
  };
}

const actionCreator = {
  favorit: favoritArticle,
  unfavorit: unfavoritArticle,
};

const connectedLike = connect(mapState, actionCreator)(Like);
export { connectedLike as Like };
