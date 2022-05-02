/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Pressable } from 'react-native';

import Colors from '../constants/Colors';
import LoginScreen from '../screens/LoginScreen';
import AccountScreen from '../screens/AccountScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import MyMatchikals from '../screens/MyMatchikals';
import Test from '../screens/Test';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation() {
	const MyTheme = {
		dark: false,
		colors: {
			primary: Colors.bleu_marine,
			background: Colors.bleu_marine,
			card: Colors.bleu_marine,
			text: Colors.dark.text,
			border: Colors.bleu_marine,
			notification: Colors.light_pink,
		},
	};
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			// theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
			theme={MyTheme}
		>
			<RootNavigator />
		</NavigationContainer>
	);
}

/**
 * A root stack navigator is often used for displaying Logins on top of all other content.
 * https://reactnavigation.org/docs/Login
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
			<Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
			<Stack.Group screenOptions={{ presentation: 'modal' }}>
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Account" component={AccountScreen} />
			</Stack.Group>
		</Stack.Navigator>

	);
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
	return (
		<BottomTab.Navigator
			initialRouteName="Accueil"
			screenOptions={{
				tabBarActiveTintColor: 'Colors.dark_blue', // Color of highlighted icon in the bottom tab bar
			}}>
			<BottomTab.Screen
				name="Accueil"
				component={TabOneScreen}
				options={({ navigation }: RootTabScreenProps<'Accueil'>) => ({
					title: 'Accueil', // This is the string displayed on left of the bar
					tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />,
					headerRight: () => (
						<Pressable
							onPress={() => {
								if (window.localStorage.getItem('token'))
									navigation.navigate('Account')
								else
									navigation.navigate('Login');
							}}
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1,
							})}>
							{/* // error: The if statement in only triggered when reload not when navigate */}
							{!window.localStorage.getItem('token') ?
								<AntDesign
									name="login"
									size={25}
									color={Colors.dark.text}
									style={{ marginRight: 15 }}
								/> :
								<MaterialCommunityIcons
									name="account-music"
									size={25}
									color={Colors.dark.text}
									style={{ marginRight: 15 }} />}
						</Pressable>
					),
				})}
			/>
			<BottomTab.Screen
				name="TabTwo"
				component={MyMatchikals}
				options={{
					title: 'My Matchikals',
					tabBarIcon: ({ color }) => <TabBarIcon name="music" color={color} />,
				}}
			/>
			<BottomTab.Screen
				name="Test"
				component={Test}
				options={{
					title: 'Test',
					tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
				}}
			/>
		</BottomTab.Navigator>
	);
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>['name'];
	color: string;
}) {
	return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
