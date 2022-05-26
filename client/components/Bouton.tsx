import { StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { Text } from './Themed';

export default function Bouton({ text, test }: { text: string; test: () => void }) {
    return (

        <TouchableOpacity style={styles.button}>
            <Text onPress={test} style={styles.button}>{text}</Text>
        </TouchableOpacity>


    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.dark_blue,
        color: Colors.dark.text,
        borderRadius: 80,
        paddingHorizontal: 20,
        fontSize: 20,
        marginVertical: 20,
        hover : {
            backgroundColor: Colors.dark_violet,
            color: Colors.dark.text,
            borderRadius: 80,
        },
        
    },

});
