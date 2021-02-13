// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Text} from 'react-native';
import Color from '../constants/Colors';
import AsyncStorage from '@react-native-community/async-storage';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('Email').then((value) =>
        navigation.replace(value === null ? 'AuthLogin' : 'MyTabs'),
      );
    }, 100);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 20}}>
        {' '}
        Net set software
      </Text>
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.Blue,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
