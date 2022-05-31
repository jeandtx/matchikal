import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import io from 'socket.io-client';

const socket = io('http://localhost:19007');

export default function NotFoundScreen({ navigation }: RootStackScreenProps<'NotFound'>) {

	function sendMessage() {
		socket.emit('message', 'Hello from the client');
	}

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
				placeholder="Message ..." />
			<TouchableOpacity onPress={() => sendMessage()} style={styles.link}>
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
