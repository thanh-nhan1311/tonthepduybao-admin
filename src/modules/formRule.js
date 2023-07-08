import { isNil, isEmpty, isNumber } from 'lodash'

export const defRule = async (_rule, value, cb, label = '', length = null) => {
  if (isNil(value) || isEmpty(value.toString().trim()))
    return Promise.reject(`${label} là trường bắt buộc`)
  else if (!isNil(length) && isNumber(length) && value.trim().length > length)
    return Promise.reject(`${label} là trường bắt buộc và không được vượt quá ${length} kí tự`)

  return Promise.resolve()
}

export const defEmptyBranchName = async (_rule, value, cb) =>
  defRule(_rule, value, cb, 'Tên chi nhánh')

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
