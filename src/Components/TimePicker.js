import React, { Component } from 'react';
import { TouchableOpacity, View,  StyleSheet, } from 'react-native';
import { Input } from 'react-native-elements';
import PropTypes from 'prop-types';
import DateTimePicker from '@react-native-community/datetimepicker';
import XDate from 'xdate'; 

class ShiftTimingScreen extends Component {
    state = {
        // The values, which we get from each of the DateTimePickers. 
        // These values can be saved into your app's state. 
        StartingDateTimeValue: null,
        ToDateValue: null,
        ToTimeValue: null,

        // for iOS & Android: When this flag is true, the relevant <DateTimePicker> is displayed
        isStartingDateTimePickerVisible: false,
        isToDatePickerVisible: false,
        isToTimePickerVisible: false,

        // The value of the <DateTimePicker> is stored in this variable, which is used to pass data between the date & time pickers 
        dateOrTimeValue: null, 

        // ONLY FOR ANDROID: note that the current version of the <DateTimePicker> does NOT support "datetime" mode on Android.
        // So, I am using the following 2 flags (datePickerVisible & timePickerVisible) to provide this functionality.

        // (1) ONLY FOR ANDROID: When the datePickerVisible flag is true, the <DateTimePicker> is displayed in "date" mode
        datePickerVisible: false, 

        // (2) ONLY FOR ANDROID: When the timePickerVisible flag is true, the <DateTimePicker> is displayed in "time" mode
        timePickerVisible: false,
    };


    saveStartingDateTime = (value) => { 
        console.log("saveStartingDateTime - value:", value); 
        this.setState({
            StartingDateTimeValue: value,
        });
    }; 

    saveEndingDate = (value) => { 
        console.log("saveEndingDate - value:", value);
        this.setState({
            ToDateValue: value,
        });
    }; 

    saveEndingTime = (value) => {
        console.log("saveEndingTime - value:", value);
        this.setState({
            ToTimeValue: value,
        });
    };

    fRenderDateTimePicker = (dateTimePickerVisible, visibilityVariableName, dateTimePickerMode, defaultValue, saveValueFunctionName ) => {
        // dateTimePickerVisible:   a flag, which is used to show/hide this DateTimePicker
        // visibilityVariableName:              the name of the state variable, which controls showing/hiding this DateTimePicker. 
            // The name of the variable is received in (visibilityVariableName), and the value of it is received in the argument (dateTimePickerVisible).
        // dateTimePickerMode:      the mode mode of this DateTimePicker
        // defaultValue:                the default value, which should be selected initially when the DatTimePicker is displayed 
        // saveValueFunctionName:   the function, which would be called after the user selects a value. 
            // In my case it is a Redux's action creator, which saves the selected value in the app's state. 

        return (
            <View>
                {/* A. For iOS, display the picker in "date", "time" or "datetime" mode - No need for any customisation */}
                {Platform.OS === 'ios' && dateTimePickerVisible &&
                    (<DateTimePicker
                        mode={dateTimePickerMode}
                        value={defaultValue}

                        onChange={ (event, value) => {
                            this.setState({
                                dateOrTimeValue: value,

                                // We are done. Hide the <DatTimePicker>
                                // Technically speaking, since this part of the script is only relevant to a certain platform, I don't need to check for the platform (below). 
                                // Note that [visibilityVariableName] refers to the NAME of a state variable
                                [visibilityVariableName]: Platform.OS === 'ios' ? true : false,
                            });

                            if (event.type === "set") {
                                saveValueFunctionName(value);
                                // console.log("visibilityVariableName:", [visibilityVariableName], " - value:", value); 
                            }

                        }}
                    />)}

                {/* B.1 For Android - "date" mode:      display the picker in "date" mode */}
                {/*       For Android - "datetime" mode: display the picker in "date" mode (to be followed by another picker (below) in "time" mode) */}
                {Platform.OS === 'android' && dateTimePickerVisible && this.state.datePickerVisible &&
                    (<DateTimePicker
                        mode={"date"}
                        display='default' // 'default', 'spinner', 'calendar', 'clock' // Android Only 
                        value={defaultValue}

                        onChange={ (event, value) => {
                            this.setState({
                                // In case of (mode == datetime), the TIME part will be added to "dateOrTimeValue" using another DateTimePicker (below).
                                dateOrTimeValue: value,
                                datePickerVisible: false,
                            });

                            // When the mode is "datetime" & this picker was set (the user clicked on OK, rather than cancel), 
                            // we need to display another DateTimePicker in TIME mode (below) 
                            if (event.type === "set" && dateTimePickerMode === "datetime") {
                                this.setState({
                                    timePickerVisible: true,
                                });
                            }

                            // When the mode is "date" & this picker was set (the user clicked on OK, rather than cancel), 
                            // (1) We need to hide this picker. 
                            // (2) Save the data. Otherwise, do nothing. Date will be saved after the TIME picker is launched (below). 
                            else if (event.type === "set" && dateTimePickerMode === "date") {
                                // console.log("saveValueFunctionName: ", saveValueFunctionName); 
                                this.setState({ 
                                    [visibilityVariableName]: Platform.OS === 'ios' ? true : false, 
                                }); 

                                saveValueFunctionName(value);
                                // console.log("visibilityVariableName:", [visibilityVariableName], " - value:", value); 
                            }

                        }}
                    />)}

                {/* B.2 For Android - "time" mode:      display the picker in "time" mode */}
                {/*       For Android - "datetime" mode: display the picker in "time" mode (following another picker (above) in "date" mode) */}
                {Platform.OS === 'android' && dateTimePickerVisible && this.state.timePickerVisible &&
                    (<DateTimePicker
                        mode={"time"}
                        display='spinner' // 'default', 'spinner', 'calendar', 'clock' // Android Only 
                        is24Hour={false} // Android Only 
                        value={defaultValue}

                        onChange={(event, value) => {
                            // 1. In case of (mode == "time"), (value) is assigned to (newDateTime), which will be used below (as is with no additions)
                            let newDateTime = value;

                            // 2. In case of (mode == "datetime"), 
                            if (event.type === "set" && dateTimePickerMode === "datetime") {

                                // 2.1. Get the (date) part from the previously displayed DATE picker, which saved its value into (this.state.dateValue)
                                newDateTime = this.state.dateOrTimeValue;

                                // 2.2. Get the (hours & minutes) parts from this TIME Picker, which saved its value into (value) 
                                const newHours = value.getHours();
                                const newMinutes = value.getMinutes();

                                // 2.3 Combine 2.1 & 2.2 (above) into (newDateTime).
                                newDateTime.setHours(newHours);
                                newDateTime.setMinutes(newMinutes);
                                newDateTime.setSeconds(0);
                            }

                            this.setState({
                                dateOrTimeValue: newDateTime,
                                datePickerVisible: false,
                                timePickerVisible: false,

                                // We are done. Hide the <DatTimePicker>
                                // Technically speaking, since this part of the script is only relevant to a certain platform, I don't need to check for the platform (below). 
                                [visibilityVariableName]: Platform.OS === 'ios' ? true : false,
                            });

                            if (event.type === "set") {
                                saveValueFunctionName(newDateTime);
                                // console.log("visibilityVariableName:", [visibilityVariableName], " - newDateTime:", newDateTime); 
                            } 
                        }}

                    />)} 
            </View>
        );      
    }; 

    // This function formats date values. Obviously, using it is optional. 
    // If you decide to use it, remember that it needs the XDate library: 
    // import XDate from 'xdate';
    fFormatDateTime = (date1, format1 = "datetime") => {
        // date1:   the date to be formatted 
        // format1: the date mode - "datetime" , "date" OR "time"
        if (date1 === null) {
            return null;
        }

        // else:
        const format2 = format1.toLowerCase();
        let dateFormatted;
        const date2 = new XDate(date1);

        switch (format2) {
            case "datetime": {
                dateFormatted = date2.toString('dd/MM/yyyy - hh:mm TT');
                return dateFormatted;
            }
            case "date": {
                dateFormatted = date2.toString('dd/MM/yyyy');
                return dateFormatted;
            }
            case "time": {
                dateFormatted = date2.toString('hh:mm TT');
                return dateFormatted;
            }
            default:
                return null;
        } 
    };

    // This function shows/hides the initial DateTimePicker 
    // If the mode is "datetime", another picker will be displayed by the DATE picker 
    fRenderDatePicker = (mode, visibilityVariableName) => {
        // mode:                        specifies the mode of the <DateTimePicker> 
        // visibilityVariableName:  the name of the state variable, which controls showing/hiding this DateTimePicker. 
        switch (mode) {
            case "datetime":
                return this.setState({ [visibilityVariableName]: true, datePickerVisible: true, timePickerVisible: false });
            case "date":
                return this.setState({ [visibilityVariableName]: true, datePickerVisible: true, timePickerVisible: false });
            case "time":
                return this.setState({ [visibilityVariableName]: true, datePickerVisible: false, timePickerVisible: true });
        }
    }

    render() {
        // 1. For the "Shift Start", Initial/Default value for the DateTimePicker 
        // // defaultShiftStartDateTime: (tomorrow's date at 9 AM)
        let defaultShiftStartDateTime = new Date();
        defaultShiftStartDateTime.setDate(defaultShiftStartDateTime.getDate() + 1);
        defaultShiftStartDateTime.setHours(9);
        defaultShiftStartDateTime.setMinutes(0);
        defaultShiftStartDateTime.setSeconds(0);

        // 2. For the "Shift End", Initial/Default value for the DateTimePicker 
        let defaultShiftEndDateTime = new Date();
        defaultShiftEndDateTime.setDate(defaultShiftEndDateTime.getDate() + 1);
        defaultShiftEndDateTime.setHours(17);
        defaultShiftEndDateTime.setMinutes(0);
        defaultShiftEndDateTime.setSeconds(0);

        return (
                <View>

                     <View style={styles.box}>
                    <TouchableOpacity
                        onPress={() => {
                            // this.setState({ isToTimePickerVisible: true, });
                            this.fRenderDatePicker("time", "isToTimePickerVisible");
                        }}>
                        <Input
                            // label='Time'
                            placeholder={"Time"}
                            editable={false}
                            value={this.fFormatDateTime(this.state.ToTimeValue, "time")}
                        />
                    </TouchableOpacity>
                    </View>
                    {this.fRenderDateTimePicker(
                        this.state.isToTimePickerVisible,
                        "isToTimePickerVisible",
                        "time",
                        defaultShiftEndDateTime,

                        // This is my function, which saves the selected value to my app's state. 
                        // YOU NEED TO REPLACE IT WITH SOMETHING RELEVANT TO YOUR APP. 
                        this.saveEndingTime,
                    )}
                </View>
        );
    } // end of: render()
} // end of: component
const styles = StyleSheet.create({
    box:{
       top:0,
      borderWidth:1,
      borderColor:'#c4c4c4',
      borderRadius:10,
     left:15,
     top:140,height:40,width:'40%',left:50
      
    },
    inputBox:{
      borderBottomWidth: 0 ,
      bottom:12,
      paddingBottom:0,
      left:0,
      width:'95%',
      height:'0%'
    },
    image:{
      left: 300,
      bottom:5,
      backgroundColor:'white'
    }
  });
export default ShiftTimingScreen;