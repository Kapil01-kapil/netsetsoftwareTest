import React, {useState, useCallback, useEffect} from 'react';
import {
  FlatList,
  Button,
  Platform,
  Alert,
  View,
  TextInput,
  SectionList,
  Text,
} from 'react-native';
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
          img={'check'}
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
  const messages = userProducts.reverse();
  return (
    <View>
      <View
        style={{
          backgroundColor: '#2873F0',
          paddingTop: 10,
          width: '100%',
          paddingBottom: 10,
          flexDirection: 'row',
        }}>
        <BtnWithImage
          img={'menu'}
          btnImgStyle={20}
          onPress={() => {
            props.navigation.openDrawer();
            // props.navigation.goBack();
          }}
          btnStyle={{marginRight: 8}}
        />
        <Text
          style={{
            borderRadius: 25,
            fontSize: 16,
            marginEnd: 20,
            color: '#fff',
            textAlign: 'center',
            fontWeight: 'bold',
            flex: 1,
          }}>
          Dashboard
        </Text>
        <BtnWithImage
          img={'check'}
          btnImgStyle={20}
          onPress={() => {
            props.navigation.navigate('EditProduct', {productId: id});
          }}
          btnStyle={{marginRight: 8}}
        />
      </View>

      <FlatList
        data={userProducts}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
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
        )}
      />
    </View>
  );
};

export default UserProductsScreen;
