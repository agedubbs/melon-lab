import React, { StatelessComponent } from 'react';
import Icon from '~/blocks/Icon';
import styles from './styles.css';

export interface HeaderProps {}

export const Header: StatelessComponent<HeaderProps> = ({ children }) => {
  return (
    <div className="header">
      <style jsx>{styles}</style>
      {children}
      <div className="header__logo">
        <Icon width="25px" height="25px" name="logos_default" />
      </div>
      <div className="header__name">Peter-Fund</div>
      <div className="header__price">
        <span className="header__price-desc">Share price:</span>
        <span className="header__price-value">1.000 MLN-T-M/Share</span>
      </div>
      <div className="header__price">
        <span className="header__price-desc">AUM:</span>
        <span className="header__price-value">1.000 MLN-T-M/Share</span>
      </div>
      <div className="header__price">
        <span className="header__price-desc">Ranking:</span>
        <span className="header__price-value">
          <span className="header__price-value-important">188</span> out of 287 Melon
          Funds
        </span>
      </div>
      <div className="header__account">
        <span className="header__account-address">0xA5f0…2783</span>
        <span className="header__account-balances">
          <span className="header__account-balance">Ⓜ 8.0000</span>
          <span className="header__account-balance">Ξ 0.3543</span>
        </span>
        <span className="header__account-net">kovan</span>
        <span className="header__account-info">Price feed down</span>
      </div>
    </div>
  );
};

export default Header;
