
import Colors from '../constants/Colors';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import Bouton from '../components/Bouton';
import { RootStackScreenProps } from '../types';
import axios from 'axios';

export default function Screen({ navigation }: RootStackScreenProps<'Account'>) {

	const [accountData, setAccountData] = React.useState({
		_id: "",
		app: {
			name: "",
			id: "",
			email: "",
			country: ""
		},
		date: "",
		name: ""
	});

	function Loading(error: any) {
		if (error instanceof TypeError) {
			setAccountData({
				_id: "Loading…",
				app: {
					name: "Loading…",
					id: "Loading…",
					email: "Loading…",
					country: "Loading…"
				},
				date: "Loading…",
				name: "Loading…"
			})
		}
	}

	function AddToDatabase(res: any, err: any) {
		try {
			if (err.response.status === 404) {
				console.log("no account in our database. Creating one");
				axios({
					method: 'post',
					url: 'http://localhost:8080/api/v1/profiles',
					data: {
						name: res.data.display_name,
						app: {
							country: res.data.country,
							display_name: res.data.display_name,
							email: res.data.email,
							id: res.data.id,
						}
					}
				}).catch((error) => {
					console.log(error);
				});
			} else {
				console.log(err);
			}

		} catch (error) {
			Loading(error);
		}
	}

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
				}).then((response) => {
					setAccountData(response.data);
				}).catch((err) => {
					AddToDatabase(r, err);
				});
			}
		});

		localStorage.setItem('display_name', accountData.name);
		localStorage.setItem('id', accountData.app.id);

	}, [accountData]);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Account Informations</Text>
			<Text>Maybe try to get a photo from the spotify account</Text>
			<Text>
				ID: {accountData._id} <br />

				date: {accountData.date}<br />
				name: {accountData.name}<br />
			</Text>
			<Text>
				app:<br />
				name: {accountData.app.name}<br />
				id: {accountData.app.id}<br />
				email: {accountData.app.email}<br />
				country: {accountData.app.country}<br />
			</Text>

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