import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/packageName.scss';

const ButtonComponent = ({
  btnValue,
  wrapperClassName,
  btnClassName,
  onClick = () => {}
}) => {
  return (
    <div
      className={[
        styles.buttonWrapper || 'buttonWrapper',
        wrapperClassName || '',
      ].join(' ')}
    >
      <input
        type="button"
        value={btnValue}
        className={[
          styles.button || 'button',
          btnClassName || ''
        ].join(' ')}
        onClick={onClick}
      />

    </div>
  );
}

ButtonComponent.propTypes = {
  btnValue: PropTypes.string,
  btnClassName: PropTypes.string,
  wrapperClassName: PropTypes.string
};

export default ButtonComponent;
