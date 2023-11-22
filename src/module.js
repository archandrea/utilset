/**
 * @description: 用于批量导入的工具函数
 * @param {Function} reqCtx 传入require.context(path,subdir,regexp,mode)
 * @return {Object} {filename:module,filename:module,filename:module...} 可以直接分解在vue的components中
 * @author: xz
 */
export function importDir(reqCtx) {
  return reqCtx.keys().reduce((modules, path) => {
    const name = path.match(/\/([^/]+)\./)[1]
    modules[name] = reqCtx(path).default
    return modules
  }, {})
}