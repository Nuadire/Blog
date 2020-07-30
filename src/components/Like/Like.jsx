import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { favoritArticle, unfavoritArticle } from "../../_actions";
import "./Like.scss";

class Like extends React.PureComponent {
  toggleFavorites = () => {
    const { favorited, slug, unfavorit, favorit, userToken } = this.props;
    if (favorited) {
      unfavorit(slug, userToken);
    } else {
      favorit(slug, userToken);
    }
  };

  render() {
    const { favorited, favoritesCount, isPublic } = this.props;
    return (
      <label className="like">
        {isPublic ? (
          <input
            type="checkbox"
            className="like__checkbox-hide"
            checked={false}
            readOnly
          />
        ) : (
          <input
            type="checkbox"
            className="like__checkbox-hide"
            checked={favorited}
            onChange={this.toggleFavorites}
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
  isPublic: PropTypes.bool.isRequired,
  favoritesCount: PropTypes.number,
  slug: PropTypes.string.isRequired,
  userToken: PropTypes.string,
};

Like.defaultProps = {
  userToken: "",
  favoritesCount: 0,
};

function mapState(state) {
  const { user } = state.authentication;
  if (user) {
    return {
      isPublic: false,
      userToken: user.token,
    };
  }
  return {
    isPublic: false,
  };
}

const actionCreator = {
  favorit: favoritArticle,
  unfavorit: unfavoritArticle,
};

const connectedLike = connect(mapState, actionCreator)(Like);
export { connectedLike as Like };
