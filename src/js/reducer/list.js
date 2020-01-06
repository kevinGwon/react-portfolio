// ACTION
export const POPULARITY_LIST = 'list/POPULARITY_LIST';
export const AVERAGE_LIST = 'list/AVERAGE_LIST';
export const ALL_RESET = 'list/ALL_RESET';
export const LIST_RESET = 'list/LIST_RESET';
export const LIST_SORT = 'list/LIST_SORT';

// CATEGORY
export const POPULARITY = 'POPULARITY';
export const AVERAGE = 'AVERAGE';

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
  lists: {
    popularity: {
      category: 'popularity',
      list: [],
    },
    average: {
      category: 'average',
      list: [],
    },
  },
};

const list = (state = initState, action) => {
  switch (action.type) {
    case 'list/POPULARITY_LIST':
      return {
        ...state,
        lists: {
          ...state.lists,
          popularity: {
            ...state.lists.popularity,
            list: [...state.lists.popularity.list, action.popularity],
          },
        },
      };
    case 'list/AVERAGE_LIST':
      return {
        ...state,
        lists: {
          ...state.lists,
          average: {
            ...state.lists.average,
            list: [...state.lists.average.list, action.average],
          },
        },
      };
    case 'list/LIST_RESET':
      return {
        ...state,
        lists: {
          ...state.lists,
          popularity: {
            category: 'popularity',
            list: [...state.lists.average.list, action.average],
          },
        },
      };
    case 'list/LIST_SORT':
      return {
        ...state,
        sort: !state.sort,
      };
    case 'list/ALL_RESET':
      return {
        ...state,
        lists: {
          ...state.lists,
          // popularity: [],
        },
      };
    default:
      return state;
  }
};

export default list;
