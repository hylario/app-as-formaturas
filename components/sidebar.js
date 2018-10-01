import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar, KeyboardAvoidingView, Image, Alert, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutAction, viewAction } from '../actions';
import { DASHBOARD, FINANCEIRO, LOGOUT } from '../actions/actionTypes';

import { ListItem, Avatar } from 'react-native-elements';

class Sidebar extends React.Component {
	constructor(props){
		super(props);

		this.logoutAction = props.logoutAction;
		this.viewAction = props.viewAction;
		this.closeDrawer = props.closeDrawer;
	}
	setView = (view) => {
		this.closeDrawer();
		this.viewAction(view);
	}
	render() {

		const { usuario } = this.props;

		const items = [
			{id: DASHBOARD, title: "Dashboard", subtitle: null, hideChevron: false, press: () => this.setView(DASHBOARD)},
			{id: FINANCEIRO, title: "Financeiro", subtitle: null, hideChevron: false, press: () => this.setView(FINANCEIRO)},
			{id: LOGOUT, title: "Sair", subtitle: null, hideChevron: true, press: () => this.logoutAction()},
		];

		return (
			<ScrollView style={styles.container}>
				<View style={styles.logoContainer}>
					<Avatar
						rounded
						xlarge
						source={{uri: usuario.foto}}
						onPress={() => console.log("Works!")}
						activeOpacity={0.7}
						/>
				</View>
				<View>
					{items.map( (item, i) => (
						<ListItem
							key={i}
							containerStyle={styles.item}
							titleStyle={styles.itemText}
							title={item.title}
							hideChevron={item.hideChevron}
							subtitle={item.subtitle}
							onPress={item.press} />
					) )}
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#dc3339',
		borderStyle: 'solid',
		borderRightWidth: 1,
		borderColor: '#aaa' 
	},
	logoContainer: {
		height: 180,
		alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
	},
	logo: {
        position: 'absolute',
        width: 200,
        height: 80
    },
    item: {
    	backgroundColor: '#fff',
    },
    itemText: {
    	fontSize: 20
    }
});

const mapStateToProps = store => ({
	usuario: store.usuarioState.usuario
});

const mapDispatchToProps = dispatch => bindActionCreators({ logoutAction, viewAction }, dispatch);

module.exports = connect(mapStateToProps, mapDispatchToProps)(Sidebar);