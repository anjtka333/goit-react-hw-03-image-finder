import { Component } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import { getPictures } from "./service/api";

class App extends Component {
  state = {};

  getImg = () => {
    getPictures(this.state.query, this.state.page)
      .then((articles) =>
        this.setState((prev) => ({
          articles: [...prev.articles, ...articles],
        }))
      )
      .catch((err) => this.setState({ error: err }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    // this.getImg();
    return (
      <div className="App">
        <Searchbar />
      </div>
    );
  }
}

export default App;
