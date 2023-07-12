export const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}

export const normalize = (str) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '')
    .replaceAll('đ', '')
}
