import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScreenStackHeaderCenterView } from 'react-native-screens';



export default function Feed({ user_name, user_image, song_name, album_name, song_url, }: { user_name: string, user_image: string, song_name: string, album_name: string, song_url: string }) {
    return (

        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.headerLeft}>
                    <Image
                        style={styles.userImage}
                        source={{
                            uri: user_image,
                        }}
                    />
                    <View style={{
                        display: 'flex',
                        justifyContent: 'flex-start'
                    }}>
                        <Text style={styles.userName}> {user_name} </Text>
                        <a href={song_url} target="_blank">
                            <Text style={styles.songName}> {song_name} - {album_name}</Text>
                        </a>
                    </View>
                </View>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    card: {
        backgroundColor: 'white',
        padding: 10,
        margin: 3,
        borderRadius: 10,
    },
    headerLeft: {
        flexDirection: 'row',
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
    },
    userName: {
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 3,
    },
    songName: {
        fontStyle: 'italic',
        marginLeft: 10,
        marginTop: 6,
    }
})