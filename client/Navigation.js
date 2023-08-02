import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './src/screens/Login';
import Products from './src/screens/Products';
import Product from './src/screens/Product';
import MainPage from './src/screens/MainPage'
import Profile from './src/screens/Profile';
import Header from './src/screens/Header';
import Coleccion from './src/screens/coleccion';
import Form from './src/screens/Form';
import Cart from './src/screens/Cart'
import Idea from './src/screens/Idea';
import Ideas from './src/screens/Ideas';
import MisIdeas from './src/screens/MisIdeas'
import MiIdea from './src/screens/MiIdea'
import Update from './src/screens/Update';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Image } from 'react-native-elements';
const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Login" component={Login} options={{ tabBarStyle: { display: "none" }, tabBarButton: () => null}} />
        <Tab.Screen
          name="Home"
          component={MainPage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Products"
          component={Products}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image source={require("./src/images/a.jpg")} style={{width: 50, height: 25}}></Image>
            )
          }}
        />
        <Tab.Screen
          name="Ideas"
          component={Ideas}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bulb-outline" size={size} color={color} />
            )
          }}
        />
        <Tab.Screen name="Profile" component={Profile} screenOptions={{headerShown: true}} options={{ tabBarStyle: { display: "none" }, tabBarButton: () => null} }/>
        <Tab.Screen name="Header" component={Header} screenOptions={{headerShown: true}} options={{ tabBarStyle: { display: "none" }, tabBarButton: () => null} }/>
        <Tab.Screen name="Product" component={Product} screenOptions={{headerShown: true}} options={{ tabBarStyle: { display: "none" }, tabBarButton: () => null} }/>
        <Tab.Screen name="Idea" component={Idea} screenOptions={{headerShown: true}} options={{ tabBarStyle: { display: "none" }, tabBarButton: () => null} }/>
        <Tab.Screen name="Coleccion" component={Coleccion} screenOptions={{headerShown: true}} options={{ tabBarStyle: { display: "none" }, tabBarButton: () => null} }/>
        <Tab.Screen name="Form" component={Form} screenOptions={{headerShown: true}} options={{ tabBarStyle: { display: "none" }, tabBarButton: () => null} }/>
        <Tab.Screen name="Cart" component={Cart} screenOptions={{headerShown: true}} options={{ tabBarStyle: { display: "none" }, tabBarButton: () => null} }/>
        <Tab.Screen name="MisIdeas" component={MisIdeas} screenOptions={{headerShown: true}} options={{ tabBarStyle: { display: "none" }, tabBarButton: () => null} }/>
        <Tab.Screen name="MiIdea" component={MiIdea} screenOptions={{headerShown: true}} options={{ tabBarStyle: { display: "none" }, tabBarButton: () => null} }/>
        <Tab.Screen name="Update" component={Update} screenOptions={{headerShown: true}} options={{ tabBarStyle: { display: "none" }, tabBarButton: () => null} }/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}