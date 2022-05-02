import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TextInput } from 'react-native';
import Colors from '../constants/Colors';
import { Entypo } from '@expo/vector-icons';
import Bouton from '../components/Bouton';
import React from 'react';


import { Text, View } from '../components/Themed';

export default function Screen() {

	const AUTHORIZE = "https://accounts.spotify.com/authorize";

	const clientId = 'a4bf3a6d2a1640eeaff76c0764a15e10';
	const clientSecret = '433d24a1d12149cab578d1d47d3425ba';
	var redirect_uri = "http://localhost:19006"; //change to your host link

	function requestAuthorization() {
		var client_id = clientId;
		var client_secret = clientSecret;
		localStorage.setItem("client_id", client_id);
		localStorage.setItem("client_secret", client_secret);

		let url = AUTHORIZE;
		url += "?client_id=" + client_id;
		url += "&response_type=token";
		url += "&redirect_uri=" + encodeURI(redirect_uri);
		url += "&show_dialog=true";
		url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played user-top-read user-follow-read playlist-modify-public playlist-modify-private"; //all the authorizations we ask for
		window.location.href = url;
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Login</Text>
			<Bouton text="Connect" test={requestAuthorization} />

			{/* Use a light status bar on iOS to account for the black space above the  */}
			<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
		</View>
	);
}

const styles = StyleSheet.create({
	input: {
		height: 50,
		borderRadius: 50,
		paddingLeft: 20,

		width: '75%',
		borderColor: 'white',
		borderWidth: 1,
		color: 'white',
		text: 'center',
		fontSize: 20,
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-evenly',
		backgroundColor: Colors.dark_violet,


	},
	textright: {
		fontSize: 10,
		fontWeight: 'bold',
		marginLeft: 175,

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
	sameLine: {
		display: 'flex',
		justifyContent: "space-between",
		flexDirection: 'row',
		backgroundColor: Colors.dark_violet,
	},
});