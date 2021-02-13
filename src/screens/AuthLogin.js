import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Text,
  CheckBox,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import helper from '../utils/helper';
import Input from '../components/UI/Input';
import Card from '../components/UI/Card';
import Colors from '../constants/Colors';
import AsyncStorage from '@react-native-community/async-storage';
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const login = (props) => {
  const [isSelected, setSelection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  //const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      Email: '',
      Password: '',
    },
    inputValidities: {
      Email: false,
      Password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{text: 'Okay'}]);
    }
  }, [error]);

  const authHandler = async () => {
    var isEmailCorrect = helper.checkEmail(formState.inputValues.Email);
    if (!isEmailCorrect) {
      setError(null);
      setIsLoading(true);
    }
    if (formState.inputValues.Password.length == 0) {
      setError(null);
      setIsLoading(true);
    } else {
      try {
        AsyncStorage.setItem('Email', formState.inputValues.Email);
        AsyncStorage.setItem('Password', formState.inputValues.Password);
        props.navigation.navigate('MyTabs');
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={10} style={styles.screen}>
      <View style={styles.gradient}>
        <View
          style={{
            width: '90%',
            maxWidth: 400,
            maxHeight: 400,

            marginTop: 20,
          }}>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>
            Welcome to netsetsoftware
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: Colors.Blue,
              fontWeight: 'bold',
            }}>
            Let's get Started
          </Text>
        </View>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: Colors.Blue,
              }}>
              Login
            </Text>

            <Input
              id="Email"
              label="Email"
              required
              mobile
              autoCapitalize="none"
              errorText="Please enter a valid email."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="Password"
              label="Password"
              required
              is_pwd_hide={true}
              maxNumber={5}
              autoCapitalize="none"
              errorText="Please enter a valid Password ."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
              />
              <Text style={styles.label}>
                I agree to Grocery's Terms of Services and Privacy Policy.
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={authHandler}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  backgroundColor: Colors.Blue,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons name="ios-arrow-forward" size={25} color="white" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Card>
        <Text style={{marginTop: 20, fontSize: 15}}>OR</Text>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <View
            style={{
              width: '20%',
              height: 1,
              backgroundColor: Colors.Blue,
              justifyContent: 'center',
              margin: 10,
            }}
          />
          <Text style={{fontSize: 15}}>Login with social Account</Text>
          <View
            style={{
              width: '20%',
              height: 1,
              backgroundColor: Colors.Blue,
              margin: 10,
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  gradient: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  authContainer: {
    width: '90%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    marginTop: 20,
  },

  buttonContainer: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
    color: Colors.green_color,
  },
  label: {
    margin: 8,
    color: Colors.light_gray,
    fontSize: 13,
  },
});

export default login;
