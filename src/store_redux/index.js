import { combineReducers } from 'redux';
import auth from './auth/auth';
import basket from './basket/basket';
import meals from './meals/meals';
export default combineReducers({ auth, basket, meals });
