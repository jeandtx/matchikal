import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScreenStackHeaderCenterView } from 'react-native-screens';

// 
export default function SessionCard({ spot_user_name, spot_user_image, spot_user_pourcentage, spot_user_page }: { spot_user_name: string, spot_user_image: string, spot_user_pourcentage: string, spot_user_page: string }) {
    return (
        <View style={styles.container}>
            <View style={styles.eachUser}>
                <View style={styles.spotUserImage}>
                    <Image
                        style={styles.spotUserImage}
                        source={{
                            uri: spot_user_image,
                        }}
                    />
                </View>
                <View style={styles.spotUserName}>
                    <a href={spot_user_page} target="blank">
                        <Text style={styles.spotUserName}> {spot_user_name} </Text>
                    </a>
                    <Text style={styles.spotUserPourcentage}> {spot_user_pourcentage} </Text>
                </View>
            </View>
        </View>

    );
}


const styles = StyleSheet.create({

    container: {

    },
    eachUser: {
        backgroundColor: '#fff',
        width: 150,
        padding: 10,
        margin: 10,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    spotUserName: {
        fontWeight: 'bold',
        fontStyle: 'italic',

        marginTop: 3,
    },
    spotUserImage: {
        width: 60,
        height: 60,
        borderRadius: 50 / 2,
    },
    spotUserPourcentage: {
        display: 'flex',
        fontWeight: 'bold',
        fontStyle: 'italic',
        justifyContent: 'center',




    },

});