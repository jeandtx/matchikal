import { StyleSheet } from 'react-native';
import Bouton from '../components/Bouton';
import React from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import axios from 'axios';

export default function MyMatchikals() {

	function filterData(data: JSON) {

		return {
			att1: '',
			att2: {
				att2_1: '',
				att2_2: '',
			},
			att3: '',
		}
	}

	function saveData(filteredData: Object) {
		// if (data is not already saved)
		return
	}

	let array: Array<Object> = [];
	function getSongs(next: string) {
		console.log("getSongs");
		if (window.localStorage.getItem("token") != null) {
			axios({
				method: 'get',
				url: next == '' ? 'https://api.spotify.com/v1/me/tracks' : next,
				headers: {
					'Authorization': 'Bearer ' + window.localStorage.getItem('token')
				}
			}).then(response => {
				array.push(...response.data.items);
				if (response.data.next) {
					getSongs(response.data.next);
				}
				else {
					console.log(array);
					return array;
				}
			});
		} else {
			console.log("User is not connected");
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>MyMatchikals</Text>
			<Bouton text='Call API' test={() => console.log(getSongs(''))} />
			<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
			<EditScreenInfo path="/screens/MyMatchikals.tsx" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
