import React, { Component } from 'react';
import { Modal } from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    isOpen: false,
  };

  openModal = () => this.setState({ isOpen: true });

  closeModal = () => this.setState({ isOpen: false });

  render() {
    const { item } = this.props;
    return (
      <>
        <li
          className={css.galleryItem}
          onClick={this.openModal}
          aria-label="Zoom"
        >
          <img
            className={css.galleryItemImage}
            src={item.webformatURL}
            alt={item.tags}
          />
        </li>
        {this.state.isOpen && (
          <Modal
            image={item}
            isOpen={this.state.isOpen}
            onClose={this.closeModal}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
