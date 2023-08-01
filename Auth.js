import * as React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import Home from './screens/Home';
import Matches from './screens/matches';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Settings from './screens/settings';
import More from './screens/more';
import News from './screens/news';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{headerShown: false}}
        >
            <Tab.Screen
                name="Tab"
                component={Matches}
                options={{title: 'Matches'}}
            />
            <Tab.Screen
                name="Tab2"
                component={News}
                options={{title: 'News'}}
            />
            <Tab.Screen
                name="Tab3"
                component={Settings}
                options={{title: 'Settings'}}
            />
            <Tab.Screen
                name="Tab4"
                component={More}
                options={{title: 'More'}}
            />
        </Tab.Navigator>

    );
}
function Auth(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Start'}}
        />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
    title: {
      textAlign: 'center',
      paddingTop: 400,
      marginVertical: 8,
      color: 'black',
      fontSize: 20,
    },
});
 export default Auth;
