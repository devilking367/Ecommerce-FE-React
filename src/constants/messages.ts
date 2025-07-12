export const MESSAGES = {
  // Header
  HEADER: {
    TITLE: 'Đây là Header - Ecommerce Admin',
  },

  // Sidebar
  SIDEBAR: {
    DASHBOARD: 'Dashboard',
    PRODUCT: 'Product',
    CATEGORY: 'Category',
    USER: 'User',
    POST: 'Post',
  },

  // Dashboard
  DASHBOARD: {
    TITLE: 'Dashboard',
    WELCOME: 'Chào mừng bạn đến trang quản trị Backoffice!',
    STATS: {
      TOTAL_PRODUCTS: 'Tổng sản phẩm',
      TOTAL_USERS: 'Tổng user',
      NEW_ORDERS: 'Đơn hàng mới',
    },
  },

  // User List
  USER_LIST: {
    TITLE: 'Danh sách User',
    LOADING: 'Đang tải user...',
    ERROR: 'Không thể tải danh sách user!',
    COLUMNS: {
      ID: 'ID',
      NAME: 'Name',
      EMAIL: 'Email',
    },
  },

  // Product List
  PRODUCT_LIST: {
    TITLE: 'Danh sách sản phẩm',
    COLUMNS: {
      NAME: 'Tên sản phẩm',
      PRICE: 'Giá',
    },
  },

  // Post List
  POST_LIST: {
    TITLE: 'Danh sách bài viết',
    LOADING: 'Đang tải bài viết...',
    ERROR: 'Không thể tải danh sách bài viết!',
    COLUMNS: {
      ID: 'ID',
      TITLE: 'Tiêu đề',
      AUTHOR: 'Tác giả',
      CREATED_AT: 'Ngày tạo',
      USER_ID: 'ID người dùng',
      BODY: 'Nội dung',
    },
  },

  // Common
  COMMON: {
    LOADING: 'Đang tải...',
    ERROR: 'Có lỗi xảy ra',
    SUCCESS: 'Thành công',
    CANCEL: 'Hủy',
    SAVE: 'Lưu',
    DELETE: 'Xóa',
    EDIT: 'Sửa',
    ADD: 'Thêm',
  },
} as const;

// Type cho messages (optional, để TypeScript check)
export type MessageKey = keyof typeof MESSAGES; 