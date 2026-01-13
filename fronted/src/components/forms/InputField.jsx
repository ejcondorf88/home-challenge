import { InputText } from 'primereact/inputtext';

export const InputField = ({
  id,
  label,
  value,
  onChange,
  error,
  icon,
  type = 'text',
  placeholder,
}) => {
  return (
    <div className="field">
      <label htmlFor={id} style={{ display: 'block', marginBottom: '0.5rem' }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        {icon && (
          <span style={{ 
            position: 'absolute', 
            left: '12px', 
            top: '50%', 
            transform: 'translateY(-50%)',
            color: '#6b7280' 
          }}>
            {icon}
          </span>
        )}
        <InputText
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          className={error ? 'p-invalid' : ''}
          style={{ 
            width: '100%',
            paddingLeft: icon ? '2.5rem' : '0.75rem'
          }}
          placeholder={placeholder}
        />
        {error && (
          <small style={{ color: '#dc2626', display: 'block', marginTop: '0.25rem' }}>
            {error}
          </small>
        )}
      </div>
    </div>
  );
};