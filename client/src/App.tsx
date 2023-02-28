import SearchBar from "./components/SearchBar";
import Categories from "./components/Categories";
import "./App.css";
import React from "react";
import News from "./components/News";
import Article, { IArticle } from "./components/Article";

class App extends React.Component {
  state: {
    news: IArticle[];
    category: string;
    article: IArticle | null;
    page: number;
    total: number;
  } = { news: [], category: "general", page: 0, total: 0, article: null };

  changeCategory = (category: string) => {
    this.setState({ category: category, page: 0 });
  };

  setNews = (news: IArticle[], total: number) => {
    this.setState({ news: news, total: total });
  };

  setPage = (page: number) => {
    if (this.state.page + page < 0 || this.state.page * 20 >= this.state.total)
      return;
    this.setState({ page: this.state.page + page });
  };

  setArticle = (article: IArticle) => {
    this.setState({ article: article });
  };

  unSetArticle = () => {
    this.setState({ article: null });
  };

  NewsPage = () => {
    return (
      <div className="news-app">
        <SearchBar
          category={this.state.category}
          page={this.state.page}
          setNews={this.setNews}
        />
        <Categories changeCategory={this.changeCategory} />
        <News
          news={this.state.news}
          nextPage={this.setPage}
          setArticle={this.setArticle}
          page={this.state.page}
          endOfNews={(this.state.page + 1) * 20 >= this.state.total}
        />
      </div>
    );
  };

  ArticlePage = (article: IArticle) => {
    return (
      <div className="news-app">
        <div className="back-btn">
          <button onClick={this.unSetArticle}>Back</button>
        </div>
        <Article {...article} />
      </div>
    );
  };

  render() {
    if (this.state.article) return this.ArticlePage(this.state.article);
    else return this.NewsPage();
  }
}

export default App;
