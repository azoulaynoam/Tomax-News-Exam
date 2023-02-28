import dayjs from "dayjs";

import "./styles/news.css";
import React from "react";

export interface NewsType {
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

class News extends React.Component<{
  news: NewsType[];
  pagination: (page: number) => void;
  endOfNews: boolean;
}> {
  state: {
    news: NewsType | null;
  } = {
    news: null,
  };

  constructor(props: any) {
    super(props);
  }

  onScrollPagination = (element: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (
      element.currentTarget.scrollHeight ===
        element.currentTarget.scrollTop + element.currentTarget.offsetHeight &&
      !this.props.endOfNews
    ) {
      this.props.pagination(1);
      element.currentTarget.scrollTop = 0;
    }
  };

  render() {
    if (this.props.news.length === 0) {
      return <div className="news">No news found</div>;
    }
    if (!this.state.news)
      return (
        <div className="news" onScroll={this.onScrollPagination}>
          {this.props.news.map((newsItem) => (
            <div
              className="news-item"
              key={newsItem.title}
              onClick={() => {
                this.setState({ news: newsItem });
              }}
            >
              <a className="news-item-title">{newsItem.title}</a>
              <br />
              <a className="news-item-date">
                {dayjs(newsItem.publishedAt).format("DD/MM/YYYY HH:mm UTC Z")}
              </a>
              <div className="news-item-image">
                {newsItem.urlToImage ? (
                  <img
                    title={newsItem.title}
                    src={newsItem.urlToImage}
                    alt={newsItem.description ? newsItem.description : ""}
                  />
                ) : null}
              </div>
              <div className="news-item-description">
                {newsItem.description}
              </div>
            </div>
          ))}
          <div className="end-of-news">
            {this.props.endOfNews ? <a>Viewed all news</a> : null}
          </div>
        </div>
      );
    else
      return (
        <div className="news">
          <div
            className="back-btn"
            onClick={() => {
              this.setState({ news: null });
            }}
          >
            back
          </div>
          <div className="news-item" key={this.state.news.title}>
            <a className="news-item-title">{this.state.news.title}</a>
            <br />
            <a className="news-item-date">
              {dayjs(this.state.news.publishedAt).format(
                "DD/MM/YYYY HH:mm UTC Z"
              )}
            </a>
            <a className="news-item-author">{this.state.news.author}</a>
            <div className="news-item-image">
              {this.state.news.urlToImage ? (
                <img
                  title={this.state.news.title}
                  src={this.state.news.urlToImage}
                  alt={
                    this.state.news.description
                      ? this.state.news.description
                      : ""
                  }
                />
              ) : null}
            </div>
            <div className="news-item-description">
              {this.state.news.description}
            </div>
            <div className="news-item-content">{this.state.news.content}</div>
          </div>
        </div>
      );
  }
}

export default News;
