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

const DateTimePicker = (props) => {
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
      let newTime = moment(result).format('LT');
      onSelect(newTime);
    } else {
      let newDate = moment(result).format('L');
      onSelect(newDate);
    }
  };
  return (
    <View style={[styles.formElement, cStyle]}>
      <TouchableOpacity onPress={showDatePicker}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[styles.time, CTextStyle]}>{String(selectedTime)}</Text>
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
  );
};

const styles = StyleSheet.create({
  formElement: {
    borderRadius: 30,
    padding: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: MyTheme.accent,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  time: {
    color: MyTheme.accent,
    fontSize: 14,
    padding: 0,
    paddingRight: 5,
    width: '80%',
    fontFamily: 'Poiret',
    textTransform: 'uppercase',
  },
});
export default DateTimePicker;
