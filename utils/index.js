import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

export class LabelledText extends React.Component{
	render(){
		return (
			<View style={{flex: 1, flexDirection: 'row'}}>
				<Text style={{flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}>{this.props.label}</Text>
				<Text style={{flex: 1, textAlign: 'center', fontSize: 20}}>{this.props.text}</Text>
			</View>
		);
	}
};