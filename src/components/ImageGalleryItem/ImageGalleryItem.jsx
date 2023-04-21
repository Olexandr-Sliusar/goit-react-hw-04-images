import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  return (
    <>
      <li className={css.galleryItem} onClick={openModal} aria-label="Zoom">
        <img
          className={css.galleryItemImage}
          src={item.webformatURL}
          alt={item.tags}
        />
      </li>
      {isOpen && <Modal image={item} isOpen={isOpen} onClose={closeModal} />}
    </>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
