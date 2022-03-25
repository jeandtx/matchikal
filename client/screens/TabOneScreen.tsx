import { StyleSheet } from 'react-native';
import Bouton from '../components/Bouton';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { RootTabScreenProps } from '../types';
import { SafeAreaView } from 'react-native';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'Accueil'>) {
  return (
    
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>MATCHIKAL</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
        
      
      
      <Bouton text="Create a Matchikal" test={() => console.log("Clicked on the Button")} />
        <Bouton text="Matchikal a Friend" test={() => console.log("Clicked on the Button")} />
      
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  sameLine: {
    display: 'flex',
    justifyContent: "space-between",
    flexDirection: 'row',

  },
  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark_violet,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.violet,

  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    color: Colors.dark_violet,

  },
});
