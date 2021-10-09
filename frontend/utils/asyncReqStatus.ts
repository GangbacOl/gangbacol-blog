export default {
  // 초기 상태
  initial: (initialData = null) => ({
    loading: false,
    data: initialData,
    error: null,
  }),
  // 로딩중 상태
  loading: (prevState = null) => ({
    loading: true,
    data: prevState,
    error: null,
  }),
  // 성공 상태
  success: (data: object) => ({
    loading: false,
    data,
    error: null,
  }),
  // 실패 상태
  failure: (error: object) => ({
    loading: false,
    data: null,
    error,
  }),
};
