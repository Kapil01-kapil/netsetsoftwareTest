import React, {useEffect, useCallback, useReducer, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Button,
} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderButton from '../components/UI/HeaderButton';
import * as productsActions from '../store/actions/products';
import Input from '../components/UI/Input';
import BorderDateTime from '../components/UI/BorderDateTime';
import Card from '../components/UI/Card';
import Color from '../constants/Colors';
import BtnWithImage from '../components/UI/BtnWithImage';
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

import AsyncStorage from '@react-native-community/async-storage';

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
import moment from 'moment';
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

const EditProductScreen = (props) => {
  const prodId = props && props.route && props.route.params.productId;
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId),
  );
  const [colender, setColender] = useState('');
  const [date, setDate] = useState(
    editedProduct
      ? moment(editedProduct.visit).format('L')
      : colender
      ? moment().format('L')
      : '',
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      car: editedProduct ? editedProduct.car : '',
      //visit: editedProduct ? editedProduct.visit : date,
    },
    inputValidities: {
      car: editedProduct ? true : false,
      // visit: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        {text: 'Okay'},
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(
        productsActions.updateProduct(prodId, formState.inputValues.car, date),
      );
    } else {
      dispatch(productsActions.createProduct(formState.inputValues.car, date));
    }
    props.navigation.goBack();
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({submit: submitHandler});
  }, [submitHandler]);

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: 'COMPLETE DETAILS',
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor: Color.Blue,
      },
      headerTitleStyle: {
        fontSize: 18,
        fontFamily: 'Avenir',
        alignSelf: 'center',
        color: 'white',
      },
      headerLeft: () => (
        <BtnWithImage
          img={'arrow-left'}
          btnImgStyle={20}
          onPress={() => {
            props.navigation.goBack();
          }}
          btnStyle={{marginRight: 8}}
        />
      ),
      headerRight: () => (
        <BtnWithImage
          img={'check'}
          btnImgStyle={20}
          onPress={submitHandler}
          btnStyle={{marginRight: 8}}
        />
      ),
    });
  });
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
    <ScrollView>
      <View style={styles.form}>
        <Card style={styles.product}>
          <View>
            <Text>LOCATION</Text>
            <View style={styles.formElement}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Text style={styles.time}>location</Text>
                <Icon name={'crosshairs-gps'} size={18} color="#c5c5c5" />
              </View>
            </View>
          </View>

          <BorderDateTime
            label="DATE"
            mode="date"
            onSelect={setDate}
            selectedTime={moment(date).format('L')}
            name="Date"
            iconName="calendar-month-outline"
            cStyle={{
              width: '100%',
            }}
          />
          <Input
            id="car"
            label="Car"
            errorText="Please enter a valid car name!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.car : ''}
            initiallyValid={!!editedProduct}
            required
          />
        </Card>
        <View style={{margin: 10}}>
          <Text>Birthday</Text>
          <View style={styles.formElement}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <Text>13 march 1996</Text>
            </View>
          </View>
        </View>

        <View style={{margin: 10}}>
          <Text>Email Address</Text>
          <View style={styles.formElement}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <Text>{Email._W}</Text>
            </View>
          </View>
        </View>

        <View style={{margin: 10}}>
          <Text>Mobile Number</Text>
          <View style={styles.formElement}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <Text>+91 9111606923</Text>
            </View>
          </View>
        </View>

        <View style={{margin: 10}}>
          <Text>Phone Number</Text>
          <View style={styles.formElement}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <Text>Not avalible</Text>
            </View>
          </View>
        </View>

        <View style={{margin: 10}}>
          <Text>Fox Number</Text>
          <View style={styles.formElement}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <Text>Not avalible</Text>
            </View>
          </View>
        </View>

        <View style={{margin: 10}}>
          <Text>Address Line 1</Text>
          <View style={styles.formElement}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <Text>Chandigath</Text>
            </View>
          </View>
        </View>

        <View style={{margin: 10}}>
          <Text>Address Line 2</Text>
          <View style={styles.formElement}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <Text>Not avalible</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: 'white',
  },
  product: {
    margin: 20,
    padding: 20,
  },
  formElement: {
    paddingTop: 11,
    paddingBottom: 10,

    borderBottomWidth: 1,
    borderColor: '#5B5C5E',
    borderBottomColor: '#ccc',
    flexDirection: 'row',

    marginBottom: 12,
  },
});

export default EditProductScreen;
