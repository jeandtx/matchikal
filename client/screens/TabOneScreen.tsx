import { StyleSheet } from 'react-native';
import Bouton from '../components/Bouton';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
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
		}

	}, []);

	function createSession() {
		console.log('create session');
		if (!window.localStorage.getItem('token')) {
			navigation.replace('Login');
		} else {
			axios({
				method: 'post',
				url: 'http://localhost:8080/api/v1/sessions',
				data: {
					'creator': window.localStorage.getItem('token'),
					'connected': window.localStorage.getItem('token')
				},
			}).then(response => {
				console.log(response);
			}).catch(error => {
				console.log(error);
			});
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>MATCHIKAL</Text>
			<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
			<Bouton text="Create a Matchikal" test={() => createSession()} />
			<Bouton text="Join a Mathcikal" test={() => console.log("Clicked on the Button")} />
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
		backgroundColor: Colors.dark_violet,
	},
	title: {
		fontSize: 25,
		fontWeight: 'bold',
		color: Colors.dark.text,

	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
		color: Colors.dark_violet,

	},
});
