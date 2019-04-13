import combine from '../../utility/combine';
const initialState = {
  uid: '',
  token: '',
  user: {},
  error: false,
  loading: false
};
function setAuthData(state, data) {
  return combine(state, data);
}
function LOGOUT(state) {
  return initialState;
}
function setLoading(state, loading) {
  if (loading) return combine(state, { loading: true });
  else return combine(state, { loading: false });
}
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH_DATA:
      return setAuthData(state, action.data);
    case SET_LOADING:
      return setLoading(state, action.loading);
    case LOG_OUT:
      return LOGOUT(state);
    default:
      return state;
  }
}

export const SET_AUTH_DATA = 'auth/SET_AUTH_DATA';
export const SET_LOADING = 'auth/SET_LOADING;';
const LOG_OUT = 'auth/LOG_OUT';

export function logOut() {
  localStorage.removeItem('auth');
  return { type: LOG_OUT };
}
