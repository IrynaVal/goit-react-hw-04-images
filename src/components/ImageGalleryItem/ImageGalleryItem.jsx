import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));
  };

  render() {
    const {
      item: { webformatURL, largeImageURL, tags },
    } = this.props;
    const { isModalOpen } = this.state;

    return (
      <>
        <li className={css.ImageGalleryItem} onClick={this.toggleModal}>
          <img
            className={css.ImageGalleryItem_image}
            src={webformatURL}
            alt={tags}
          />
        </li>
        {isModalOpen && (
          <Modal onClose={this.toggleModal} image={largeImageURL} tags={tags} />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
