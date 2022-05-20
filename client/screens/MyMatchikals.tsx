import { StyleSheet } from 'react-native';
import Bouton from '../components/Bouton';
import React from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import axios from 'axios';

export default function MyMatchikals() {

	function filterData(array: any) {

		let newArray: Array<Array<string>> = []
		for (let index = 0; index < array.length; index++) {
			newArray.push([])
			newArray[index].push(array[index].track.artists[0].name)
			newArray[index].push(array[index].track.name)
			newArray[index].push(array[index].track.popularity)
			newArray[index].push(array[index].added_at)
		}
		console.log(newArray);

		return newArray;
	}

	function ArrayArtistComparaison(a1: Array<string>, a2: Array<string>) {
		let cpt1 = 0
		let cpt2 = 0
		let checkcpt1 = 0
		let checkpt2 = 0

		let checkList = []
		let checkList2 = []

		for (let i1 = 0; i1 < a1.length; i1++) {
			if (checkList.indexOf((a1[i1][0])) != -1) {
				checkcpt1++

				continue
			}
			checkList[i1 - checkcpt1] = a1[i1][0]

			for (let i2 = 0; i2 < a2.length; i2++) {
				if (a1[i1][0] == a2[i2][0]) {
					cpt2++
				}

			}

		}
		for (let i1 = 0; i1 < a2.length; i1++) {
			if (checkList2.indexOf(a2[i1][0]) != -1) {
				checkpt2++
				continue
			}
			checkList2[i1 - checkpt2] = a2[i1][0]
			for (let i2 = 0; i2 < a1.length; i2++) {
				if (a2[i1][0] == a1[i2][0]) {
					cpt1++
				}

			}

		}
		return 100 * ((cpt1 / a1.length + cpt2 / a2.length) / 2);

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
					filterData(array);
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
