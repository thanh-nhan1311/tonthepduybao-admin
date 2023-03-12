export const defBranchNameRule = async (_rule, value) => {
  if (!value || value.length > 255)
    return Promise.reject('Tên chi nhánh không được để trống và vượt quá 255 kí tự')
  return Promise.resolve()
}

export const defCategoryNameRule = async (_rule, value) => {
  if (!value || value.length > 255)
    return Promise.reject('Tên danh mục không được để trống và vượt quá 500 kí tự')
  return Promise.resolve()
}

export const defAddressRule = async (_rule, value) => {
  if (!value || value.length > 1000)
    return Promise.reject('Địa chỉ không được để trống và vượt quá 1000 kí tự')
  return Promise.resolve()
}

export const defPhoneRule = async (_rule, value) => {
  if (!value || value.length > 20)
    return Promise.reject('Số điện thoại không được để trống và vượt quá 20 kí tự')
  return Promise.resolve()
}

export const defManagerRule = async (_rule, value) => {
  if (!value || value.length > 255)
    return Promise.reject('Tên người đại diện không được để trống và vượt quá 255 kí tự')
  return Promise.resolve()
}
