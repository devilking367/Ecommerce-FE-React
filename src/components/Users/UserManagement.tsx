import useCRUD from "../../hooks/useCRUD";
import useModal from "../../hooks/useModal ";
type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
};
import DataTable from "../DataTable ";
import Modal from "../Modal ";
import SearchInput from "../SearchInput ";
import UserForm from "./UserForm";
import { FaUsers, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPlus } from "react-icons/fa";

const UserManagement = () => {
  // Sample data
  const sampleUsers = [
    { id: 1, name: 'Nguyễn Văn An', email: 'an.nguyen@email.com', phone: '0123456789', address: 'Hà Nội', role: 'Admin' },
    { id: 2, name: 'Trần Thị Bình', email: 'binh.tran@email.com', phone: '0987654321', address: 'Hồ Chí Minh', role: 'User' },
    { id: 3, name: 'Lê Văn Cường', email: 'cuong.le@email.com', phone: '0369852147', address: 'Đà Nẵng', role: 'User' },
    { id: 4, name: 'Phạm Thị Dung', email: 'dung.pham@email.com', phone: '0741852963', address: 'Cần Thơ', role: 'Manager' }
  ];

  // CRUD Hook
  const crud = useCRUD(sampleUsers, {
    searchFields: ['name', 'email', 'phone']
  });

  // Modal Hook
  const modal = useModal();

  // Table columns configuration
  const columns: { key: keyof User; header: string; render: (value: string) => JSX.Element }[] = [
    {
      key: 'name',
      header: 'Họ tên',
      render: (value: string) => (
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
            {value.charAt(0).toUpperCase()}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{value}</div>
          </div>
        </div>
      )
    },
    {
      key: 'email',
      header: 'Email',
      render: (value: string) => (
        <div className="flex items-center text-sm text-gray-900">
          <FaEnvelope className="h-4 w-4 text-gray-400 mr-2" />
          {value}
        </div>
      )
    },
    {
      key: 'phone',
      header: 'Số điện thoại',
      render: (value: string) => (
        <div className="flex items-center text-sm text-gray-900">
          <FaPhone className="h-4 w-4 text-gray-400 mr-2" />
          {value}
        </div>
      )
    },
    {
      key: 'address',
      header: 'Địa chỉ',
      render: (value: string) => (
        <div className="flex items-center text-sm text-gray-900">
          <FaMapMarkerAlt className="h-4 w-4 text-gray-400 mr-2" />
          {value}
        </div>
      )
    },
    {
      key: 'role',
      header: 'Vai trò',
      render: (value: string) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'Admin' 
            ? 'bg-red-100 text-red-800' 
            : value === 'Manager'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {value}
        </span>
      )
    }
  ];

  // Event handlers
  const handleCreate = () => {
    modal.openModal('create');
  };

  const handleEdit = (user: User) => {
    modal.openModal('edit', user);
  };

  const handleDelete = (user: User) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa người dùng "${user.name}"?`)) {
      crud.remove(user.id);
    }
  };

  const handleFormSubmit = (formData: Omit<User, 'id'>) => {
    if (modal.mode === 'edit' && modal.data) {
      crud.update((modal.data as User).id, formData);
    } else {
      crud.create(formData);
    }
    modal.closeModal();
  };

  return (
    <div className="min-h-screen ">
      <div className="container">
        {/* Header */}
        <div className="bg-white p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <FaUsers className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-800">Quản lý Người dùng</h1>
            </div>
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              <FaPlus className="h-4 w-4" />
              Thêm người dùng
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="rounded-lg p-1 mb-1">
          <SearchInput
            searchTerm={crud.searchTerm}
            onSearchChange={crud.setSearchTerm}
            placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
          />
        </div>

       
        {/* Table */}
        <DataTable
          columns={columns}
          data={crud.filteredItems as User[]}
          loading={crud.loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          emptyMessage="Không tìm thấy người dùng nào"
          emptyIcon={FaUsers}
        />

        {/* Modal */}
        <Modal
          isOpen={modal.isOpen}
          onClose={modal.closeModal}
          title={modal.mode === 'edit' ? 'Sửa Người Dùng' : 'Thêm Người Dùng Mới'}
        >
          <UserForm
            user={modal.data}
            onSubmit={handleFormSubmit}
            onCancel={modal.closeModal}
          />
        </Modal>
      </div>
    </div>
  );
};

export default UserManagement;
