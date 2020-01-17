export const DETAIL_INFO = 'detail/DETAIL_INFO';

const initState = {};

export default function global(state = initState, action) {
  switch (action.type) {
    case DETAIL_INFO:
      console.log(DETAIL_INFO);
      return {
        ...state,
        ...action,
      };
    default:
      return state;
  }
}
