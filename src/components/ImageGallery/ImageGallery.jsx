import React, { Component } from 'react';
import toast from 'react-hot-toast';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import { ButtonLoadMore } from '../Button/Button';
import { getImages } from 'services/getImages';

const PER_PAGE = 12;

export class ImageGallery extends Component {
  state = {
    page: 1,
    totalImages: 0,
    images: [],
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchQuery !== this.props.searchQuery ||
      prevState.page < this.state.page
    ) {
      this.setState({ loading: true });
      let { page } = this.state;
      if (prevProps.searchQuery !== this.props.searchQuery) {
        this.setState({ images: [], page: 1, totalImages: 0 });
        page = 1;
      }
      getImages(this.props.searchQuery, page, PER_PAGE)
        .then(response => response.json())
        .then(({ hits, totalHits, total }) => {
          if (totalHits > 0) {
            this.setState({
              images: [...this.state.images, ...hits],
              totalImages: total,
            });
            page === 1 && toast.success(`Total found ${total} images`);
            return;
          }
          toast.error('Error! Nothing found. Please use another query');
          this.setState({ images: [] });
        })
        .catch(error => {
          console.log(error);
          toast.error('Error! Please try again');
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }

  getLoadMore = totalPages => {
    this.state.page < totalPages &&
      this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { page, totalImages, images, loading } = this.state;
    const { container, gallery } = css;
    const totalPages = Math.ceil(totalImages / PER_PAGE);
    return (
      <>
        {loading && <Loader />}

        <div className={container}>
          {totalImages > 0 && (
            <ul className={gallery}>
              {images.map(item => (
                <ImageGalleryItem key={item.id} item={item} />
              ))}
            </ul>
          )}
          {page < totalPages && (
            <ButtonLoadMore getLoadMore={() => this.getLoadMore(totalPages)} />
          )}
        </div>
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
