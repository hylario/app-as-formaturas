import { DASHBOARD, FINANCEIRO } from '../actions/actionTypes';

const initialState = {
	view: null
};

export const viewReducer = (state = initialState, action) => {
	switch (action.type) {
		case DASHBOARD:
			return {
				...state,
				view: 'dashboard'
			};
		case FINANCEIRO:
			return {
				...state,
				view: 'financeiro'
			};
		default:
			return state;
	}
};