import React, { ChangeEventHandler, StatelessComponent } from 'react';

import styles from './styles.css';

export interface CheckboxProps {
  disabled?: boolean;
  name: string;
  value: string;
  text: string;
  defaultChecked?: boolean;
  onInputChange?: ChangeEventHandler<Element>;
}

const Checkbox: StatelessComponent<CheckboxProps> = ({
  disabled,
  name,
  value,
  text,
  defaultChecked,
  onInputChange,
}) => (
  <label className="checkbox">
    <style jsx>{styles}</style>
    <input
      className="checkbox__input"
      type="checkbox"
      name={name}
      value={value}
      defaultChecked={defaultChecked}
      disabled={disabled}
      onChange={onInputChange}
    />
    <span className="checkbox__checkmark" />
    <span className="checkbox__text">{text}</span>
  </label>
);

export default Checkbox;
