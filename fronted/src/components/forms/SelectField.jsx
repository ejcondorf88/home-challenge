import React from 'react';
import { Dropdown } from 'primereact/dropdown';

export const SelectField = ({
  id,
  label,
  value,
  onChange,
  options,
  error,
}) => {
  return (
    <div className="field">
      <label htmlFor={id} style={{ display: 'block', marginBottom: '0.5rem' }}>
        {label}
      </label>
      <Dropdown
        id={id}
        value={value}
        onChange={onChange}
        options={options}
        className={error ? 'p-invalid' : ''}
        style={{ width: '100%' }}
        placeholder="Select a role"
      />
      {error && (
        <small style={{ color: '#dc2626', display: 'block', marginTop: '0.25rem' }}>
          {error}
        </small>
      )}
    </div>
  );
};