import React from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator, StatusBar } from 'react-native';
import axios from 'axios';
import Storage from './utils/storage';
import { Login, Dashboard, Financeiro, Sidebar, Topbar } from './components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginAction } from './actions';
import Drawer from 'react-native-drawer';

class Main extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			loading: true
		};
	}
	componentWillMount(){

	}
	componentDidMount(){

		// Storage.set('token', '');

		Storage.get('token').then(token => {
			if(token){
				console.log("Token salvo no Storage: " + token);
				axios.post('http://192.168.5.100/api/autenticar.json', {
					token
				})
				.then(res => res.data)
				.then(res => {
					if(res.success){
						this.props.loginAction(res.data);
					}else if(res.hasOwnProperty('errors')){
						Alert.alert('Erro!', res.errors.join("\n"));
					}else{
						Alert.alert('Erro!', 'Erro ao efetuar login.');
						console.log(res);
					}
					this.setState({loading: false});
				}).catch(err => console.log(err));
			}else{

				this.setState({loading: false});
			}
		});
	}

	closeControlPanel = () => {
		this._drawer.close();
	}

	openControlPanel = () => {
		this._drawer.open();
	}

	render() {
		const loading = this.state.loading;
		const { logado, usuario, view } = this.props;
		let currentView = null;
		
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

		switch(view){
			case 'financeiro':
				currentView = <Financeiro />;
				break;
			case 'dashboard':
			default:
				currentView = <Dashboard />;
		}

		return (
			<Drawer
				ref={ref => this._drawer = ref}
				content={
					<Sidebar closeDrawer={this.closeControlPanel} />
				}
				onClose={this.closeControlPanel}
				openDrawerOffset={(viewport) => {
					return 70
				}}
				tapToClose
				>
				<Topbar openDrawer={this.openControlPanel} />
				{currentView}
			</Drawer>
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

const mapStateToProps = store => ({
	logado: store.usuarioState.logado,
	usuario: store.usuarioState.usuario,
	view: store.viewState.view
});

const mapDispatchToProps = dispatch => bindActionCreators({ loginAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
