import React from "react";
import dayjs from "dayjs";
import "./styles/article.css";

/**
 * Article Interface
 */
export interface IArticle {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: Date;
  content: string | null;
}

/**
 * Article component
 */
class Article extends React.Component<IArticle> {
  render() {
    return (
      <div className="article">
        <div className="article-header">
          <h2 className="article-title">{this.props.title}</h2>
          <a className="article-date">
            {dayjs(this.props.publishedAt).format("DD/MM/YYYY HH:mm UTC Z")}
          </a>
          <a className="article-author">{this.props.author}</a>
        </div>
        <div className="article-image">
          {this.props.urlToImage ? (
            <img
              title={this.props.title}
              src={this.props.urlToImage}
              alt={this.props.description ? this.props.description : ""}
            />
          ) : null}
        </div>
        <div className="article-description">
          <a>{this.props.description}</a>
        </div>
        <div className="article-content">
          <a>{this.props.content}</a>
        </div>
      </div>
    );
  }
}

export default Article;
