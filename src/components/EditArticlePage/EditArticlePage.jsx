import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Form, Input, Button } from "antd";
import { createArticles, updateArticles, getArticle } from "../../_actions";
import { Spinner } from "../Spinner/Spinner";

const redirectToViewArticle = (history) => (rout) => history.push(rout);
const { TextArea } = Input;

class EditArticlePage extends React.Component {
  componentDidMount() {
    const {
      getArticleFunc,
      match: {
        params: { slug },
      },
    } = this.props;
    if (slug) {
      getArticleFunc(slug);
    }
  }

  onFinish = (values) => {
    const {
      createArticlesFunc,
      updateArticlesFunc,
      history,
      match: {
        params: { slug },
      },
    } = this.props;
    const redirect = redirectToViewArticle(history);
    if (slug) {
      updateArticlesFunc(slug, values, redirect);
    } else {
      createArticlesFunc(values, redirect);
    }
  };

  render() {
    let title;
    let initial;
    const {
      match: {
        params: { slug },
      },
      loadingArticles,
      selectedArticle,
    } = this.props;
    if (slug) {
      if (
        loadingArticles ||
        !selectedArticle ||
        selectedArticle.slug !== slug
      ) {
        return (
          <div className="spinner-container">
            <Spinner button="Loading..." />
          </div>
        );
      }
      title = "Edit article";
      initial = selectedArticle;
    } else {
      title = "Create new article";
      initial = {};
    }

    return (
      <div className="article-page">
        <h2 className="article-page__title">{title}</h2>

        <Form
          layout="vertical"
          name="form"
          onFinish={this.onFinish}
          initialValues={initial}
        >
          <Form.Item required label="Title" name="title">
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item required label="Short description" name="description">
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item required label="Text" name="body">
            <TextArea
              placeholder="Text"
              autoSize={{ minRows: 6, maxRows: 6 }}
            />
          </Form.Item>
          <Form.List name="tagList">
            {(fields, { add, remove }) => {
              return (
                <div className="article-page__tag tag">
                  {fields.map((field, index) => (
                    <Form.Item
                      label={index === 0 ? "Tags" : ""}
                      required={false}
                      key={field.key}
                      className="tag__row"
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        noStyle
                      >
                        <Input placeholder="Tag" className="tag__input" />
                      </Form.Item>
                      <Button
                        className="tag__btn-delete"
                        onClick={() => {
                          remove(field.name);
                        }}
                        danger
                      >
                        Delete
                      </Button>
                      {fields.length === index + 1 ? (
                        <Button
                          type="primary"
                          ghost
                          className="tag__btn-add tag__btn-add--row"
                          onClick={() => {
                            add();
                          }}
                        >
                          Add tag
                        </Button>
                      ) : null}
                    </Form.Item>
                  ))}
                  {fields.length === 0 ? (
                    <Form.Item>
                      <Button
                        type="primary"
                        ghost
                        className="tag__btn-add"
                        onClick={() => {
                          add();
                        }}
                      >
                        Add tag
                      </Button>
                    </Form.Item>
                  ) : null}
                </div>
              );
            }}
          </Form.List>

          <Form.Item noStyle>
            <Button
              type="primary"
              htmlType="submit"
              className="article-page__submit"
            >
              Send
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

EditArticlePage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  selectedArticle: PropTypes.object,
  loadingArticles: PropTypes.bool.isRequired,
  createArticlesFunc: PropTypes.func.isRequired,
  updateArticlesFunc: PropTypes.func.isRequired,
  getArticleFunc: PropTypes.func.isRequired,
};

EditArticlePage.defaultProps = {
  selectedArticle: null,
};

function mapState(state) {
  const {
    articlesReducer: { selectedArticle, loadingArticles },
  } = state;
  return { selectedArticle, loadingArticles };
}

const actionCreators = {
  createArticlesFunc: createArticles,
  updateArticlesFunc: updateArticles,
  getArticleFunc: getArticle,
};

const ConnectEditArticlePage = connect(
  mapState,
  actionCreators
)(EditArticlePage);
export { ConnectEditArticlePage as EditArticlePage };
