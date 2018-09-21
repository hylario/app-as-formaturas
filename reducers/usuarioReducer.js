const initialState = {
	logado: false,
	usuario: null
};

export const usuarioReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				logado: true,
				usuario: action.usuario
			};
		case 'LOGOUT':
			return {
				...state,
				logado: false,
				usuario: null
			};
		default:
			return state;
	}
};