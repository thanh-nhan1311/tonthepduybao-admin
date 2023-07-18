import { isNil, isEmpty, isNumber } from 'lodash'

export const defRule = async (_rule, value, cb, label = '', max = null, min = null) => {
  if (isNil(value) || isEmpty(value.toString().trim()))
    return Promise.reject(`${label} là trường bắt buộc`)
  else if (!isNil(max) && isNumber(max) && value.trim().length > max)
    return Promise.reject(`${label} là trường bắt buộc và không được vượt quá ${max} kí tự`)
  else if (!isNil(min) && isNumber(min) && value.trim().length < min)
    return Promise.reject(`${label} là trường bắt buộc và có ít nhất ${min} kí tự`)

  return Promise.resolve()
}

export const defEmptyBranchName = async (_rule, value, cb) =>
  defRule(_rule, value, cb, 'Tên chi nhánh', 255)

export const defEmptyBranch = async (_rule, value, cb) => defRule(_rule, value, cb, 'Chi nhánh')

export const defEmptyCategoryName = async (_rule, value, cb) =>
  defRule(_rule, value, cb, 'Tên danh mục', 500)

export const defEmptyPartnerName = async (_rule, value, cb) =>
  defRule(_rule, value, cb, 'Tên đối tác', 500)

export const defEmptyAddress = async (_rule, value, cb) =>
  defRule(_rule, value, cb, 'Địa chỉ', 1000)

export const defEmptyPhone = async (_rule, value, cb) =>
  defRule(_rule, value, cb, 'Số điện thoại', 20)

export const defEmptyManager = async (_rule, value, cb) =>
  defRule(_rule, value, cb, 'Tên người đại diện', 255)

export const defEmptyPartnerLogo = async (_rule, value, cb) =>
  defRule(_rule, value, cb, 'Logo đối tác chưa được chọn')

export const defEmptyCategory = async (_rule, value, cb) =>
  defRule(_rule, value, cb, 'Tên danh mục chưa được chọn')

export const defEmptyCategoryImage = async (_rule, value, cb) =>
  defRule(_rule, value, cb, 'Hình ảnh cho danh mục sản phẩm chưa được chọn')

export const defEmptyPropertyName = async (_rule, value, cb) =>
  defRule(_rule, value, cb, 'Tên thuộc tính', 500)

export const defEmptyPropertyDetailName = async (_rule, value, cb) =>
  defRule(_rule, value, cb, 'Tên giá trị thuộc tính', 500)

export const defEmptyCustomerName = async (_rule, value, cb) =>
  defRule(_rule, value, cb, 'Tên khách hàng', 500)

export const defEmptyCustomerType = async (_rule, value, cb) =>
  defRule(_rule, value, cb, 'Phân loại khách hàng')

export const defEmptyFullName = async (_rule, value, cb) => defRule(_rule, value, cb, 'Họ và tên')

export const defEmptyUsername = async (_rule, value, cb) =>
  defRule(_rule, value, cb, 'Tên đăng nhập', 50, 6)

export const defEmptyPassword = async (_rule, value, cb) =>
  defRule(_rule, value, cb, 'Mật khẩu', 100, 8)

export const defEmptyEmail = async (_rule, value, cb) => defRule(_rule, value, cb, 'Email')
