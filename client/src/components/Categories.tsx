import React from "react";
import "./styles/categories.css";

const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

interface props {
  changeCategory: (category: string) => void;
}

/**
 * Categories component
 */
class Categories extends React.Component<props, any> {
  state: {
    chosen: string;
  } = {
    chosen: "general",
  };

  constructor(props: props) {
    super(props);
  }

  render() {
    return (
      <div className="categories">
        {categories.map((category) => (
          <div
            className={
              category === this.state.chosen
                ? "category-btn active"
                : "category-btn"
            }
            key={category}
            onClick={() => {
              this.setState({ chosen: category });
              this.props.changeCategory(category);
            }}
          >
            {category}
          </div>
        ))}
      </div>
    );
  }
}

export default Categories;
