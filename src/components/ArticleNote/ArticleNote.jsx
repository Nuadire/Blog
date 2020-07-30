import React from "react";
import { Button } from "antd";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import heart from "./Heart_transparent.png";
import { Like } from "../Like/Like";
import "./ArticleNote.scss";

const ArticleNote = ({ title, favoritesCount, tagList, description, author, slug, favorited }) => {
  return (
    <div className="article-note">
      <div className="article-note__text-wrapper">
        <div className="article-note__title-wrapper">
          <h2 className="article-note__title"><Link to={`/articles/${slug}`}>{title}</Link></h2>
          <Like favorited={favorited} favoritesCount={favoritesCount} slug={slug} />
        </div>
        <div className="article-note__tags">
          {tagList.map((tag) => (
            <Button key={tag} className="article-note__tag" size="small">{tag}</Button>
          ))}
        </div>
        <div className="article-note__description">
          {description}
        </div>
      </div>
      <div className="article-note__author">
        <div className="article-note__author-name">{author.username}</div>
        <div className="article-note__date">{12345}</div>
      </div>
      <img className="article-note__photo" src={author.image} alt="avatar" />

    </div>
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
    username: PropTypes.string
  }).isRequired,
  favorited: PropTypes.bool.isRequired,
};

export { ArticleNote };
