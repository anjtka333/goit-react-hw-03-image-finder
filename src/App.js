import { Component } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import { getPictures } from "./service/api";
// getPictures();

class App extends Component {
  state = {
    pictures: [],
    // page,
    // isLoading
    // query,
  };
  componentDidMount() {
    getPictures()
      .then((pictures) => {
        this.setState({ pictures });
      })
      .catch((err) => this.setState({ error: err }));
    // .finally(() => this.setState({ isLoading: false }));
  }
  onSearch = () => {};

  render() {
    const {
      pictures: { hits },
    } = this.state;
    return (
      <div className="App">
        <Searchbar />
        {hits && hits.map((item) => console.log(item))}
      </div>
    );
  }
}

export default App;
//cfs
