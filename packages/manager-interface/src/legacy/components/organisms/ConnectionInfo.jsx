import React from 'react';
import Link from 'redux-first-router-link';
import displayNumber from '../../utils/displayNumber';

const shortenAddress = address =>
  `${address.slice(0, 6)}…${address.substr(-4)}`;

export const statusTypes = {
  NEUTRAL: 'NEUTRAL',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  GOOD: 'GOOD',
};

const colorTypeMap = {
  [statusTypes.WARNING]: '#f29954',
  [statusTypes.ERROR]: '#d16666',
  [statusTypes.GOOD]: '#5da05d',
};

const networkColorTypeMap = {
  live: '#f29954',
};

export const ConnectionInfoComponent = ({
  account,
  mlnBalance,
  ethBalance,
  statusMessage,
  statusType,
  statusLink,
  accountAction,
  networkName,
}) => (
  <div
    style={{
      position: 'fixed',
      top: 20,
      right: 20,
      backgroundColor: '#fffdf3',
      fontSize: '0.8em',
      zIndex: 100,
      padding: 5,
    }}
  >
    <Link to={accountAction}>
      {shortenAddress(account || '')} | Ξ {displayNumber(ethBalance)}
    </Link>{' '}
    |{' '}
    <span style={{ color: networkColorTypeMap[networkName] }}>
      {networkName}{' '}
    </span>
    |{' '}
    {statusLink ? (
      <a
        style={{ color: colorTypeMap[statusType] }}
        href={statusLink}
        target="_blank"
      >
        {statusMessage}
      </a>
    ) : (
      <span style={{ color: colorTypeMap[statusType] }}>{statusMessage}</span>
    )}{' '}
  </div>
);

export default ConnectionInfoComponent;
