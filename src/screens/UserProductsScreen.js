import React, {useState, useCallback, useEffect} from 'react';
import {FlatList, Button, Platform, Alert, View, TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import ProductItem from '../components/shop/ProductItem';
import Colors from '../constants/Colors';
import Color from '../constants/Colors';
import BtnWithImage from '../components/UI/BtnWithImage';
import * as productsActions from '../store/actions/products';
import AlphabetList from 'react-native-flatlist-alphabet';
const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const editProductHandler = (id) => {
    console.log('userProducts', userProducts);
    props.navigation.navigate('EditProduct', {productId: id});
  };
  useEffect(() => {
    let previousChar = '';
    previousChar = messages.sort((a, b) => a.car.localeCompare(b.car));
    console.log('result', previousChar);
    // let previousChar = ''
    // if (empList) {
    //   completeEmpList = empList
    //     .sort((a, b) => a.Name.localeCompare(b.Name))
    //     .map((emp) => {
    //       if (emp.Name.charAt(0) !== previousChar) {
    //         previousChar = emp.Name.charAt(0)

    //       } else {

    //       }
    //     })
    //   }

    // let result =  userProducts.filter((f) => f.car);
    // console.log('result', result);
    props.navigation.setOptions({
      headerTitle: 'Deshbord',
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
          img={'menu'}
          btnImgStyle={20}
          onPress={() => {
            props.navigation.toggleDrawer();
            // props.navigation.goBack();
          }}
          btnStyle={{marginRight: 8}}
        />
      ),
      headerRight: () => (
        <BtnWithImage
          img={'pencil-outline'}
          btnImgStyle={20}
          onPress={() => {
            props.navigation.navigate('EditProduct', {productId: ''});
          }}
          btnStyle={{marginRight: 8}}
        />
      ),
    });
  });
  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      {text: 'No', style: 'default'},
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(productsActions.deleteProduct(id));
        },
      },
    ]);
  };
  const messages = userProducts
    .reverse()
    .sort((a, b) => a.car.localeCompare(b.car));
  return (
    <View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <View>
            <ProductItem
              car={itemData.item.car}
              visit={itemData.item.visit}
              onSelect={() => {
                editProductHandler(itemData.item.id);
              }}>
              <Button
                color={Color.Blue}
                title="Edit"
                onPress={() => {
                  editProductHandler(itemData.item.id);
                }}
              />
              <Button
                color={Color.Blue}
                title="Delete"
                onPress={deleteHandler.bind(this, itemData.item.id)}
              />
            </ProductItem>
          </View>
        )}
      />
    </View>
  );
};

export default UserProductsScreen;
