import combine from '../../utility/combine';
import { fetchList, queryMeal } from '../../db/meals';
import { addListItem } from '../../db/basket';
const initialState = {
  list: [],
  cur: {},
  totalCount: 0,
  error: false,
  pageIndex: 0,
  succeed: false,
  loading: false,
  firstSearch: true
};
function setList(state, list, pageIndex) {
  return combine(state, {
    list,
    error: false,
    succeed: true,
    loading: false,
    pageIndex
  });
}

function loading(state) {
  return combine(state, { loading: true });
}
function error(state) {
  return combine(state, { error: true });
}
function setCurrent(state, cur) {
  return combine(state, { cur }, { error: false, loading: false });
}
function setCount(state, totalCount) {
  return combine(state, { totalCount, error: false, loading: false });
}
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LIST:
      return setList(state, action.list, action.pageIndex);

    case SET_LOADING:
      return loading(state);
    case ERROR_LIST:
      return error(state);
    case SET_CURRENT:
      return setCurrent(state, action.meal);
    case SET_COUNT:
      return setCount(state, action.totalCount);
    default:
      return state;
  }
}
//
const SET_LIST = 'meals/SET_LIST';
const SET_LOADING = 'meals/SET_LOADING';
const ERROR_LIST = 'meals/ERROR_LIST';
const SET_CURRENT = 'meals/SET_CURRENT';
const SET_COUNT = 'meals/SET_COUNT';
//
export function startFetchList(pageIndex, query, firstSearch = true) {
  return async dispatch => {
    dispatch({ type: SET_LOADING });
    if (firstSearch) {
      const totalCount = await fetchList(1, 0, query);
      dispatch({ type: SET_COUNT, totalCount });
    }
    const list = await fetchList(0, pageIndex, query);
    if (list instanceof Error) dispatch({ type: ERROR_LIST });
    else dispatch({ type: SET_LIST, list, pageIndex });
  };
}

export function startQueryMeal(id) {
  return async dispatch => {
    const meal = await queryMeal(id);
    if (meal instanceof Error) dispatch({ type: ERROR_LIST });
    else dispatch({ type: SET_CURRENT, meal });
  };
}

export function startAddToBasket(id, count, token) {
  return async dispatch => {
    await addListItem(id, count, token);
  };
}
