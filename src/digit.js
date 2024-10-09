/**
 * @description: 将数字格式化为每三位加“,”的格式，例如：1,000,000.00
 * @param {Number/String} n 需要格式化的数字，如果不是数字会自动转化
 * @return {*} 格式化后的字符串
 * @author: xz
 */
export function formatFigure(n, symbol = ',') {
  const parts = Number(n).toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, symbol)
  return parts.join('.')
}