import { usuarioReducer } from './usuarioReducer';
import { viewReducer } from './viewReducer';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
 	usuarioState: usuarioReducer,
 	viewState: viewReducer
});