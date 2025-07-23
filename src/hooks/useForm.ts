import { useState } from "react";

type ValidationRule = {
  required?: boolean;
  requiredMessage?: string;
  pattern?: RegExp;
  patternMessage?: string;
  minLength?: number;
  minLengthMessage?: string;
};

type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule;
};

type Errors<T> = {
  [K in keyof T]?: string;
};

type Touched<T> = {
  [K in keyof T]?: boolean;
};

function useForm<T extends Record<string, any>>(
  initialData: T,
  validationRules: ValidationRules<T> = {}
): {
  formData: T;
  errors: Errors<T>;
  touched: Touched<T>;
  handleChange: (name: keyof T, value: any) => void;
  handleBlur: (name: keyof T) => void;
  validate: () => boolean;
  reset: (newData?: T) => void;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
} {
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Errors<T>>({});
  const [touched, setTouched] = useState<Touched<T>>({});

  const handleChange = (name: keyof T, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error khi user bắt đầu nhập
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  const validateField = (name: keyof T, value: any): boolean => {
    const rules = validationRules[name];
    if (!rules) return true;

    let error = '';

    if (rules.required && (!value || value.toString().trim() === '')) {
      error = rules.requiredMessage || `${String(name)} là bắt buộc`;
    } else if (rules.pattern && !rules.pattern.test(value)) {
      error = rules.patternMessage || `${String(name)} không đúng định dạng`;
    } else if (rules.minLength && value.length < rules.minLength) {
      error = rules.minLengthMessage || `${String(name)} phải có ít nhất ${rules.minLength} ký tự`;
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const validate = (): boolean => {
    let isValid = true;
    (Object.keys(validationRules) as Array<keyof T>).forEach(field => {
      const fieldValid = validateField(field, formData[field]);
      if (!fieldValid) isValid = false;
    });
    return isValid;
  };

  const reset = (newData: T = initialData) => {
    setFormData(newData);
    setErrors({});
    setTouched({});
  };

  return {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    reset,
    setFormData
  };
};

export default useForm;
