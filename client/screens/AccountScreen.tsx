
import Colors from '../constants/Colors';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import Bouton from '../components/Bouton';
import { RootStackScreenProps } from '../types';
import axios from 'axios';

export default function Screen({ navigation }: RootStackScreenProps<'Account'>) {

	useEffect(() => {
		let token = window.localStorage.getItem('token');

		axios({
			method: 'get',
			url: 'https://api.spotify.com/v1/me',
			headers: {
				'Authorization': 'Bearer ' + token
			}
		}).then((r) => {
			if (r.status === 200) {
				axios({
					method: 'get',
					url: 'http://localhost:8080/api/v1/profiles/id/' + r.data.id,
				}).catch((err) => {
					if (err.response.status === 404) {
						console.log("no account in our database. Creating one");
						axios({
							method: 'post',
							url: 'http://localhost:8080/api/v1/profiles',
							data: {
								name: r.data.display_name,
								app: {
									country: r.data.country,
									display_name: r.data.display_name,
									email: r.data.email,
									id: r.data.id,
								}
							}
						}).catch((error) => {
							console.log(error);
						});
					} else {
						console.log(err);
					}
				});
			}
		})
	}, []);

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