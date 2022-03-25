import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { Text, View } from './Themed';

export default function Bouton({ text, test }: { text: string; test: () => void }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Text onPress={test} style={styles.button}>{text}</Text>
            </TouchableOpacity>

        </View>
    );
}

function handleHelpPress() {
    WebBrowser.openBrowserAsync(
        'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet'
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor :Colors.dark_violet

    },
    
    button: {
        backgroundColor: Colors.dark_blue,
        color: Colors.dark.text,
        borderRadius: 80,
        padding: 5,
        paddingHorizontal: 40,
        fontSize: 20,
        marginVertical: 20,
        
        
        
    },
    
});
