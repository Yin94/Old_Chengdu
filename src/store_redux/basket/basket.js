import combine from '../../utility/combine';
import { fetchList, deleteItem, clearCart } from '../../db/basket';
const initialState = {
  list: [],
  error: false,
  loading: false,
  succeed: false
};
function setList(state, list, isOrder) {
  if (isOrder)
    return combine(state, { list, erro: false, loading: false, succeed: true });
  else return combine(state, { list, erro: false, loading: false });
}
function LOGOUT(state) {
  return initialState;
}
function loading(state) {
  return combine(state, { loading: true, error: false });
}
function error(state) {
  return combine(state, { error: true });
}
function reset() {
  return combine(initialState);
}
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LIST:
      return setList(state, action.list, action.isOrder);
    case LOG_OUT:
      return LOGOUT(state);
    case SET_LOADING:
      return loading(state);
    case ERROR_LIST:
      return error(state);
    case RESET_STATUS:
      return reset();
    default:
      return state;
  }
}
//
const SET_LIST = 'basket/SET_LIST';
const LOG_OUT = 'basket/LOG_OUT';
const SET_LOADING = 'basket/SET_LOADING';
const ERROR_LIST = 'basket/ERROR_LIST';
const RESET_STATUS = 'basket/RESET_STATUS';

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
//
export function startDeleteItem(id, token) {
  return async dispatch => {
    const err = await deleteItem(id, token);
    if (err) dispatch({ type: ERROR_LIST });
    else dispatch(startFetchList());
  };
}
export function startClearBasket(token) {
  return async dispatch => {
    dispatch({ type: SET_LOADING });
    const list = await clearCart(token);
    if (list instanceof Error) dispatch({ type: ERROR_LIST });
    else dispatch({ type: SET_LIST, list, isOrder: true });
  };
}
export function resetStatus() {
  return { type: RESET_STATUS };
}
