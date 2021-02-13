import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import MyTheme from '../../constants/Colors';

const BorderDateTime = (props) => {
  const {mode, onSelect, selectedTime, iconName, cStyle, CTextStyle} = props;

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (result) => {
    hideDatePicker();
    if (mode == 'time') {
      let newTime = result;
      onSelect(newTime);
    } else {
      let newDate = result;
      onSelect(newDate);
    }
  };
  return (
    <View>
      <Text>{props.label}</Text>
      <View style={[styles.formElement, cStyle]}>
        <TouchableOpacity onPress={showDatePicker}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Text style={[styles.time, CTextStyle]}>
              {String(selectedTime)}
            </Text>
            <Icon name={iconName} size={18} color="#c5c5c5" />
          </View>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode={mode}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formElement: {
    borderBottomWidth: 1,
    borderColor: '#5B5C5E',
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 11,
    paddingBottom: 10,
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8,
  },
  time: {
    fontSize: 14,
    padding: 0,
    width: '90%',
    paddingRight: 5,

    color: 'black',
  },
});
export default BorderDateTime;
