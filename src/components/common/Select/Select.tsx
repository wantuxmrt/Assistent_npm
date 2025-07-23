import React from 'react';
import styles from './Select.module.css';

export interface SelectOption { // Added export
  value: string;
  label: string;
}

export interface SelectProps { // Added export
  options: SelectOption[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = '',
  className = '',
  disabled = false,
}) => {
  return (
    <select
      className={`${styles.select} ${className}`}
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;