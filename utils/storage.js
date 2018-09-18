import React from 'react';
import { AsyncStorage } from "react-native";

class Storage extends React.Component{

	set = async (index, value) => {
		try{
			const promise = await AsyncStorage.setItem(index, value);

			return promise;
		}catch(error){
			console.log(error);
		}
	}

	get = async (index) => {
		try{
			const value = await AsyncStorage.getItem(index);

			return value;
		}catch(error){
			console.log(error);
		}
	}
}

module.exports = new Storage();