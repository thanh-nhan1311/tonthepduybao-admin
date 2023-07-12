export const FALLBACK_IMAGE = '/img/fallback.png'
export const NOT_FOUND_PATH = '/404'

export const PAGING = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 25
}

export const PROP_DEF = {
  OBJECT: {
    type: Object,
    required: false,
    default: null
  },
  OBJECT_REQUIRED: {
    type: Object,
    required: true
  },
  STRING: {
    type: String,
    required: false,
    default: ''
  },
  STRING_REQUIRED: {
    type: String,
    required: true
  },
  BOOLEAN: {
    type: Boolean,
    required: false,
    default: false
  }
}

export const ALL_BRANCH_OPTION = {
  value: -1,
  label: 'Tất cả chi nhánh'
}

export const MSG = {
  SYSTEM_ERROR: 'Hệ thống xử lý lỗi, xin thử lại!',
  UNAUTHORIZED: 'Bạn không có quyền truy cập vào hệ thống, xin hãy đăng nhập!',

  SAVE_SUCCESS: 'Lưu dữ liệu thành công!',

  UPDATE_SUCCESS: 'Cập nhật thành công!',
  DELETE_SUCCESS: 'Dữ liệu đã được xoá thành công!',

  UPDATE_FAILED: 'Cập nhật không thành công!',
  DELETE_FAILED: 'Xoá không thành công!',
  SAVE_FAILED: 'Lưu dữ liệu không thành công!',

  UPLOAD_SUCCESS: 'Tải tệp lên thành công!',
  UPLOAD_FAILED: 'Tải tệp lên thất bại!',

  DELETE_UPLOAD_SUCCESS: 'Xoá tệp thành công!',
  DELETE_UPLOAD_FAILED: 'Xoá tệp thất bại!'
}

export const BRANCH_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
}

export const DEBT_TYPE = {
  STEEL: 'STEEL',
  SCREW: 'SCREW'
}

export const CUSTOMER_TYPE = {
  CUSTOMER: 'CUSTOMER',
  SUPPLIER: 'SUPPLIER'
}

export const SITE_SETTING = {
  MASTER_KEY: {
    HOME: 'HOME',
    ABOUT_US: 'ABOUT_US',
    CONTACT_US: 'CONTACT_US',
    FOOTER: 'FOOTER'
  },
  KEY: {
    BANNER: 'BANNER',
    ABOUT_US: 'ABOUT_US',
    PRODUCT_CATEGORY: 'PRODUCT_CATEGORY',
    PARTNER: 'PARTNER',
    CONTACT_US: 'CONTACT_US'
  },
  DIR: {
    ROOT: 'site/setting',
    BANNER: 'site/setting/banner',
    PRODUCT_CATEGORY: 'site/setting/category'
  }
}
