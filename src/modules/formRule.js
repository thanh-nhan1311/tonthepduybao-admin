export const defStringRule = async (_rule, value, cb, label = '', length = 255) => {
  if (!value || value.length > length) {
    const message = `${label} không được để trống và vượt quá ${length} kí tự`
    return Promise.reject(message)
  }
  return Promise.resolve()
}

export const defEmptyRule = async (_rule, value, cb, message) => {
  if (!value) return Promise.reject(message)
  return Promise.resolve()
}

export const defEmptyBranchName = async (_rule, value, cb) =>
  defStringRule(_rule, value, cb, 'Tên chi nhánh')

export const defEmptyCategoryName = async (_rule, value, cb) =>
  defStringRule(_rule, value, cb, 'Tên danh mục', 500)

export const defEmptyPartnerName = async (_rule, value, cb) =>
  defStringRule(_rule, value, cb, 'Tên đối tác', 500)

export const defEmptyAddress = async (_rule, value, cb) =>
  defStringRule(_rule, value, cb, 'Địa chỉ', 1000)

export const defEmptyPhone = async (_rule, value, cb) =>
  defStringRule(_rule, value, cb, 'Số điện thoại', 20)

export const defEmptyManager = async (_rule, value, cb) =>
  defStringRule(_rule, value, cb, 'Tên người đại diện', 255)

export const defEmptyPartnerLogo = async (_rule, value, cb) =>
  defEmptyRule(_rule, value, cb, 'Logo đối tác chưa được chọn')

export const defEmptyCategory = async (_rule, value, cb) =>
  defEmptyRule(_rule, value, cb, 'Tên danh mục chưa được chọn')

export const defEmptyCategoryImage = async (_rule, value, cb) =>
  defEmptyRule(_rule, value, cb, 'Hình ảnh cho danh mục sản phẩm chưa được chọn')
