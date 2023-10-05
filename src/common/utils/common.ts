export const formatDate = (date: Date): string => {

  const local = new Date(date)
  const day = local.getDate()
  const month = local.getMonth() + 1
  const year = local.getFullYear()

  return (
    (day <= 9 ? '0' + day : day) + '-' +
    (month <= 9 ? '0' + month : month) + '-' +
    year
  )
}