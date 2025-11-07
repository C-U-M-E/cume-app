import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Input = forwardRef(({
  label,
  id,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required = false,
  disabled = false,
  className = '',
  inputClassName = '',
  leftSlot = null,
  rightSlot = null,
  ...rest
}, ref) => {
  const inputId = id || name;
  const hasError = Boolean(error);
  const helperId = (hasError || helperText) && inputId ? `${inputId}-helper` : undefined;

  return (
    <div className={`flex flex-col gap-8 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-body-sm-medium text-brown-900"
        >
          {label}
          {required && <span className="text-danger ml-4">*</span>}
        </label>
      )}

      <div
        className={`flex items-center gap-12 rounded-16 border ${hasError ? 'border-danger' : 'border-brown-200'} bg-white px-16 py-12 transition-shadow focus-within:border-brown-600 focus-within:shadow-[0px_0px_0px_2px_rgba(121,85,72,0.12)] ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-text'} ${inputClassName}`}
      >
        {leftSlot && (
          <div className="shrink-0 text-brown-900">
            {leftSlot}
          </div>
        )}

        <input
          id={inputId}
          name={name || inputId}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          ref={ref}
          aria-invalid={hasError}
          aria-describedby={helperId}
          className={`flex-1 bg-transparent outline-none text-body-md-regular text-brown-900 placeholder:text-gray-600 ${disabled ? 'cursor-not-allowed' : 'cursor-text'}`}
          {...rest}
        />

        {rightSlot && (
          <div className="shrink-0 text-brown-900">
            {rightSlot}
          </div>
        )}
      </div>

      {(helperText || hasError) && (
        <p
          id={helperId}
          className={`text-body-sm-regular ${hasError ? 'text-danger' : 'text-gray-700'}`}
        >
          {hasError ? error : helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  leftSlot: PropTypes.node,
  rightSlot: PropTypes.node,
};

export default Input;

