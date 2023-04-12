import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import css from './Searchbar.module.css';
import toast from 'react-hot-toast';

export class Searchbar extends Component {
  state = {
    text: '',
  };

  handleRequestChange = evt => {
    this.setState({ text: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    const { text } = this.state;
    e.preventDefault();
    if (text.trim() === '') {
      toast.error('Error! Incorrect query. Please another query.');
      return;
    }
    this.props.onSubmit(text.trim());
    this.setState({ text: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button
            type="submit"
            className={css.button}
            disabled={!this.state.text && 'disabled'}
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
            value={this.state.text}
            onChange={this.handleRequestChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
