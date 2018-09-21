import React from 'react';
import Main from './Main';

import { Provider } from 'react-redux';
import { Store } from './store';

export default class App extends React.Component {
	render() {
		return (
			<Provider store={Store}>
				<Main />
			</Provider>
		);
	}
}
