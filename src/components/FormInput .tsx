import type { FC } from "react";

type OptionType = { value: string | number; label: string } | string | number;

interface FormInputProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (name: string, value: string | number) => void;
  onBlur?: (name: string) => void;
  error?: string;
  touched?: boolean;
  type?: string;
  placeholder?: string;
  required?: boolean;
  options?: OptionType[];
}

const FormInput: FC<FormInputProps> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  type = 'text',
  placeholder = '',
  required = false,
  options = []
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    
    {type === 'select' ? (
      <select
        name={name}
        value={value || ''}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={() => onBlur && onBlur(name)}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error && touched ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        <option value="">Chọn {label.toLowerCase()}</option>
        {options.map((option, index) => {
          if (typeof option === 'object' && option !== null && 'value' in option && 'label' in option) {
            return (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            );
          }
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    ) : (
      <input
        type={type}
        name={name}
        value={value || ''}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={() => onBlur && onBlur(name)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error && touched ? 'border-red-500' : 'border-gray-300'
        }`}
      />
    )}
    
    {error && touched && (
      <p className="mt-1 text-sm text-red-500">{error}</p>
    )}
  </div>
);
export default FormInput;
