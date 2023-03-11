import React, { Component } from 'react';
import toast from 'react-hot-toast';
import { BsSearch } from 'react-icons/bs';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = evt => {
    const { value } = evt.target;
    this.setState({
      query: value,
    });
  };

  handleFormSubmit = evt => {
    const { query } = this.state;
    evt.preventDefault();
    if (!query) {
      toast.error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    this.props.onSubmit(query);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleFormSubmit}>
          <button type="submit" className={css.SearchForm_button}>
            <span className={css.SearchForm_button_label}>
              <BsSearch size="20" fill="#000" />
            </span>
          </button>

          <input
            className={css.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            // name="query"
            value={query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
