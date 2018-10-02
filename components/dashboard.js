import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, StatusBar, KeyboardAvoidingView, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutAction } from '../actions';
import { LabelledText } from '../utils';
import Config from '../config';

class Dashboard extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			codigoFormando: null,
			mesasConvites: []
		};

		this.logoutAction = props.logoutAction;
	}
	componentWillMount(){
		axios.post(Config.apiUrl + 'dashboard_formando.json', {}, {
			headers: {
				'Authorization': 'Bearer ' + this.props.usuario.token,
				'Content-Type': 'application/json'
			},
			json: true
		})
		.then(res => res.data)
		.then(res => {
			if(res.success){
				this.setState(state => ({
					...state,
					...res.data
				}));
			}
		}).catch(err => console.log(err));
	}
	render() {
		const { usuario } = this.props;

		return (
			<ScrollView style={styles.container}>
				<StatusBar hidden={true} />

				<View style={styles.bloco}>
					<Text style={styles.title}>Minha Adesão</Text>
					<View style={styles.conteudoBloco}>
						<LabelledText label="Meu Código" text={this.state.codigoFormando} />
						{(
							this.state.mesasConvites.map((v, i) => <Text key={i}>{v.Evento.titulo}</Text>)
						)}
					</View>
				</View>

				<View style={styles.bloco}>
					<Text style={styles.title}>Próximos Vencimentos</Text>
					<View style={styles.conteudoBloco}>
						<Text>Financeiro</Text>
					</View>
				</View>

			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#eee'
	},
	bloco: {
		margin: 10,
		marginBottom: 0,
		padding: 5,
	},
	title: {
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		padding: 6,
		backgroundColor: '#dc3339',
		color: '#fff',
		fontSize: 26
	},
	conteudoBloco: {
		borderBottomLeftRadius: 8,
		borderBottomRightRadius: 8,
		backgroundColor: '#fff',
		padding: 6,
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

module.exports = connect(mapStateToProps, mapDispatchToProps)(Dashboard);