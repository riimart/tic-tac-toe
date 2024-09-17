import React from "react";

const InputField = ({
  label,
  type = "text", // default type is 'text'
  name,
  value,
  onChange,
  placeholder = "",
  className = "",
  required = false,
  disabled = false,
}) => {
  return (
    <div className={`input-field ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="input-box outline"
      />
    </div>
  );
};

export default InputField;
