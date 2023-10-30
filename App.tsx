import React from 'react';
import { SafeAreaView, StatusBar, View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/components/HomeScreen';
import SearchResults from './src/components/SearchResults';

import {pageNames} from './src/util/constants'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            cardStyle: {
              backgroundColor: '#000',
            },
            headerShown: false,
          }}>
          <Stack.Screen name={pageNames.HOME} component={HomeScreen} />
          <Stack.Screen name={pageNames.RESULTS} component={SearchResults} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
