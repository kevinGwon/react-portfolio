import { ALL_RESET } from './list';

export const LOADING = 'load/LOADING';
export const LOADING_OUT = 'load/LOADING_OUT';
export const DAILY = 'load/DAILY';
export const WEEK = 'load/WEEK';

const initState = {
  daily: true,
  loading: false,
};

export const onDaily = () => dispatch => {
  dispatch({
    type: ALL_RESET,
  });
  dispatch({
    type: LOADING_OUT,
  });
  dispatch({
    type: DAILY,
  });
};

export const onWeek = () => dispatch => {
  dispatch({
    type: ALL_RESET,
  });
  dispatch({
    type: LOADING_OUT,
  });
  dispatch({
    type: WEEK,
  });
};

export default function load(state = initState, action) {
  switch (action.type) {
    case 'load/LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'load/LOADING_OUT':
      return {
        ...state,
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
