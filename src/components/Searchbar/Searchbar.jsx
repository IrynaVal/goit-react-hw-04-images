import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsSearch } from 'react-icons/bs';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = evt => {
    setQuery(evt.target.value);
  };

  const handleFormSubmit = evt => {
    evt.preventDefault();
    if (!query) {
      toast.error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    onSubmit(query);
    resetForm();
  };

  const resetForm = () => {
    setQuery('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleFormSubmit}>
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
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
