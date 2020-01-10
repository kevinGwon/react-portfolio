export const ONCE_LOADING = 'ONCE_LOADING';

const initState = {
  onceLoading: false,
};

export default function global(state = initState, action) {
  switch (action.type) {
    case ONCE_LOADING:
      return {
        ...state,
        onceLoading: true,
      };
    default:
      return state;
  }
}
