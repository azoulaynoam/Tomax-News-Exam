import React from "react";
import { IArticle } from "./Article";
import "./styles/searchbar.css";

interface props {
  category: string;
  page: number;
  setNews: (news: IArticle[], total: number) => void;
}

class SearchBar extends React.Component<props, any> {
  state: {
    search: string;
  } = {
    search: "",
  };

  getNews = (category: string, page: number) => {
    fetch(
      `http://localhost:8000/news/${category}?page=${page}${
        this.state.search ? "&search=" + this.state.search : ""
      }`
    )
      .then((res) => res.json())
      .then((res) => {
        this.props.setNews(res.articles, res.totalResults);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  shouldComponentUpdate(
    nextProps: Readonly<props>,
    nextState: Readonly<any>,
    nextContext: any
  ): boolean {
    if (
      nextProps.page !== this.props.page ||
      nextProps.category !== this.props.category
    ) {
      document.getElementsByClassName("news")[0].scrollTop = 0;
      this.getNews(nextProps.category, nextProps.page);
      return true;
    }
    return false;
  }

  render() {
    return (
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search"
          onChange={(props) => {
            this.setState({ search: props.target.value });
          }}
        />
        <button
          onClick={() => this.getNews(this.props.category, this.props.page)}
        >
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
