export const BRANCH_TABLE_COLUMNS = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Tên/Địa chỉ',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Điện thoại',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: 'Zalo',
    dataIndex: 'zalo',
    key: 'zalo'
  },
  {
    title: 'Đại diện',
    dataIndex: 'manager',
    key: 'manager'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: 'Thao tác',
    key: 'action'
  }
]

export const CUSTOMER_TABLE_COLUMNS = [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no'
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Liên hệ',
    dataIndex: 'contact',
    key: 'contact'
  },
  {
    title: 'Phân loại',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: 'Thao tác',
    key: 'action',
    width: 200
  }
]

export const USER_TABLE_COLUMNS = [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no'
  },
  {
    title: 'Họ và tên',
    dataIndex: 'fullName',
    key: 'fullName'
  },
  {
    title: 'Chi nhánh',
    dataIndex: 'branch',
    key: 'branch'
  },
  {
    title: 'Vai trò',
    dataIndex: 'role',
    key: 'role'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: 'Được tạo lúc',
    dataIndex: 'createdBy',
    key: 'createdBy'
  },
  {
    title: 'Thao tác',
    key: 'action',
    width: 200
  }
]

export const SITE_CONTACT_TABLE_COLUMNS = [
  {
    title: 'No.',
    dataIndex: 'no',
    key: 'no'
  },
  {
    title: 'Họ và tên',
    dataIndex: 'fullName',
    key: 'fullName'
  },
  {
    title: 'Điện thoại',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'resolvedFlag',
    key: 'resolvedFlag'
  },
  {
    title: 'Thao tác',
    key: 'action'
  }
]

export const SITE_CATEGORY_TABLE_COLUMNS = [
  {
    title: 'No.',
    dataIndex: 'no',
    key: 'no'
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'SL sản phảm',
    dataIndex: 'totalProduct',
    key: 'totalProduct'
  },
  {
    title: 'Danh mục cha',
    dataIndex: 'parentName',
    key: 'parentName'
  },
  {
    title: 'Thao tác',
    key: 'action'
  }
]

export const SITE_HOME_PRODUCT_CATEGORY_TABLE_COLUMNS = [
  {
    title: 'No.',
    dataIndex: 'no',
    key: 'no'
  },
  {
    title: 'Danh mục sản phẩm',
    dataIndex: 'category',
    key: 'category'
  },
  {
    title: 'Thao tác',
    key: 'action'
  }
]

export const SITE_PARTNER_TABLE_COLUMNS = [
  {
    title: 'No.',
    dataIndex: 'no',
    key: 'no'
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Thao tác',
    key: 'action'
  }
]

export const PROPERTY_TABLE_COLUMNS = [
  {
    title: 'No.',
    dataIndex: 'no',
    key: 'no',
    width: 100
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Thuộc tính',
    dataIndex: 'properties',
    key: 'properties'
  },
  {
    title: 'Chỉnh sửa gần đây',
    dataIndex: 'lastModified',
    key: 'lastModified'
  },
  {
    title: 'Thao tác',
    key: 'action'
  }
]

export const DEBT_FULL_TABLE_COLUMNS = [
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Chi nhánh',
    dataIndex: 'branch',
    key: 'branch'
  },
  {
    title: 'Thuộc tính',
    dataIndex: 'properties',
    key: 'properties'
  },
  {
    title: 'Số KG',
    dataIndex: 'weight',
    key: 'weight'
  },
  {
    title: 'Số lượng/mét',
    dataIndex: 'quantity',
    key: 'quantity'
  },
  {
    title: 'TT TB',
    dataIndex: 'avgProportion',
    key: 'avgProportion'
  },
  {
    title: 'Đơn giá',
    dataIndex: 'unitPrice',
    key: 'unitPrice'
  },
  {
    title: 'Đơn giá cây/mét',
    dataIndex: 'totalUnitPrice',
    key: 'totalUnitPrice'
  },
  {
    title: 'Thành tiền',
    dataIndex: 'totalPrice',
    key: 'totalPrice'
  },
  {
    title: 'Thao tác',
    key: 'action'
  }
]

export const DEBT_SCREW_TABLE_COLUMNS = [
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Chi nhánh',
    dataIndex: 'branch',
    key: 'branch'
  },
  {
    title: 'Thuộc tính',
    dataIndex: 'properties',
    key: 'properties'
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity',
    key: 'quantity'
  },
  {
    title: 'Đơn giá',
    dataIndex: 'unitPrice',
    key: 'unitPrice'
  },
  {
    title: 'Thành tiền',
    dataIndex: 'totalPrice',
    key: 'totalPrice'
  },
  {
    title: 'Thao tác',
    key: 'action'
  }
]

export const LIST_DEBT_TABLE_COLUMNS = [
  {
    title: 'Mã công nợ',
    dataIndex: 'id',
    key: 'id',
    width: 200
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: 'Nhà cung cấp',
    dataIndex: 'customer',
    key: 'customer'
  },
  {
    title: 'Phân loại',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: 'Tổng nhập',
    dataIndex: 'totalPrice',
    key: 'totalPrice'
  },
  {
    title: 'Chỉnh sửa gần đây',
    dataIndex: 'lastModified',
    key: 'lastModified'
  },
  {
    title: 'Thao tác',
    dataIndex: 'action',
    key: 'action',
    width: 100
  }
]
