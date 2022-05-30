import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import React, { useEffect } from 'react';
import Feed from '../components/Feed';
import SessionCard from '../components/SessionCard';
// import Song from '../components/Song';
import Bouton from '../components/Bouton';
import { RootStackScreenProps } from '../types';
import axios from 'axios';

export default function Session({ navigation }: RootStackScreenProps<'Session'>) {
	let array: Array<Object> = [];
	const [data, setData] = React.useState(array);

	function getSongs(next: string) {
		console.log("getSongs");
		if (window.localStorage.getItem("token") != null) {
			axios({
				method: "get",
				url: next == "" ? "https://api.spotify.com/v1/me/tracks" : next,
				headers: {
					Authorization:
						"Bearer " + window.localStorage.getItem("token"),
				},
			}).then((response) => {
				array.push(...response.data.items);
				if (response.data.next) {
					getSongs(response.data.next);
				} else {
					array = filterData(array);
					console.log(array);
					return array;
				}
			});
		} else {
			console.log("User is not connected");
		}
	}

	function filterData(array: any) {
		let newArray: Array<Array<string>> = [];
		for (let index = 0; index < array.length; index++) {
			newArray.push([]);
			newArray[index].push(array[index].track.artists[0].name);
			newArray[index].push(array[index].track.name);
			newArray[index].push(array[index].track.popularity);
			newArray[index].push(array[index].added_at);
			newArray[index].push(array[index].track.album.images[0].url);

		}
		console.log(newArray);
		setData(newArray);
		return newArray;
	}

	function displayPlaylist(array: any) {
		return array.map((song: any) => {
			return (
				<tr>
					<td>
						<Feed user_name={song[0]} user_image={song[4]} song_name={song[1]} />
					</td>
				</tr>
			)
		});
	}

	function ArrayArtistComparaison(a1: Array<string>, a2: Array<string>) {
		let cpt1 = 0;
		let cpt2 = 0;
		let checkcpt1 = 0;
		let checkpt2 = 0;

		let checkList = [];
		let checkList2 = [];

		for (let i1 = 0; i1 < a1.length; i1++) {
			if (checkList.indexOf(a1[i1][0]) != -1) {
				checkcpt1++;

				continue;
			}
			checkList[i1 - checkcpt1] = a1[i1][0];

			for (let i2 = 0; i2 < a2.length; i2++) {
				if (a1[i1][0] == a2[i2][0]) {
					cpt2++;
				}
			}
		}
		for (let i1 = 0; i1 < a2.length; i1++) {
			if (checkList2.indexOf(a2[i1][0]) != -1) {
				checkpt2++;
				continue;
			}
			checkList2[i1 - checkpt2] = a2[i1][0];
			for (let i2 = 0; i2 < a1.length; i2++) {
				if (a2[i1][0] == a1[i2][0]) {
					cpt1++;
				}
			}
		}
		return 100 * ((cpt1 / a1.length + cpt2 / a2.length) / 2);
	}

	const DATA_SESION = [
		{

			spot_user_name: 'Jean DTX',
			spot_user_image: 'http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTssjb3qfVuEAJEU4wXmQcBDruj2nNCG-FozpRmRSqqas92aG2thRbDeEAtVG94',
			spot_user_pourcentage: '68%',

		},
		{
			spot_user_name: 'Nicolas',
			spot_user_image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Johnny_Depp_Deauville_2019.jpg/640px-Johnny_Depp_Deauville_2019.jpg',
			spot_user_pourcentage: '70%',

		},
		{
			spot_user_name: 'Tristan Duong',
			spot_user_image: 'https://fr.web.img6.acsta.net/pictures/18/06/25/11/43/5547709.jpg',
			spot_user_pourcentage: '37%',

		},
	]

	const [sessionID, setSessionID] = React.useState('No session');

	useEffect(() => {
		const id = window.localStorage.getItem('session') || 'No session';
		console.log('sessionID', id);
		setSessionID(id);

		let a: any = getSongs("");
		console.log(a);
	}, []);

	function leaveSession() {
		axios({
			method: 'get',
			url: 'http://localhost:8080/api/v1/sessions/id/' + sessionID,
		}).then((res) => {
			if (res.data.creator == window.localStorage.getItem('id')) {
				axios({
					method: 'delete',
					url: 'http://localhost:8080/api/v1/sessions/',
					data: {
						id: sessionID
					}
				}).then((res) => {
					console.log(window.localStorage.getItem('display_name') + ' Ended the session ' + sessionID);
					window.localStorage.removeItem('session');
					navigation.navigate('Root');
				})
			} else {
				console.log(window.localStorage.getItem('display_name') + ' Leaved the session ' + sessionID);
				window.localStorage.removeItem('session');
				navigation.replace('Root');
			}
		})
	}

	return (
		<View style={styles.container}>
			<View style={styles.cardSession}>
				<View>
					<Text style={styles.sessionID}>Session: {sessionID} </Text>
				</View>
				<View style={styles.cardSessionBody}>
					<SessionCard spot_user_name={DATA_SESION[0].spot_user_name} spot_user_image={DATA_SESION[0].spot_user_image} spot_user_pourcentage={DATA_SESION[0].spot_user_pourcentage} />
				</View>
			</View>
			<View style={styles.cardSong}>
				<table  >
					<thead>
						<tr>
							<th >My playlist</th>
						</tr>
					</thead>
					<tbody id='table'>
						{displayPlaylist(data)}
					</tbody>
				</table>
			</View>
			<Bouton text='Leave Session' test={() => {
				console.log('Leaving the session ' + sessionID);
				leaveSession();
			}} />
		</View >
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#0a0345',
	},
	cardSession: {
		backgroundColor: '#eee',
		padding: 10,
		margin: 10,
		borderRadius: 10,
	},
	cardSong: {
		backgroundColor: '#eee',
		padding: 10,
		margin: 10,
		borderRadius: 10,
	},
	sessionID: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 15,
		color: '#000',
		fontWeight: 'bold',
		backgroundColor: '#eee',
	},
	cardSessionBody: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#eee',

	}
});
