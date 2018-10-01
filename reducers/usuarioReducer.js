import Storage from '../utils/storage';
import { LOGIN, LOGOUT } from '../actions/actionTypes';

const initialState = {
	logado: false,
	usuario: null
};

export const usuarioReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			Storage.set('token', action.usuario.token);
			return {
				...state,
				logado: true,
				usuario: action.usuario
			};
		case LOGOUT:
			Storage.set('token', '');
			return {
				...state,
				logado: false,
				usuario: null
			};
		default:
			return state;
	}
};