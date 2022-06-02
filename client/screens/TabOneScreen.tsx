import { Image, StyleSheet, TextInput } from 'react-native';
import Bouton from '../components/Bouton';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import ConfettiCannon from 'react-native-confetti-cannon';

import React, { useEffect } from 'react';
import axios from 'axios';
import { RootStackScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootStackScreenProps<'Root'>) {

	useEffect(() => {
		const hash = window.location.hash;
		let token = window.localStorage.getItem('token');
		if (!token && hash) {
			token = hash.split('#')[1].split('&')[0].split('=')[1];
			window.location.hash = '';
			window.localStorage.setItem('token', token);
		}
		if (token) {
			axios({
				method: 'get',
				url: 'https://api.spotify.com/v1/me',
				headers: {
					'Authorization': 'Bearer ' + token
				}
			}).catch(() => {
				window.localStorage.removeItem('token');
			})
		} else {
			localStorage.clear();
		}
	}, []);

	return (

		<View style={styles.container}>
			<Image source={require('../assets/images/image-removebg-preview.png')} />
			<Text style={styles.title}>MATCHIKAL</Text>
			<View style={styles.separator2} lightColor="grey" darkColor="grey" />
			<Bouton text="Create a Matchikal" test={() => {
				navigation.replace('Session');
			}} />
			<ConfettiCannon count={100} origin={{ x: 0, y: 0 }} />
		</View>
	);
}

const styles = StyleSheet.create({
	sameLine: {
		display: 'flex',
		justifyContent: "space-between",
		flexDirection: 'row',

	},

	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.light.background,
	},
	title: {
		fontSize: 50,
		fontWeight: 'bold',
		color: Colors.light.text,
		marginVertical: 10,

	},
	separator: {
		marginVertical: 0,
		height: 1,
		width: '80%',
		color: "grey",

	},
	separator2: {
		marginVertical: 0,
		height: 1,
		width: '50%',
		color: Colors.dark_violet,

	},
});
