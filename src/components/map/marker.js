import React from 'react';
import {BaseControl} from 'react-map-gl';
import ManIcon from '../../images/manly.png';
import OutsideClickHandler from 'react-outside-click-handler';

import styles from './styles.module.css';

export default class CustomMarker extends BaseControl {
  _render() {
    const {title, isOpen, onOutsideClick, onClick, longitude, latitude} = this.props;

    const [x, y] = this._context.viewport.project([longitude, latitude]);

    const markerStyle = {
      position: 'absolute',
      width: '24px',
      left: x,
      top: y,
      zIndex: isOpen ? 9999 : 0,
    };

    return (
      <OutsideClickHandler
        onOutsideClick={() => {
          onOutsideClick()
        }}
      >
        <div onClick={onClick} ref={this._containerRef} style={markerStyle}>
          <img className={styles.marker} src={ManIcon} />
          {isOpen && (
            <h6 className={styles.title}>{title}</h6>
          )}
        </div>
      </OutsideClickHandler>
    );
  }
}
