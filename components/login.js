import React from 'react';
import axios from 'axios';
import Storage from '../utils/storage';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar, KeyboardAvoidingView, Image, Alert } from 'react-native';

class Login extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: ''
		}
	}
	login = () => {

		axios.post('http://192.168.5.100/api/login.json', {
			username: this.state.username,
			password: this.state.password
		})
		.then(res => res.data)
		.then(res => {
			if(res.success){
				Storage.set('token', res.data.token);
			}else{
				Alert.alert('Erro!', res.errors.join("\n"));
			}
		}).catch(err => console.log(err));
	}
	render() {
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<View style={styles.loginContainer}>
					<Image resizeMode="contain" style={styles.logo} source={require('../assets/images/logo.png')} />
				</View>
				<View style={styles.menu}>
					<StatusBar hidden={true} />
					<TextInput style={styles.input}
						underlineColorAndroid = "transparent"
						autoCapitalize="none" 
						autoCorrect={false} 
						keyboardType='email-address' 
						returnKeyType="next" 
						placeholder='Email'
						placeholderTextColor='rgba(225,225,225,0.7)'
						onSubmitEditing={() => this.passwordInput.focus()} 
						onChangeText={username => this.setState({username})} />

					<TextInput style={styles.input}
						returnKeyType="go"
						underlineColorAndroid = "transparent"
						ref={(input)=> this.passwordInput = input} 
						placeholder='Senha'
						placeholderTextColor='rgba(225,225,225,0.7)'
						secureTextEntry
						onChangeText={password => this.setState({password})} />

					<TouchableOpacity style={styles.buttonContainer} onPress={this.login}>
						<Text style={styles.buttonText}>LOGIN</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    loginContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 100
    },
	menu: {
		padding: 20,
		backgroundColor: '#dc3339'
	},
	input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    buttonContainer:{
        backgroundColor: '#961b20',
        paddingVertical: 15
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }
});

module.exports = Login;