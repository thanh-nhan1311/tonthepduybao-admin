export const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}

export const normalize = (str) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '')
    .replaceAll('đ', '')
}

export const downloadFromResponse = (headers, data) => {
  const fileName = headers['content-disposition'].replace('attachment;filename=', '')

  const href = URL.createObjectURL(data)
  const link = document.createElement('a')
  link.href = href
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()

  // clean up "a" element & remove ObjectURL
  document.body.removeChild(link)
  URL.revokeObjectURL(href)
}
