import { StyleSheet } from "react-native";
import Bouton from "../components/Bouton";
import React from "react";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import axios from "axios";
import SessionFeed from "../components/SessionFeed";
import SessionCard from "../components/SessionCard";

export default function MyMatchikals() {
	const DATA = [
		{
			user_name: "Freeze Corleone",
			user_image:
				"https://www.booska-p.com/wp-content/uploads/2021/12/freeze-corleone-sa-pp-qui-vaut-de-l-or-1024x750.jpg",
			song_name: "Freeze Raël",
		},
		{
			user_name: "Freeze Corleone",
			user_image:
				"https://www.booska-p.com/wp-content/uploads/2021/12/freeze-corleone-sa-pp-qui-vaut-de-l-or-1024x750.jpg",
			song_name: "Gaucho",
		},
		{
			user_name: "Freeze Corleone",
			user_image:
				"https://www.booska-p.com/wp-content/uploads/2021/12/freeze-corleone-sa-pp-qui-vaut-de-l-or-1024x750.jpg",
			song_name: "Recette",
		},
		{
			user_name: "Booba",
			user_image:
				"https://www.booska-p.com/wp-content/data:image/jpeg;base64,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/2021/12/freeze-corleone-sa-pp-qui-vaut-de-l-or-1024x750.jpg",
			song_name: "Scarface",
		},
	];
	const DATA_SESION = [
		{
			spot_user_name: "Jean DTX",
			spot_user_image:
				"http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTssjb3qfVuEAJEU4wXmQcBDruj2nNCG-FozpRmRSqqas92aG2thRbDeEAtVG94",
			spot_user_pourcentage: "50%",
		},
		{
			spot_user_name: "Nicolas",
			spot_user_image:
				"https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Johnny_Depp_Deauville_2019.jpg/640px-Johnny_Depp_Deauville_2019.jpg",
			spot_user_pourcentage: "70%",
		},
		{
			spot_user_name: "Tristan Duong",
			spot_user_image:
				"https://fr.web.img6.acsta.net/pictures/18/06/25/11/43/5547709.jpg",
			spot_user_pourcentage: "37%",
		},
	];

	function filterData(array: any) {
		let newArray: Array<Array<string>> = [];
		for (let index = 0; index < array.length; index++) {
			newArray.push([]);
			newArray[index].push(array[index].track.artists[0].name);
			newArray[index].push(array[index].track.name);
			newArray[index].push(array[index].track.popularity);
			newArray[index].push(array[index].added_at);
		}
		console.log(newArray);

		return newArray;
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

	function saveData(filteredData: Object) {
		// if (data is not already saved)
		return;
	}

	let array: Array<Object> = [];
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
			<Text style={styles.title}>Sessions</Text>
			<SessionFeed
				user_name={DATA[0].user_name}
				user_image={DATA[0].user_image}
				song_name={DATA[0].song_name}
			/>
			<SessionFeed
				user_name={DATA[0].user_name}
				user_image={DATA[0].user_image}
				song_name={DATA[0].song_name}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#0a0345",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
	cardSession: {
		backgroundColor: "#eee",
		padding: 10,
		margin: 10,
		borderRadius: 10,
	},
	cardSong: {
		backgroundColor: "#eee",
		padding: 10,
		margin: 10,
		borderRadius: 10,
	},
	sessionID: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontSize: 15,
		color: "#000",
		fontWeight: "bold",
		backgroundColor: "#eee",
	},
	cardSessionBody: {
		flexDirection: "row",
		flexWrap: "wrap",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#eee",
	},
});
