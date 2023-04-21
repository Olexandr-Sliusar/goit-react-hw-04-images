import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import css from './Searchbar.module.css';
import toast from 'react-hot-toast';

export const Searchbar = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleRequestChange = e => setText(e.currentTarget.value.toLowerCase());

  const handleSubmit = e => {
    e.preventDefault();
    if (text.trim() === '') {
      toast.error('Error! Incorrect query. Please another query.');
      return;
    }
    onSubmit(text.trim());
    setText('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button
          type="submit"
          className={css.button}
          disabled={!text && 'disabled'}
        >
          <BsSearch size="1em" />
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={text}
          onChange={handleRequestChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
