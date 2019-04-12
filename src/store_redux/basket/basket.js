import combine from '../../utility/combine';
import { fetchList } from '../../db/basket';
const initialState = {
  list: [],
  error: false,
  loading: false
};
function setList(state, list) {
  return combine(state, { list, erro: false, loading: false });
}
function LOGOUT(state) {
  return initialState;
}
function loading(state) {
  return combine(state, { loading: true });
}
function error(state) {
  return combine(state, { error: true });
}
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LIST:
      return setList(state, action.list);
    case LOG_OUT:
      return LOGOUT(state);
    case SET_LOADING:
      return loading(state);
    case ERROR_LIST:
      return error(state);
    default:
      return state;
  }
}
//
const SET_LIST = 'basket/SET_LIST';
const LOG_OUT = 'basket/LOG_OUT';
const SET_LOADING = 'basket/SET_LOADING';
const ERROR_LIST = 'basket/ERROR_LIST';
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
