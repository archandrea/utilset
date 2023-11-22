/**
 * @description: 根据child的id寻找直属parent，找不到返回null
 * @param {Array} tree 树结构
 * @param {*} val id值
 * @param {*} prop id属性名
 * @return {Object} parent 找不到为null
 * @author: xz
 */
export function searchParent(tree, val, prop = 'id') {
  for (let i = 0, len = tree.length; i < len; i++) {
    const children = tree[i]['children']
    if (children && children.length !== 0) {
      const idx = children.findIndex((v) => v[prop] === val)
      if (idx !== -1) return tree[i]
      else {
        const parent = this.searchParent(children, val, prop)
        if (parent) return parent
      }
    }
  }
  return null
}


/**
 * @description: 根据child的id，找出所有parent，包括祖先
 * @param {Array} tree 树结构
 * @param {*} id child的id
 * @param {Array} parents 祖先，调用时不传即可
 * @return {Array} parents 所有祖先，顺序为由外到内
 * @author: xz
 */
export function searchParentsById(tree, id, parents = []) {
  for (let i = 0, len = tree.length; i < len; i++) {
    const children = tree[i]['children']
    if (children && children.length !== 0) {
      const idx = children.findIndex((v) => v['id'] === id)
      parents.push(tree[i]['id'])
      if (idx !== -1) return parents
      else {
        const result = this.searchParentsById(children, id, parents)
        if (result.length !== 0) {
          return result
        } else {
          parents.pop()
        }
      }
    }
  }
  return []
}