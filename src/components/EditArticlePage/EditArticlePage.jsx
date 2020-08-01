import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Form, Input, Button } from "antd";
import "./article-page.scss";
import "./tag.scss";

const { TextArea } = Input;

const EditArticlePage = ({ match, articles }) => {
  const onFinish = (values) => {
    debugger;
    console.log("Received values of form:", values);
  };

  const title = "Create new article"; // Edit article

  return (
    <div className="article-page">
      <h2 className="article-page__title">{title}</h2>

      <Form layout="vertical" name="form" onFinish={onFinish}>
        <Form.Item label="Title" name="title">
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item label="Short description" name="shortDescription">
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item label="Text" name="text">
          <TextArea placeholder="Text" autoSize={{ minRows: 6, maxRows: 6 }} />
        </Form.Item>
        <Form.List name="names">
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
};

EditArticlePage.propTypes= {
  // eslint-disable-next-line react/forbid-prop-types
  articles: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired
}

function mapState(state) {
  const {
    articlesReducer: { articles },
  } = state;
  return { articles };
}

const actionCreators = {};

const ConnectEditArticlePage = connect(
  mapState,
  actionCreators
)(EditArticlePage);
export { ConnectEditArticlePage as EditArticlePage };
