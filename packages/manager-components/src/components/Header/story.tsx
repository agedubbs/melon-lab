import { storiesOf } from '@storybook/react';
import React from 'react';
import Header from './index';

storiesOf('Components|Header', module).add('Default', () => {
  return <Header />;
});
