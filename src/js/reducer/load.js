export const LOADING = 'load/LOADING';
export const LOADING_OUT = 'load/LOADING_OUT';
export const DETAIL_ON = 'load/DETAIL_ON';
export const DETAIL_OUT = 'load/DETAIL_OUT';

const initState = {
  isLoading: true,
  isDetail: false,
};

export default function load(state = initState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LOADING_OUT:
      return {
        ...state,
        isLoading: false,
      };
    case DETAIL_ON:
      return {
        ...state,
        isDetail: true,
      };
    case DETAIL_OUT:
      return {
        ...state,
        isDetail: false,
      };
    default:
      return state;
  }
}
