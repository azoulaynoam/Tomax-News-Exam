import dayjs from "dayjs";

import "./styles/news.css";
import React from "react";
import { IArticle } from "./Article";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface NewsProps {
  news: IArticle[];
  nextPage: (page: number) => void;
  setArticle: (article: IArticle) => void;
  endOfNews: boolean;
  page: number;
}

class News extends React.Component<NewsProps> {
  isLoading = false;

  resetScroll = () => {
    document.getElementsByClassName("news")[0].scrollTop = 0;
  };

  onScrollPagination = (element: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (!this.isLoading) {
      const endOfDataCalc = Math.abs(
        element.currentTarget.scrollHeight -
          element.currentTarget.scrollTop -
          element.currentTarget.offsetHeight
      );
      if (endOfDataCalc <= 0.3) {
        this.isLoading = true;
        delay(500).then(() => {
          if (!this.props.endOfNews) {
            this.props.nextPage(1);
          }
          this.isLoading = false;
        });
      }
    }
  };

  shouldComponentUpdate(
    nextProps: Readonly<NewsProps>,
    nextState: Readonly<{}>,
    nextContext: any
  ): boolean {
    if (this.props.page !== nextProps.page) {
      this.resetScroll();
    }
    return true;
  }

  render() {
    if (this.props.news.length === 0) {
      return <div className="news">No news found</div>;
    }
    return (
      <div className="news" onScroll={this.onScrollPagination}>
        {this.props.news.map((newsItem) => (
          <div
            className="news-item"
            key={newsItem.title}
            onClick={() => this.props.setArticle(newsItem)}
          >
            <div className="news-item-header">
              <div className="news-header">
                <a className="news-item-title">{newsItem.title}</a>
                <a className="news-item-date">
                  {dayjs(newsItem.publishedAt).format("DD/MM/YYYY HH:mm UTC Z")}
                </a>
                <div className="news-item-description">
                  {newsItem.description}
                </div>
              </div>
              <div className="news-item-image">
                {newsItem.urlToImage ? (
                  <img
                    title={newsItem.title}
                    src={newsItem.urlToImage}
                    alt={newsItem.description ? newsItem.description : ""}
                  />
                ) : null}
              </div>
            </div>
          </div>
        ))}
        <div className="message">
          {this.props.endOfNews ? (
            <a>Viewed all articles</a>
          ) : (
            <a>Loading...</a>
          )}
        </div>
      </div>
    );
  }
}

export default News;
