import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  render() {
    const { image, tags } = this.props;

    return createPortal(
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
          <img src={image} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
