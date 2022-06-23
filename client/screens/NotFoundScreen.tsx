import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';


const socket = io('http://localhost:19007');

export default function NotFoundScreen({ navigation }: RootStackScreenProps<'NotFound'>) {

	function sendMessage(msg: string) {
		msg = window.localStorage.getItem('display_name') + ': ' + msg;
		socket.emit('message', { message: msg });
	}

	const [message, setMessage] = useState('');

	useEffect(() => {
		socket.on('receive', (data) => {
			console.log(data.message);

		});
	}, [socket]);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>This screen doesn't exist.</Text>
			<TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
				<Text style={styles.linkText}>Go to home screen!</Text>
			</TouchableOpacity>
			<Text style={styles.title}>Server test zone</Text>
			<TextInput
				style={{
					backgroundColor: '#fff',
					padding: 10,
				}}
				placeholder="Message ..."
				onChange={(e) => setMessage(e.nativeEvent.text)}
			/>
			<TouchableOpacity onPress={() => sendMessage(message)} style={styles.link}>
				<Text style={styles.linkText}>Send Message</Text>
			</TouchableOpacity>

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
	linkText: {
		fontSize: 14,
		color: '#2e78b7',
	},
});
