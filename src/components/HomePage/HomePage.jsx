import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import cn from 'classnames'
import { LIMIT_ARTICLES_PAGE, COUNT_BUTTONS_PAGE } from "../../_constants";
import { getArticles } from "../../_actions";
import { ArticleNote } from "../ArticleNote/ArticleNote";
import { Spinner } from "../Spinner/Spinner";
import "./HomePage.scss";


const getCountPage = (articlesCount, limitArticle) => Math.ceil(articlesCount / limitArticle);
const generateArrButtonPage = (startNumber, quantity) => {
  const arr = [];
  while (quantity) {
    arr.push(startNumber);
    startNumber++;
    quantity--;
  }
  return arr;
}
const getArrDisplayedPage = (currentPage, countPage, countButtonPage) => {
  if (countPage < countButtonPage) return generateArrButtonPage(0, countPage);
  const borderEnd = countPage - countButtonPage;  
  if (currentPage > borderEnd) {
    return generateArrButtonPage(borderEnd, countButtonPage);
  }
  const borderStart = Math.floor(countButtonPage / 2);
  if (currentPage > borderStart) {
    return generateArrButtonPage(currentPage -  borderStart, countButtonPage);
  }
  return generateArrButtonPage(0, countButtonPage);
}

class HomePage extends React.PureComponent {
  componentDidMount() {
    const { getArticlePage, currentPage } = this.props;
    getArticlePage(currentPage);
  }

  handleNumberPage = (numberPage) => () => {
    const { currentPage, getArticlePage } = this.props;
    if (currentPage === numberPage) return;
    getArticlePage(numberPage);
  }

  handlePrevPage = () => {
    const { currentPage, getArticlePage } = this.props;
    if (currentPage === 0) return;
    getArticlePage(currentPage - 1);
  }

  handleNextPage = () => {
    const { currentPage, getArticlePage, articlesCount, limitArticle } = this.props;
    if (currentPage === getCountPage(articlesCount, limitArticle)) return;
    getArticlePage(currentPage + 1);
  }

  render() {
    const {
      articles,
      loadingArticles,
      currentPage,
      articlesCount,
      limitArticle,
      countButtonPage
    } = this.props;

    if (loadingArticles) {
      return (
        <div className="spinner-container">
          <Spinner button="Loading..." />
        </div>
      );
    }
    const countPage = getCountPage(articlesCount, limitArticle);
    const canGoNext = currentPage + 1 === countPage;
    const canGoPrev = currentPage === 0;
    const arrDisplayedPage = getArrDisplayedPage(currentPage, countPage, countButtonPage);
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
        <div className="navigation">
          <button
            disabled={canGoPrev}
            onClick={this.handlePrevPage}
            type="button"
            className="navigation__left"
            aria-label="left arrow"
          />
          {
            arrDisplayedPage.map(pageNumber => {
              const btnClass = cn({
                "navigation__number": true,
                "navigation__number--active": currentPage === pageNumber
              });
              return (
                <button key={pageNumber} onClick={this.handleNumberPage(pageNumber)}
                  type="button"
                  className={btnClass}
                >
                  {pageNumber + 1}
                </button>
              );
            })
          }
          <button
            disabled={canGoNext}
            onClick={this.handleNextPage}
            type="button"
            className="navigation__right"
            aria-label="right arrow"
          />
        </div>
      </>
    );
  }
}
HomePage.propTypes = {
  getArticlePage: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  articles: PropTypes.array,
  loadingArticles: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  articlesCount: PropTypes.number,
  limitArticle: PropTypes.number.isRequired,
  countButtonPage: PropTypes.number.isRequired,
};

HomePage.defaultProps = {
  articles: [],
  articlesCount: 0,
};

function mapState(state) {
  const {
    articlesReducer: { articles, currentPage, articlesCount, loadingArticles },
    authentication: { loggedIn },
  } = state;
  return {
    articles, currentPage, articlesCount, loadingArticles, loggedIn,
    limitArticle: LIMIT_ARTICLES_PAGE,
    countButtonPage: COUNT_BUTTONS_PAGE
  };
}

const actionCreators = { getArticlePage: getArticles };

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
