// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useEffect} from 'react';
import {View, Text, Alert, StyleSheet, TouchableOpacity} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-community/async-storage';
var result = '';
import Color from '../constants/Colors';
function retrieveItem(key) {
  try {
    let retrievedItem = AsyncStorage.getItem(key);
    return retrievedItem;
  } catch (error) {
    console.log(error.message);
  }
  return;
}
let Email = retrieveItem('Email');
const CustomSidebarMenu = (props) => {
  return (
    <TouchableOpacity
      style={stylesSidebar.sideMenuContainer}
      onPress={() => {
        props.navigation.closeDrawer();
      }}>
      <View style={stylesSidebar.profileHeader}>
        {/* <View style={stylesSidebar.profileHeaderPicCircle}>
          <Text style={{fontSize: 25, color: Color.Blue}}>
            {Email._W.charAt(0)}
          </Text>
        </View> */}
        <Text style={stylesSidebar.profileHeaderText}>{Email._W}</Text>
      </View>
      <View style={stylesSidebar.profileHeaderLine} />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label={({color}) => <Text style={{color: '#d8d8d8'}}>Logout</Text>}
          onPress={() => {
            props.navigation.closeDrawer();
            Alert.alert(
              'Logout',
              'Are you sure? You want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirm',
                  onPress: () => {
                    // props.navigation.closeDrawer();
                    // props.navigation.navigate('');
                    AsyncStorage.clear();
                    props.navigation.replace('AuthLogin');
                  },
                },
              ],
              {cancelable: false},
            );
          }}
        />
      </DrawerContentScrollView>
    </TouchableOpacity>
  );
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: Color.Blue,
    paddingTop: 40,
    color: 'white',
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: Color.Blue,
    padding: 15,
    textAlign: 'center',
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: 'white',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderText: {
    color: 'white',
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#e2e2e2',
    marginTop: 15,
  },
});
