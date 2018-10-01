import {
	LOGIN,
	LOGOUT,
	DASHBOARD,
	FINANCEIRO
} from './actionTypes';

export const loginAction = usuario => ({
	type: LOGIN,
	usuario: usuario
});

export const logoutAction = () => ({
	type: LOGOUT
});

export const viewAction = (view) => {
	switch(view){
		case FINANCEIRO:
			return {
				type: FINANCEIRO
			};
		case DASHBOARD:
		default:
			return {
				type: DASHBOARD
			};
	}
};