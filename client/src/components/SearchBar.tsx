import React from "react";
import { NewsType } from "./News";
import "./styles/searchbar.css";

interface props {
  category: string;
  page: number;
  setNews: (news: NewsType[], total: number) => void;
}

class SearchBar extends React.Component<props, any> {
  state: {
    search: string;
  } = {
    search: "",
  };

  constructor(props: props) {
    super(props);
  }

  getNews = () => {
    fetch(
      `http://localhost:8000/news/${this.props.category}?page=${
        this.props.page
      }${this.state.search ? "&search=" + this.state.search : ""}`
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
    if (nextProps.page !== this.props.page) {
      this.getNews();
      return false;
    }
    return true;
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
        <button onClick={this.getNews}>Search</button>
      </div>
    );
  }
}

export default SearchBar;
