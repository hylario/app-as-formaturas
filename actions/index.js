export const loginAction = usuario => ({
	type: 'LOGIN',
	usuario: usuario
});

export const logoutAction = () => ({
	type: 'LOGIN'
});