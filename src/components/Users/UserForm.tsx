import { useEffect } from "react";
import FormInput from "../FormInput ";
import useForm from "../../hooks/useForm";

interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
}

interface UserFormProps {
  user?: User;
  onSubmit: (user: User) => void;
  onCancel: () => void;
}

const UserForm = ({ user, onSubmit, onCancel }: UserFormProps) => {
  const validationRules = {
    name: { 
      required: true, 
      requiredMessage: 'Họ tên là bắt buộc',
      minLength: 2,
      minLengthMessage: 'Họ tên phải có ít nhất 2 ký tự'
    },
    email: { 
      required: true, 
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      patternMessage: 'Email không đúng định dạng'
    },
    phone: { 
      required: true,
      pattern: /^[0-9]{10,11}$/,
      patternMessage: 'Số điện thoại phải có 10-11 chữ số'
    },
    address: { required: true }
  };


  const {
    formData,
    errors,
    touched,
    handleChange: formHandleChange,
    handleBlur: formHandleBlur,
    validate,
    reset
  } = useForm(
    user || { name: '', email: '', phone: '', address: '', role: 'User' },
    validationRules
  );

  // Adapter for FormInput props
  const handleChange = (name: string, value: string | number) => {
    formHandleChange(name as keyof User, value);
  };
  const handleBlur = (name: string) => {
    formHandleBlur(name as keyof User);
  };

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user]);

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData);
    }
  };

  const roleOptions = [
    { value: 'User', label: 'User' },
    { value: 'Manager', label: 'Manager' },
    { value: 'Admin', label: 'Admin' }
  ];

  return (
    <div>
      <FormInput
        label="Họ và tên"
        name="name"
        value={formData.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.name}
        touched={touched.name}
        required
        placeholder="Nhập họ và tên"
      />
      
      <FormInput
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
        touched={touched.email}
        required
        placeholder="Nhập email"
      />
      
      <FormInput
        label="Số điện thoại"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.phone}
        touched={touched.phone}
        required
        placeholder="Nhập số điện thoại"
      />
      
      <FormInput
        label="Địa chỉ"
        name="address"
        value={formData.address}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.address}
        touched={touched.address}
        required
        placeholder="Nhập địa chỉ"
      />
      
      <FormInput
        label="Vai trò"
        name="role"
        type="select"
        value={formData.role}
        onChange={handleChange}
        options={roleOptions}
      />

      <div className="flex gap-3 justify-end mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          {user ? 'Cập nhật' : 'Thêm mới'}
        </button>
      </div>
    </div>
  );
};

export default UserForm;
