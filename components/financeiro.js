import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar, KeyboardAvoidingView, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutAction } from '../actions';

class Financeiro extends React.Component {
	constructor(props){
		super(props);

		this.logoutAction = props.logoutAction;
	}
	componentWillMount(){
		console.log('componentWillMount');
	}
	componentDidMount(){
		console.log('componentDidMount');
	}
	render() {

		return (
			<View style={styles.container}>
				<StatusBar hidden={true} />
				<Text>Financeiro.</Text>
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
	button: {
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: 'black',
		padding: 10,
	}
});

const mapStateToProps = store => ({
	usuario: store.usuarioState.usuario
});

const mapDispatchToProps = dispatch => bindActionCreators({ logoutAction }, dispatch);

module.exports = connect(mapStateToProps, mapDispatchToProps)(Financeiro);