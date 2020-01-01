export const LOADING = 'load/LOADING';
export const LOADING_OUT = 'load/LOADING_OUT';
export const DAILY = 'load/DAILY';
export const WEEK = 'load/WEEK';

const initState = {
  daily: true,
  loading: false,
};

export const onLoading = dispatch =>
  dispatch({
    type: LOADING,
    loading: false,
  });

export const onLoadingOut = dispatch =>
  dispatch({
    type: LOADING_OUT,
    loading: true,
  });

export default function load(state = initState, action) {
  switch (action.type) {
    case 'load/LOADING':
      return {
        loading: true,
      };
    case 'load/LOADING_OUT':
      return {
        loading: false,
      };
    case 'load/DAILY':
      return {
        ...state,
        daily: true,
      };
    case 'load/WEEK':
      return {
        ...state,
        daily: false,
      };
    default:
      return state;
  }
}
