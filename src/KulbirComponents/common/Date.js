import React from 'react';
import {View, Text, Image,TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {getMarginTop, getMarginLeft, fontSizeH4} from './width';

const Date = ({
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
            <View>
            {(date)?
            <View style = {[{alignItems:'flex-start'}, getMarginLeft(1.5)]}>
                <Text style = {[{color:'#0B8EE8'},fontSizeH4() ]}>Date</Text>
            </View>
    :
        null
        }
            <View>
            <DatePicker 
                style={[((date)? [{width: 370}, style,getMarginTop(-1.5)]: [{width: 370}, style])]}
                //style={[{width: 370}, style,getMarginTop(-1.5)]}
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
                    placeholderText: {
                        fontSize: 13.5,
                        color: 'grey',
                        alignItems:'flex-start'
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
            </View>
        </View>
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
    alignItems: 'center'
    },
};

export {Date};