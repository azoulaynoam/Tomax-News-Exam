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
}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    if (this.props.news.length === 0) {
      return <div className="news">No news found</div>;
    }
    return (
      <div
        className="news"
        onScroll={(element) => {
          if (
            element.currentTarget.scrollHeight ===
            element.currentTarget.scrollTop + element.currentTarget.offsetHeight
          ) {
            this.props.pagination(1);
          }
        }}
      >
        {this.props.news.map((newsItem) => (
          <div className="news-item" key={newsItem.title}>
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
            <div className="news-item-description">{newsItem.description}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default News;
