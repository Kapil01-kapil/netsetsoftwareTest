import React from 'react';

import {Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import UserProductsScreen from '../screens/UserProductsScreen';
import EditProductScreen from '../screens/EditProductScreen';
import AuthLogin from '../screens/AuthLogin';
import SplashScreen from '../screens/SplashScreen';
import CustomSidebarMenu from '../screens/CustomSidebarMenu';
import Deshbord from '../screens/Deshbord';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const AdminStack = createStackNavigator();
function AdminNavigator() {
  return (
    <AdminStack.Navigator>
      <AdminStack.Screen name="UserProducts" component={UserProductsScreen} />
      <AdminStack.Screen name="EditProduct" component={EditProductScreen} />
      <AdminStack.Screen name="Deshbord" component={Deshbord} />
    </AdminStack.Navigator>
  );
}
const AuthStack = createStackNavigator();
function Auth() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator screenOptions={{gestureEnabled: false}}>
        <AuthStack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false, gesturesEnabled: false}}
        />
        <AuthStack.Screen
          name="AuthLogin"
          component={AuthLogin}
          options={{headerShown: false, gesturesEnabled: false}}
        />
        <AuthStack.Screen
          name="MyTabs"
          component={MyTabs}
          options={{headerShown: false, gesturesEnabled: false}}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={ShopNavigator} />
      <Tab.Screen name="Settings" component={UserProductsScreen} />
    </Tab.Navigator>
  );
}
const ShopNavigatorStark = createDrawerNavigator();
function ShopNavigator() {
  return (
    <ShopNavigatorStark.Navigator
      drawerContentOptions={{
        activeTintColor: '#cee1f2',
        color: '#cee1f2',
        itemStyle: {marginVertical: 5, color: 'white'},
        labelStyle: {
          color: '#d8d8d8',
        },
      }}
      screenOptions={{headerShown: false}}
      drawerContent={CustomSidebarMenu}>
      <ShopNavigatorStark.Screen
        options={{drawerLabel: 'Admin'}}
        name="Admin"
        component={AdminNavigator}
      />
    </ShopNavigatorStark.Navigator>
  );
}
export default Auth;
