import { StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import React from 'react';
import Bouton from '../components/Bouton';

export default function Test() {
	const [title, setTitle] = React.useState('Test Page');
	const [text, setText] = React.useState('Change the title of the page');


	// async function getMoviesFromApi() {
	// 	try {
	// 		let response = await fetch(
	// 			'Your URL to fetch data from',
	// 		);
	// 		let responseJson = await response.json();
	// 		console.log(responseJson);
	// 		return responseJson;
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// }

	// const [data, setData] = React.useState(getMoviesFromApi());

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<View style={styles.separator} />

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
			<Bouton text="Change title" test={() => setTitle(text)} />

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
