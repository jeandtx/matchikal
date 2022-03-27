import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TextInput } from 'react-native';
import Colors from '../constants/Colors';
import { Entypo } from '@expo/vector-icons';
import React from 'react';

import { Text, View } from '../components/Themed';

export default function Screen() {

	const [text, setText] = React.useState('Change the title of the page');

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Login</Text>
			<TextInput
				style={{
					height: 80,
					width: '100%',
					borderColor: 'gray',
					borderWidth: 1,
					color: 'white',
					fontSize: 20
				}}
				onChangeText={(input) => setText(input)}
				placeholder="Type here to replace the text above!"
				value={text}
			/>
			<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
			<View style={styles.sameLine}>
				<a href='SpotifyLogin'>
					<Text style={styles.title}>Login with Spotify</Text>



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
		justifyContent: 'center',
		backgroundColor: Colors.dark_violet,
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
