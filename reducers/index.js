import { usuarioReducer } from './usuarioReducer';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
 	usuarioState: usuarioReducer
});