import moment from 'moment'

export default () => {
  const MOMENT_FORMAT = {
    YYYYMMDDHHmmss: 'YYYYMMDDHHmmss',
    YYYY_MM_DD_HH_mm_ss: 'DD/MM/YYYY HH:mm:ss'
  }

  const mFormat = (value) => {
    return moment(value, MOMENT_FORMAT.YYYYMMDDHHmmss).format(MOMENT_FORMAT.YYYY_MM_DD_HH_mm_ss)
  }

  const mBuild = (value) => {
    return moment(value, MOMENT_FORMAT.YYYY_MM_DD_HH_mm_ss).format(MOMENT_FORMAT.YYYYMMDDHHmmss)
  }

  return {
    MOMENT_FORMAT,
    mFormat,
    mBuild
  }
}
