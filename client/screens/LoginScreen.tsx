import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TextInput } from 'react-native';
import Colors from '../constants/Colors';
import { Entypo } from '@expo/vector-icons';
import React from 'react';


import { Text, View } from '../components/Themed';

export default function Screen() {

	const [Id, setText] = React.useState('');
	const [Password, setTittle] = React.useState('');




	return (
		<View style={styles.container}>
			<Text style={styles.title}>Login</Text>
			<TextInput
				style={{
					height: 30,
					width: '75%',
					borderColor: 'gray',
					borderWidth: 1,
					color: 'white',
					fontSize: 20
				}}
				onChangeText={(input) => setText(input)}
				placeholder="Id"
				value={Id}
			/>
			<TextInput
				style={{
					height: 30,
					width: '75%',
					borderColor: 'gray',
					borderWidth: 1,
					color: 'white',
					fontSize: 20
				}}
				onChangeText={(input) => setTittle(input)}
				placeholder="Password"
				value={Password}
			/>
			<a href='MdpOublie'>
				<Text style={styles.textright}>Mot de passe oublié</Text>

			</a>
			<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
			<Text style={styles.title}>Sign up</Text>
			<View style={styles.sameLine}>
				<a href='SpotifyLogin'>
					<Text style={styles.title}>Sign up with Spotify</Text>



					<Entypo name="spotify" size={24} color="white" style={{ marginHorizontal: 20 }} />
				</a>

			</View>

			{/* Use a light status bar on iOS to account for the black space above the  */}
			<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
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
