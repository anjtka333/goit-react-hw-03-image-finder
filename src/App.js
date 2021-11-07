import { Component } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import { getPictures } from "./service/api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import s from "./App.module.css";
import Loader from "react-loader-spinner";
import Modal from "./components/Modal/Modal";

class App extends Component {
  state = {
    pictures: [],
    isLoading: false,
    query: "",
    page: 1,
    showModal: false,
    modalTitle: "",
    modalUrl: "",
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query && this.state.page === 1) {
      this.setState({ isLoading: true });
      this.getData();
    }
    if (this.state.page !== prevState.page) {
      this.setState({ isLoading: true });
      this.getData();
    }
    if (this.state.query !== prevState.query && this.state.page !== 1) {
      this.setState({ isLoading: true });
      this.setState({ page: 1, pictures: [] });
    }
  }
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  changeQuery = (query) => {
    this.setState({ query });
  };
  getData() {
    getPictures(this.state.query, this.state.page)
      .then((pictures) => {
        this.setState((prevState) => ({
          pictures: [...prevState.pictures, ...pictures],
        }));
      })
      .catch((err) => this.setState({ error: err }))
      .finally(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
        this.setState({ isLoading: false });
      });
  }
  handleChangePage = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };
  handleModalShow = (modalUrl, modalTitle) => {
    this.setState({ modalTitle });
    this.setState({ modalUrl });
    this.toggleModal();
  };

  render() {
    const {
      pictures: { hits },
    } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.changeQuery} />
        <ImageGallery
          pictures={this.state.pictures}
          cbOnClick={this.handleModalShow}
          cbOpenModal={this.toggleModal}
        />
        {this.state.isLoading && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Loader type="Hearts" color="#3F51B5" height={80} width={80} />
          </div>
        )}
        {this.state.pictures.length > 12 && (
          <Button cbOnClick={this.handleChangePage} />
        )}
        {this.state.showModal && (
          <Modal
            onClose={this.toggleModal}
            modalUrl={this.state.modalUrl}
            modalTitle={this.state.modalTitle}
          />
        )}
      </div>
    );
  }
}

export default App;
