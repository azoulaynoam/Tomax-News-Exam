import SearchBar from "./components/SearchBar";
import Categories from "./components/Categories";
import "./App.css";
import React from "react";
import News, { NewsType } from "./components/News";

class App extends React.Component<{}> {
  state: {
    news: NewsType[];
    category: string;
    page: number;
    total: number;
  } = { news: [], category: "general", page: 0, total: 0 };

  changeCategory = (category: string) => {
    this.setState({ category: category, page: 0 });
  };

  setNews = (news: NewsType[], total: number) => {
    console.log("setNews");
    this.setState({ news: news, total: total });
  };

  setPage = (page: number) => {
    if (this.state.page + page < 0 || this.state.page * 20 >= this.state.total)
      return;
    this.setState({ page: this.state.page + page });
  };

  render() {
    return (
      <div className="news-app">
        <SearchBar
          category={this.state.category}
          page={this.state.page}
          setNews={this.setNews}
        />
        <Categories changeCategory={this.changeCategory} />
        <News news={this.state.news} pagination={this.setPage} />
      </div>
    );
  }
}

export default App;
