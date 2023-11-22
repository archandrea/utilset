/**
 * @description: 根据给定的阶梯给数组分级（目前只支持正序），比如：rankArray([0,10,100,200,10000], [1,100,200], 'a') 得到[[0],[10],[100],[200,10000]]
 * 也可以按某个属性分级，比如：rankArray([{a:10},{a:20},{a:30},{a:99},{a:100},], [1,100,200], 'a') 得到[[0],[10],[100],[200,10000]]
 * @param {Array} data 需要分级的数据
 * @param {Array} steps 阶梯（分级的数据项数为阶梯数+1，阶梯的每项包含在大的那部分）
 * @param {String} prop（可选）按该属性分级，未填则按data的项本身分级
 * @return {Array} 分级后的数据
 * @author: xz
 */
export function rankArray(data, steps, prop) {
  if (!data || !steps) {
    return []
  }
  let rankedList = []
  let startIdx = 0
  let endIdx
  let lastIdx = data.length - 1
  steps.forEach((step, i, arr) => {
    let idx = data.findIndex((item) => {
      return prop ? (item[prop] >= step) : (item >= step)
    })
    let rank
    if (idx === -1 && (prop ? data[lastIdx][prop] : data[lastIdx]) < arr[i - 1]) {
      rank = []
    } else {
      if (idx === -1) {
        endIdx = lastIdx + 1
      } else {
        endIdx = idx
      }
      rank = data.slice(startIdx, endIdx)
      startIdx = endIdx
    }
    rankedList.push(rank)
  })
  rankedList.push(data.slice(endIdx))
  return rankedList
}