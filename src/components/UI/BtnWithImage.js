import React, {Component} from 'react';
import {TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default class BtnWithImage extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[
          {
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          },
          this.props.btnStyle,
        ]}
        onPress={() => {
          this.props.onPress();
        }}>
        <Icon
          name={this.props.img}
          size={this.props.btnImgStyle}
          color="#FFF"
        />
        {/* <Image
          source={}
          style={[
            {height: 20, width: 20, resizeMode: 'contain'},
            this.props.btnImgStyle,
          ]}
        /> */}
      </TouchableOpacity>
    );
  }
}
