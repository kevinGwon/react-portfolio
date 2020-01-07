// ACTION
export const ACTION_LIST = 'ACTION_LIST';
export const THRILLER_LIST = 'THRILLER_LIST';
export const CRIME_LIST = 'CRIME_LIST';
export const WAR_LIST = 'WAR_LIST';
export const HORROR_LIST = 'HORROR_LIST';
export const ROMANCE_LIST = 'ROMANCE_LIST';
export const ANIMATION_LIST = 'ANIMATION_LIST';

export const ALL_RESET = 'ALL_RESET';
export const LIST_RESET = 'LIST_RESET';
export const LIST_SORT = 'LIST_SORT';

// CATEGORY
export const ACTION = 'ACTION';
export const THRILLER = 'THRILLER';
export const CRIME = 'CRIME';
export const WAR = 'WAR';
export const HORROR = 'HORROR';
export const ROMANCE = 'ROMANCE';
export const ANIMATION = 'ANIMATION';

const date = new Date();
let year, month, day;

year = date.getFullYear();

month =
  String(date.getMonth() + 1).length === 1
    ? '0' + (date.getMonth() + 1)
    : date.getMonth() + 1;
day =
  String(date.getDate()).length === 1
    ? '0' + date.getDate()
    : date.getDate() + 1;

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
      isLoading: true,
      list: [],
    },
    thriller: {
      category: 'thriller',
      code: 53,
      isLoading: true,
      list: [],
    },
    crime: {
      category: 'crime',
      code: 80,
      isLoading: true,
      list: [],
    },
    war: {
      category: 'war',
      code: 10752,
      isLoading: true,
      list: [],
    },
    horror: {
      category: 'horror',
      code: 27,
      isLoading: true,
      list: [],
    },
    romance: {
      category: 'romance',
      code: 10749,
      isLoading: true,
      list: [],
    },
    animation: {
      category: 'animation',
      code: 16,
      isLoading: true,
      list: [],
    },
  },
};

const list = (state = initState, action) => {
  switch (action.type) {
    case ACTION_LIST:
      return {
        ...state,
        genres: {
          ...state.genres,
          action: {
            ...state.genres.action,
            list: [...state.genres.action.list, action.action],
          },
        },
      };
    case THRILLER_LIST:
      return {
        ...state,
        genres: {
          ...state.genres,
          thriller: {
            ...state.genres.thriller,
            list: [...state.genres.thriller.list, action.thriller],
          },
        },
      };
    case CRIME_LIST:
      return {
        ...state,
        genres: {
          ...state.genres,
          crime: {
            ...state.genres.crime,
            list: [...state.genres.crime.list, action.crime],
          },
        },
      };
    case WAR_LIST:
      return {
        ...state,
        genres: {
          ...state.genres,
          war: {
            ...state.genres.war,
            list: [...state.genres.war.list, action.war],
          },
        },
      };
    case HORROR_LIST:
      return {
        ...state,
        genres: {
          ...state.genres,
          horror: {
            ...state.genres.horror,
            list: [...state.genres.horror.list, action.horror],
          },
        },
      };
    case ROMANCE_LIST:
      return {
        ...state,
        genres: {
          ...state.genres,
          romance: {
            ...state.genres.romance,
            list: [...state.genres.romance.list, action.romance],
          },
        },
      };
    case ANIMATION_LIST:
      return {
        ...state,
        genres: {
          ...state.genres,
          animation: {
            ...state.genres.animation,
            list: [...state.genres.animation.list, action.animation],
          },
        },
      };
    case 'LIST_LOADING':
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
      return {
        ...state,
        genres: {
          ...state.genres,
          action: {
            category: 'action',
            list: [...state.genres.average.list, action.average],
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
          // ACTION: [],
        },
      };
    default:
      return state;
  }
};

export default list;
