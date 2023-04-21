import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import { ButtonLoadMore } from '../Button/Button';
import { getImages } from 'services/getImages';

const PER_PAGE = 12;
const { container, gallery } = css;

export const ImageGallery = ({ searchQuery }) => {
  const [loading, setLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const prevSearchQuery = useRef(() => null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    setLoading(true);
    if (prevSearchQuery.current !== searchQuery) {
      prevSearchQuery.current = searchQuery;
      setImages([]);
      setTotalImages(0);

      if (page > 1) {
        setPage(1);
        return;
      }
    }

    getImages(searchQuery, page, PER_PAGE)
      .then(response => response.json())
      .then(({ hits, totalHits, total }) => {
        if (totalHits > 0) {
          setImages(prevState => [...prevState, ...hits]);
          setTotalImages(total);
          page === 1 && toast.success(`Total found ${total} images`);
          return;
        }
        toast.error('Error! Nothing found. Please use another query');
      })
      .catch(error => {
        console.log(error);
        toast.error('Error! Please try again');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, searchQuery]);

  const getLoadMore = totalPages => {
    page < totalPages && setPage(prevState => prevState + 1);
  };

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
          <ButtonLoadMore getLoadMore={() => getLoadMore(totalPages)} />
        )}
      </div>
    </>
  );
};

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
