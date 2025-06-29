import React from "react";
import { eyeIcon, eyeOffIcon } from "../assets/images";

interface InputFieldProps {
  id: string;
  type?: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  isPassword?: boolean;
  isVisible?: boolean;
  toggleVisibility?: () => void;
  labelColor?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  type = "text",
  label,
  value,
  onChange,
  placeholder = "",
  className = "",
  disabled = false,
  isPassword = false,
  isVisible = false,
  toggleVisibility,
  labelColor = "text-gray-600",
}) => (
  <div className="relative w-full">
    {label && (
      <label
        htmlFor={id}
        className={`block text-sm font-semibold mb-2 ${labelColor}`}
      >
        {label}
      </label>
    )}
    <input
      type={isPassword ? (isVisible ? "text" : "password") : type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      disabled={disabled}
      className={`w-full border-b border-gray-300 text-sm focus:outline-none focus:border-purple-600 bg-transparent ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    />
    {isPassword && (
      <img
        src={isVisible ? eyeOffIcon : eyeIcon}
        alt="Toggle Password Visibility"
        onClick={disabled ? undefined : toggleVisibility}
        className={`mt-2.5 absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
      />
    )}
  </div>
);

export default InputField; 