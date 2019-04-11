import { combineReducers } from 'redux';
import auth from './auth/auth';
import basket from './basket/basket';

export default combineReducers({ auth, basket });
