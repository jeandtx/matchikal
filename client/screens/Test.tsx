import { Image, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import React, { useEffect } from 'react';
import Bouton from '../components/Bouton';
import axios from 'axios';


export default function Test() {
	const [i, setI] = React.useState(0);
	const [title, setTitle] = React.useState('Test Page');
	const [text, setText] = React.useState('Change the title of the page');

	const [imageURL, setImageURL] = React.useState('');
	const [name, setName] = React.useState('');

	useEffect(() => {
		axios({
			method: 'get',
			url: 'https://randomuser.me/api/',
			transformResponse: (r: JSON) => r
		}).then((response) => {
			let datajson = JSON.parse(response.data);
			if (datajson.results[0].gender === 'male') {
				setI(i + 1);
			} else {
				setImageURL(datajson.results[0].picture.large);
				setName(datajson.results[0].name.first + ' ' + datajson.results[0].name.last);
			}
			console.log(i);
		})
	}, [i]);

	return (
		<View style={styles.container}>
			<Text style={[styles.title, { marginTop: 40 }]}>{title}</Text>
			<View style={styles.separator} />


			<TextInput
				style={{
					height: 80,
					width: '70%',
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

			<Bouton text="Call a new bitch" test={() => setI(i + 1)} />

			<Text style={styles.title}>
				Now, {name} is here for u 🤭🤤
			</Text>
			<Image
				style={{ width: '100%', height: '50%' }}
				source={{
					uri:
						imageURL
				}} />

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
