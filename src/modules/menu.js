export const MENU = {
  HOME: {
    id: 'home',
    path: '/',
    name: 'Trang chủ',
    icon: 'ant-design:home-outlined',
    subMenu: null
  },
  SITE_MANAGEMENT: {
    id: 'siteManagement',
    path: null,
    name: 'Quản lý trang',
    icon: 'ant-design:global-outlined',
    subMenu: {
      SM_PRODUCT: {
        id: 'smProduct',
        path: '/sm/product',
        name: 'Sản phẩm'
      },
      SM_PRODUCT_CATEGORY: {
        id: 'smProductCategory',
        path: '/sm/category',
        name: 'Danh mục sản phẩm'
      },
      SM_CONTACT: {
        id: 'smContact',
        path: '/sm/contact',
        name: 'Liên hệ'
      },
      SM_PARTNER: {
        id: 'smPartner',
        path: '/sm/partner',
        name: 'Đối tác'
      },
      SM_COMMON: {
        id: 'smCommon',
        path: '/sm/setting',
        name: 'Cài đặt chung'
      }
    }
  },
  DEBT: {
    id: 'debt',
    path: null,
    name: 'Công nợ',
    icon: 'mdi:file-document-multiple',
    subMenu: {
      LIST_DEBT: {
        id: 'listDebt',
        path: '/debt/list',
        name: 'Danh sách công nợ'
      },
      ADD_DEBT: {
        id: 'addDebt',
        path: '/debt/add',
        name: 'Thêm công nợ'
      }
    }
  },
  CUSTOMER: {
    id: 'customer',
    path: '/customer',
    name: 'Khách hàng',
    icon: 'heroicons:user-group-solid',
    subMenu: null
  },
  PROPERTY: {
    id: 'property',
    path: '/property',
    name: 'Thiết lập thuộc tính',
    icon: 'ic:baseline-settings',
    subMenu: null
  },
  BRANCH: {
    id: 'branch',
    path: '/branch',
    name: 'Chi nhánh',
    icon: 'mdi:store-marker-outline',
    subMenu: null
  },
  PROFILE: {
    id: 'profile',
    path: '/profile',
    name: 'Tài khoản',
    icon: 'ant-design:user',
    subMenu: null
  }
}
