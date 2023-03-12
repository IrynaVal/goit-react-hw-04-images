import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ image, tags, onClose }) => {
  useEffect(() => {
    console.log('is');
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      console.log('is not');
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  // useEffect(() => {});
  // const componentDidMount() {
  //   window.addEventListener('keydown', handleKeyDown);
  // }

  // const componentWillUnmount() {
  //   window.removeEventListener('keydown', handleKeyDown);
  // }

  const handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  // render() {
  //   const { image, tags } = this.props;

  return createPortal(
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.Modal}>
        <img src={image} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
};
// }

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
