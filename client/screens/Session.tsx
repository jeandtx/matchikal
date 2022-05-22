import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import React, { useEffect } from 'react';
import Feed from '../components/Feed';
import SessionCard from '../components/SessionCard';


export default function Session() {
	const DATA = [
		{
			user_name: 'Freeze Corleone',
			user_image: 'https://www.booska-p.com/wp-content/uploads/2021/12/freeze-corleone-sa-pp-qui-vaut-de-l-or-1024x750.jpg',
			song_name: 'Freeze Raël',

		},
		{
			user_name: 'Freeze Corleone',
			user_image: 'https://www.booska-p.com/wp-content/uploads/2021/12/freeze-corleone-sa-pp-qui-vaut-de-l-or-1024x750.jpg',
			song_name: 'Freeze Raël',

		},
		{
			user_name: 'Freeze Corleone',
			user_image: 'https://www.booska-p.com/wp-content/uploads/2021/12/freeze-corleone-sa-pp-qui-vaut-de-l-or-1024x750.jpg',
			song_name: 'Freeze Raël',

		},
	]
	const DATA_SESION = [
		{

			spot_user_name: 'Jean DTX',
			spot_user_image: 'http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTssjb3qfVuEAJEU4wXmQcBDruj2nNCG-FozpRmRSqqas92aG2thRbDeEAtVG94',

		},
		{
			spot_user_name: 'Nicolas',
			spot_user_image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Johnny_Depp_Deauville_2019.jpg/640px-Johnny_Depp_Deauville_2019.jpg',

		},
		{
			spot_user_name: 'Tristan Duong',
			spot_user_image: 'https://fr.web.img6.acsta.net/pictures/18/06/25/11/43/5547709.jpg',

		},
	]

	const [sessionID, setSessionID] = React.useState('No session');

	useEffect(() => {
		const id = window.localStorage.getItem('session') || 'No session';
		console.log('sessionID', id);
		setSessionID(id);
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.cardSession}>
				<View>
					<Text style={styles.sessionID}>Session: {sessionID} </Text>
				</View>
				<View style={styles.cardSessionBody}>
					<SessionCard spot_user_name={DATA_SESION[0].spot_user_name} spot_user_image={DATA_SESION[0].spot_user_image}
					/>
					<SessionCard spot_user_name={DATA_SESION[1].spot_user_name} spot_user_image={DATA_SESION[1].spot_user_image}
					/>
					<SessionCard spot_user_name={DATA_SESION[2].spot_user_name} spot_user_image={DATA_SESION[2].spot_user_image}
					/>
				</View>
			</View>
			<View style={styles.cardSong}>
				<Feed user_name={DATA[0].user_name} user_image={DATA[0].user_image} song_name={DATA[0].song_name}
				/>
				<Feed user_name={DATA[1].user_name} user_image={DATA[1].user_image} song_name={DATA[1].song_name}
				/>
				<Feed user_name={DATA[2].user_name} user_image={DATA[2].user_image} song_name={DATA[2].song_name}
				/>
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
