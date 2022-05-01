
import Colors from '../constants/Colors';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

export default function Screen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Account Informations</Text>

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