import * as React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScreenStackHeaderCenterView } from "react-native-screens";
import Feed from "./Feed";

export default function SessionFeed({
	user_name,
	user_image,
	song_name,
}: {
	user_name: string;
	user_image: string;
	song_name: string;
}) {
	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<View style={styles.headerLeft}>
					<View
						style={{
							display: "flex",
							justifyContent: "flex-start",
						}}
					>
						<Text style={styles.userName}>
							Session aeorg432erg432dfj
						</Text>
						<Text style={styles.songName}> with </Text>
					</View>
				</View>
				<Feed
					user_name={user_name}
					user_image={user_image}
					song_name={song_name}
				/>
				<Feed
					user_name={user_name}
					user_image={user_image}
					song_name={song_name}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingBottom: 5,
	},
	card: {
		backgroundColor: "white",
		padding: 10,
		margin: 3,
		borderRadius: 10,
	},
	headerLeft: {
		flexDirection: "row",
	},
	userImage: {
		width: 50,
		height: 50,
		borderRadius: 50 / 2,
	},
	userName: {
		fontWeight: "bold",
		marginLeft: 10,
		marginTop: 3,
	},
	songName: {
		fontStyle: "italic",
		marginLeft: 10,
		marginTop: 6,
	},
	cardSong: {
		backgroundColor: "#eee",
		padding: 10,
		margin: 10,
		borderRadius: 10,
	},
});
