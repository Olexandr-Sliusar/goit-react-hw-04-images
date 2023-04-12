import React from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

export const ButtonLoadMore = ({ getLoadMore }) => {
  return (
    <button type="button" className={css.button} onClick={getLoadMore}>
      Load
    </button>
  );
};

ButtonLoadMore.propTypes = {
  getLoadMore: PropTypes.func.isRequired,
};
