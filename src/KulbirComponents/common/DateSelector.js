import React from 'react';
import {View, Text, Image,TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-datepicker';

const DateSelector = ({
    date, 
    androidMode, 
    mode, 
    placeholder, 
    format, 
    minDate, 
    maxDate, 
    onDateChange,
    style,
    containerStyle,
    clearDate = false,
    onPress,
    dateFont = null
}) => {
    return (            
        <View style={[styles.datePicker, containerStyle]}>
            <DatePicker 
                style={[{width: 370}, style]}
                date={date}
                androidMode={androidMode}
                mode={mode}
                placeholder={placeholder}
                format={format}
                minDate={minDate}
                maxDate={maxDate}
                confirmBtnText='Confirm'
                cancelBtnText='Cancel'
                customStyles={{
                    dateIcon: {
                        position: 'relative',
                        left: 0,
                        top: 0,
                        marginLeft: 0,
                    },
                    dateInput: {
                        borderWidth: 0,
                        alignItems: 'center',
                        marginLeft: 5,
                    },
                    dateText: (!dateFont)?{
                    fontSize: 16,
                    } : {...dateFont}
                }}
                onDateChange={onDateChange} 
            />
            {(clearDate)?
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={onPress} style={{borderColor: 'grey', borderWidth: 1, borderRadius: 20, width: 20, height: 20, justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={require('../../Image/clearButton.png')}/>
                    </TouchableOpacity>
                </View>
            :
                null
            }
        </View>
    );
};

const styles = {
  datePicker: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center'
    },
};

export {DateSelector};