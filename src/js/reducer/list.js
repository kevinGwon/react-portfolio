// CATEGORY
export const ACTION = 'ACTION';
export const THRILLER = 'THRILLER';
export const CRIME = 'CRIME';
export const WAR = 'WAR';
export const HORROR = 'HORROR';
export const ROMANCE = 'ROMANCE';
export const ANIMATION = 'ANIMATION';
export const SEARCH = 'SEARCH';

// ACTION
export const ACTION_LIST = 'list/ACTION_LIST';
export const THRILLER_LIST = 'list/THRILLER_LIST';
export const CRIME_LIST = 'list/CRIME_LIST';
export const WAR_LIST = 'list/WAR_LIST';
export const HORROR_LIST = 'list/HORROR_LIST';
export const ROMANCE_LIST = 'list/ROMANCE_LIST';
export const ANIMATION_LIST = 'list/ANIMATION_LIST';
export const SEARCH_LIST = 'list/SEARCH_LIST';
export const LOADING_LIST = 'list/LOADING_LIST';
export const ALL_RESET = 'list/ALL_RESET';
export const LIST_RESET = 'list/LIST_RESET';
export const LIST_SORT = 'list/LIST_SORT';
export const LIST_ERROR = 'list/LIST_ERROR';
export const LIST_ERROR_CLEAR = 'list/LIST_ERROR_CLEAR';

export const actionList = () => ({
  type: ACTION_LIST,
});
export const thrillerList = () => ({
  type: THRILLER_LIST,
});
export const crimeList = () => ({
  type: CRIME_LIST,
});
export const warList = () => ({
  type: WAR_LIST,
});
export const horrorList = () => ({
  type: HORROR_LIST,
});
export const romanceList = () => ({
  type: ROMANCE_LIST,
});
export const animationList = () => ({
  type: ANIMATION_LIST,
});
export const searchList = () => ({
  type: SEARCH_LIST,
});
export const loadingList = ({ category, isLoading }) => ({
  type: LOADING_LIST,
  category: category,
  isLoading: isLoading,
});
export const allReset = () => ({
  type: ALL_RESET,
});
export const listReset = () => ({
  type: LIST_RESET,
});
export const listSort = () => ({
  type: LIST_SORT,
});
export const listError = error => ({
  type: LIST_ERROR,
  error,
});
export const listErrorClear = () => ({
  type: LIST_ERROR_CLEAR,
});

// Thunk
export const resetList = payload => dispatch => {
  dispatch({
    type: LIST_RESET,
    category: payload.category,
  });
};

const date = new Date();
let year, month, day;

year = date.getFullYear();

month =
  String(date.getMonth() + 1).length === 1
    ? '0' + (date.getMonth() + 1)
    : date.getMonth() + 1;
day =
  String(date.getDate()).length === 1 ? '0' + date.getDate() : date.getDate();

// 매년 초 데이터 기록이 없을때, 이전 연도의 초기값으로 설정
if (parseInt(month, 10) === 1 && parseInt(day, 10) < 7) {
  year = year - 1;
  month = 12;
  day = 27;
}

const initState = {
  year: year,
  month: month,
  day: day,
  sort: false,
  genres: {
    action: {
      category: 'action',
      code: 28,
      isLoading: false,
      list: [],
    },
    thriller: {
      category: 'thriller',
      code: 53,
      isLoading: false,
      list: [],
    },
    crime: {
      category: 'crime',
      code: 80,
      isLoading: false,
      list: [],
    },
    war: {
      category: 'war',
      code: 10752,
      isLoading: false,
      list: [],
    },
    horror: {
      category: 'horror',
      code: 27,
      isLoading: false,
      list: [],
    },
    romance: {
      category: 'romance',
      code: 10749,
      isLoading: false,
      list: [],
    },
    animation: {
      category: 'animation',
      code: 16,
      isLoading: false,
      list: [],
    },
    search: {
      category: 'search',
      isLoading: false,
      list: [],
    },
  },
  error: null,
};

const list = (state = initState, action) => {
  switch (action.type) {
    case ACTION_LIST:
    case THRILLER_LIST:
    case CRIME_LIST:
    case WAR_LIST:
    case HORROR_LIST:
    case ROMANCE_LIST:
    case ANIMATION_LIST:
      const category = action.category;
      return {
        ...state,
        genres: {
          ...state.genres,
          [category]: {
            ...state.genres[category],
            list: [...state.genres[category].list, action[category]],
          },
        },
      };
    case SEARCH_LIST:
      return {
        ...state,
        genres: {
          ...state.genres,
          search: {
            ...state.genres.search,
            list: [...state.genres.search.list, action.search],
          },
        },
      };
    case LOADING_LIST:
      return {
        ...state,
        genres: {
          ...state.genres,
          [action.category]: {
            ...state.genres[action.category],
            isLoading: action.isLoading,
          },
        },
      };
    case LIST_RESET:
      const resetCategory = action.category;
      console.log(`Reset ${resetCategory}`);
      return {
        ...state,
        genres: {
          ...state.genres,
          [resetCategory]: {
            ...state.genres[resetCategory],
            isLoading: false,
            list: [],
          },
        },
      };
    case LIST_SORT:
      return {
        ...state,
        sort: !state.sort,
      };
    case ALL_RESET:
      return {
        ...state,
        genres: {
          ...state.genres,
        },
      };
    case LIST_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case LIST_ERROR_CLEAR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default list;
