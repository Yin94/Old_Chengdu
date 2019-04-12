import combine from '../../utility/combine';
import { fetchList, queryMeal } from '../../db/meals';
import { addListItem } from '../../db/basket';
const initialState = {
  list: [],
  cur: {},
  error: false,
  loading: false
};
function setList(state, list) {
  return combine(state, { list, error: false, loading: false });
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
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LIST:
      return setList(state, action.list);

    case SET_LOADING:
      return loading(state);
    case ERROR_LIST:
      return error(state);
    case SET_CURRENT:
      return setCurrent(state, action.meal);
    default:
      return state;
  }
}
//
const SET_LIST = 'meals/SET_LIST';
const SET_LOADING = 'meals/SET_LOADING';
const ERROR_LIST = 'meals/ERROR_LIST';
const SET_CURRENT = 'meals/SET_CURRENT';
//
export function startFetchList(token) {
  return async dispatch => {
    dispatch({ type: SET_LOADING });
    if (!token) token = JSON.parse(localStorage.getItem('auth')).token;
    const list = await fetchList(token);
    if (list instanceof Error) dispatch({ type: ERROR_LIST });
    else dispatch({ type: SET_LIST, list });
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
    const result = await addListItem(id, count, token);
    console.log(result);
  };
}
