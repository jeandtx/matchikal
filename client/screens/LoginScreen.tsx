import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TextInput } from 'react-native';
import Colors from '../constants/Colors';
import { Entypo } from '@expo/vector-icons';
import React from 'react';


import { Text, View } from '../components/Themed';

export default function Screen() {

	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Login</Text>
			<TextInput
				style={styles.input}

				returnKeyType="next"

				onChangeText={(input) => setEmail(input)}
				placeholder="Id"
				value={email}
			/>
			<TextInput
				style={styles.input}
				onChangeText={(input) => setPassword(input)}
				placeholder="Password"
				value={password}
				secureTextEntry
			/>
			<a href='MdpOublie'>
				<Text style={styles.textright}>Mot de passe oubliÃ©</Text>

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