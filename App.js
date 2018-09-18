import React from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator, StatusBar } from 'react-native';
import axios from 'axios';
import Storage from './utils/storage';
import Login from './components/login';

export default class App extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			nome: '',
			logado: false,
			loading: true
		};
	}
	componentWillMount(){

	}
	componentDidMount(){

		Storage.set('token', '');

		Storage.get('token').then(token => {
			if(token){
				axios.post('http://192.168.5.100/api/autenticar.json', {
					token
				})
				.then(res => res.data)
				.then(res => {
					console.log(res);
					if(res.success){
						Storage.set('token', res.data.token);
						this.setState({
							nome: res.data.nome,
							logado: true
						});
					}else{
						Alert.alert('Erro!', res.errors.join("\n"));
					}
					this.setState({loading: false});
				}).catch(err => console.log(err));
			}else{

				this.setState({loading: false});
			}
		});
	}
	render() {
		const loading = this.state.loading;
		const logado = this.state.logado;
		
		if(loading){
			return (
				<View style={styles.container}>
					<ActivityIndicator size="large" color="#dc3339" />
				</View>
			);
		}

		if(!logado){
			return (
				<Login />
			);
		}

		return (
			<View style={styles.container}>
				<StatusBar hidden={true} />
				<Text>Está logado.</Text>
				<Text>{this.state.nome}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
