const initState = {
  query: [],
  list: []
};

export default function list(state = initState, action) {
  switch (action.type) {
    case 'KOFIC_DATA':
      // 영화순위 목록
      action.data.map(item =>
        state.query.push({
          rank: item.rank,
          query: item.movieNm
        })
      );
      return {
        ...state,
        koficDATA: action.data
      };
    case 'KMDB_DATA':
      return {
        ...state,
        kmdbDATA: action.data,
        list: [...state.list, action.list]
      };
    default:
      return state;
  }
}
