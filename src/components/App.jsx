import { GlobalStyle } from './GlobalStyle';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import toast, { Toaster } from 'react-hot-toast';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchQuery: '',
  };

  handleSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  componentDidUpdate(_, prevState) {
    if (prevState.searchQuery === this.state.searchQuery) {
      toast.error('Error! Repeated request. Please use another query.');
    }
  }

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery searchQuery={this.state.searchQuery} />
        <GlobalStyle />
        <Toaster
          position="top-center"
          reverseOrder={true}
          toastOptions={{ duration: 2500 }}
        />
      </>
    );
  }
}
