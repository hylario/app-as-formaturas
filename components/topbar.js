import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar, KeyboardAvoidingView, Image, Alert, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutAction } from '../actions';
import { Icon } from 'react-native-elements';

class Topbar extends React.Component {
	constructor(props){
		super(props);
	}
	render() {
		const { openDrawer, usuario } = this.props;

		return (
			<View style={styles.container}>
				<Icon reverse name='navicon' type='font-awesome' color='#dc3339' onPress={openDrawer} />
				<Text style={{color: '#fff'}}>{usuario.nome}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height: 60,
		backgroundColor: '#dc3339',
	},
	controlText: {
		color: 'white',
	},
	button: {
		paddingLeft: 10,
	},
});

const mapStateToProps = store => ({
	usuario: store.usuarioState.usuario
});

const mapDispatchToProps = dispatch => bindActionCreators({ logoutAction }, dispatch);

module.exports = connect(mapStateToProps, mapDispatchToProps)(Topbar);