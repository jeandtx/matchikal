import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import React, { useEffect, useState } from 'react';
import Feed from '../components/Feed';
import SessionCard from '../components/SessionCard';
import Bouton from '../components/Bouton';
import { RootStackScreenProps } from '../types';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:19007');

export default function Session({ navigation }: RootStackScreenProps<'Session'>) {

	let array: Array<Object> = [];
	const [data, setData] = useState(array);


	let a = window.localStorage.getItem('display_name') + '';
	let userNamesArray: any = [{ userName: a, playlist: data }];
	const [name, setName] = useState(userNamesArray);



	function getSongs(next: string) {
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
					return array;
				}
			});
		} else {
			console.log("User is not connected");
		}
	}

	function sendName() {
		let date = new Date();
		let time = date.getTime();
		let MyName = window.localStorage.getItem('display_name') + '';
		// MyName = MyName + time;
		socket.emit('message', { name: MyName });
	}

	function getNames() {
		console.log(name)
	}

	useEffect(() => {

		sendName();
		socket.emit('whosthere', { name: name });
		socket.on("whosthere", (data) => {
			console.log(data);
			console.log(name + "Moi je suis la ");
		});
	}, []);

	useEffect(() => {
		getSongs("");
		socket.on('receive', (data) => {
			data.name.forEach((element: any) => {
				console.log("element", element);
				for (let i = 0; i < userNamesArray.length; i++) {
					if (userNamesArray[i].userName != element.userName) {
						console.log("Is this equel", userNamesArray[i].userName, element.userName);
						userNamesArray.push(element);
						setName([...userNamesArray]);
					} else {
						break;
					}
				}
			});
			console.log("name", name);
		});

		socket.on("whosthere", (data) => {
			console.log(data);
			console.log(name + "Moi je suis la ");
			socket.emit('message', { name: name });
		});
	}, [socket]);

	function displayAllUsers(array: Array<string>) {
		console.log(array);
		return array.map((name: any) => {
			return (
				<div id='caca'>
					<SessionCard spot_user_name={name.userName} spot_user_image={DATA_SESION[0].spot_user_image} spot_user_pourcentage={"100%"} />
				</div>
			);
		})
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
			newArray[index].push(array[index].track.album.name);
			newArray[index].push(array[index].track.external_urls.spotify);
		}
		setData(newArray);
		userNamesArray[0].playlist = newArray;
		setName(userNamesArray);
		console.log(name);
		return newArray;
	}

	function displayPlaylist(array: any) {
		return array.map((song: any) => {
			return (
				<tr key={song} >
					<td>
						<Feed user_name={song[0]} user_image={song[4]} song_name={song[1]} album_name={song[5]} song_url={song[6]} />
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

	return (
		<View style={styles.container}>
			<View style={styles.cardSession}>
				<View>
					<Text style={styles.sessionID}>Session: </Text>
				</View>
				<View style={styles.cardSessionBody}>
					{name.map((name: any) => {
						return (
							<div >
								<SessionCard spot_user_name={name.userName} spot_user_image={DATA_SESION[0].spot_user_image} spot_user_pourcentage={"100%"} />
							</div>
						);
					})}
				</View>
			</View>
			<Bouton text='Leave Session' test={() => {
				console.log('Leaving the session ');
				navigation.replace('Root');
			}} />
			<View style={styles.cardSong}>
				<table  >
					<thead>
						<tr>
							<th >My playlist </th>
						</tr>
					</thead>
					<tbody id='table'>
						{displayPlaylist(data)}
						text {console.log("text", data)}
					</tbody>

				</table>
			</View>

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
