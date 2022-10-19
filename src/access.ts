/**
 * 按照初始化数据定义项目中的权限，统一管理
 * 参考文档 https://next.umijs.org/docs/max/access
 * @param initialState
 */
export default (initialState: InitialState) => {
  const canUser = !!initialState.loginUser;
  const canAdmin =
    initialState.loginUser && initialState.loginUser.userRole === 'admin';
  return {
    canUser,
    canAdmin,
  };
};
