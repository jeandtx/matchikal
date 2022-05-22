import { StyleSheet, TextInput } from 'react-native';
import Bouton from '../components/Bouton';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import React, { useEffect } from 'react';
import axios from 'axios';
import { RootStackScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootStackScreenProps<'Root'>) {

	const [sessionID, setSessionID] = React.useState('');

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
		if (window.localStorage.getItem('session')) {
			navigation.replace('Session');
		}
	}, []);

	function createSession() {
		if (!window.localStorage.getItem('token')) {
			navigation.navigate('Login');
		} else {
			axios({
				method: 'get',
				url: 'http://localhost:8080/api/v1/sessions/user/' + window.localStorage.getItem('id'),
			})
				.then((res: any) => {
					console.log('Session : ' + res.data._id);
					window.localStorage.setItem('session', res.data._id);
					navigation.replace('Session');
				})
				.catch((err) => {
					axios({
						method: 'post',
						url: 'http://localhost:8080/api/v1/sessions',
						data: {
							'creator': window.localStorage.getItem('id'),
							'connected': window.localStorage.getItem('display_name')
						},
					}).then(response => {
						console.log("Created session for user " + window.localStorage.getItem('display_name'));
						createSession();
					}).catch(error => {
						console.log(error);
					});
				});
		}
	}

	function joinSession() {
		axios({
			method: 'get',
			url: 'http://localhost:8080/api/v1/sessions/id/' + sessionID,
		}).then(response => {
			console.log("Joined session " + response.data._id);
			window.localStorage.setItem('session', response.data._id);
			navigation.replace('Session');
		}).catch(() => {
			console.log("Session not found");
		});
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>MATCHIKAL</Text>
			<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
			<Bouton text="Create a Matchikal" test={() => createSession()} />
			<TextInput
				style={{
					height: 80,
					width: '70%',
					borderColor: 'gray',
					borderWidth: 1,
					color: 'white',
					fontSize: 20
				}}
				onChangeText={(input) => setSessionID(input)}
				placeholder="Enter the Session ID"
				value={sessionID}
			/>
			<Bouton text="Join a Mathcikal" test={() => joinSession()} />
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
