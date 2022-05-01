
import Colors from '../constants/Colors';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import Bouton from '../components/Bouton';
import { RootStackScreenProps } from '../types';

export default function Screen({ navigation }: RootStackScreenProps<'Account'>) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Account Informations</Text>
			<Bouton text="Logout" test={() => {
				window.localStorage.removeItem('token');
				navigation.replace('Login');
			}} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-evenly',
		backgroundColor: Colors.dark_violet,


	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	}
});