import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import HomeScreen from './screens/HomeScreen'
import AuthScreen from './screens/AuthScreen'
import ARScreen from './screens/ARScreen'
import ProjectsScreen from './screens/ProjectsScreen'

const Stack = createStackNavigator()

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#4F46E5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'VNX-Architype' }}
          />
          <Stack.Screen 
            name="Auth" 
            component={AuthScreen} 
            options={{ title: 'Sign In' }}
          />
          <Stack.Screen 
            name="Projects" 
            component={ProjectsScreen} 
            options={{ title: 'Projects' }}
          />
          <Stack.Screen 
            name="AR" 
            component={ARScreen} 
            options={{ title: 'AR Planner' }}
          />
        </Stack.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

