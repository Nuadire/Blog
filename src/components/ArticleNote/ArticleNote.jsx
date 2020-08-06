import React from "react";
import { Button, Popconfirm } from "antd";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { formatDistanceToNowStrict } from 'date-fns';
import { ru } from 'date-fns/locale'
import { Like } from "../Like/Like";
import { deleteArticles } from "../../_actions";
import { ROUTS } from "../../_constants";

const redirectToPage = (history, rout) => () => history.push(rout);

const ArticleNote = ({
  title,
  favoritesCount,
  tagList,
  description,
  author,
  slug,
  favorited,
  isMyArticle,
  deleteArticlesFunc,
  history,
  homeRout,
  createdAt
}) => {
  function confirmDelete() {
    deleteArticlesFunc(slug, redirectToPage(history, homeRout));
  }
  const dateCreate = new Date(createdAt);
  const formattedInterval = formatDistanceToNowStrict(dateCreate, {locale: ru});
  return (
    <>
      <div className="article-note__text-wrapper">
        <div className="article-note__title-wrapper">
          <h2 className="article-note__title">
            <Link to={`/articles/${slug}`}>{title}</Link>
          </h2>
          <Like
            favorited={favorited}
            favoritesCount={favoritesCount}
            slug={slug}
          />
          
        </div>
        <div className="article-note__date">{`Создана ${formattedInterval} назад`}</div>
        <div className="article-note__tags">
          {tagList.map((tag) => (
            <Button key={tag} className="article-note__tag" size="small">
              {tag}
            </Button>
          ))}
        </div>
      </div>
      <div className="article-note__author">
        <div title={author.username} className="article-note__author-name">{author.username}</div>
        {/* <div className="article-note__date">{`Создана ${formattedInterval} назад`}</div> */}
      </div>
      <img className="article-note__photo" src={author.image} alt="avatar" />
      <p className="article-note__description">{description}</p>
      {isMyArticle && (
        <div className="article-note__control">
          <Popconfirm
            title="Are you sure delete this article?"
            placement="right"
            onConfirm={confirmDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button
              className="article-note__delete"
              danger
            >
              Delete
            </Button>
          </Popconfirm>
          <Link className="article-note__edit" to={`/articles/${slug}/edit`}>
            Edit
          </Link>
        </div>
      )}
    </>
  );
};
ArticleNote.propTypes = {
  title: PropTypes.string.isRequired,
  favoritesCount: PropTypes.number.isRequired,
  tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  author: PropTypes.shape({
    image: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  favorited: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  homeRout: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  isMyArticle: PropTypes.bool,
  deleteArticlesFunc: PropTypes.func,
};

ArticleNote.defaultProps = {
  deleteArticlesFunc: () => {},
  isMyArticle: false,
};

const mapState = () => {
  return {
    homeRout: ROUTS.home,
  };
};

const actionCreators = {
  deleteArticlesFunc: deleteArticles,
};

const ConnectArticleNote = connect(mapState, actionCreators)(ArticleNote);
const withRouterConnectArticleNote = withRouter(ConnectArticleNote);
export { withRouterConnectArticleNote as ArticleNote };
