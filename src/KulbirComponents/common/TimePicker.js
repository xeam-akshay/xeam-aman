import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import ActionModal from 'react-native-modal';
import {connect} from 'react-redux';
import moment from 'moment';
import {getWidthnHeight} from './width';
import {show_HideTimePicker, prebidTime} from '../../actions';

class TimePicker extends Component{
    constructor(props){
        super(props)
        this.state={
            slideActionModal: false,
            meridanArray: ['AM', 'PM'],
            meridian: 'AM',
            hour: [],
            minute: [],
            hourHand: 9,
            minuteHand: 30,
            hourCount: 0,
            minuteCount: 0,
        }
    }

    componentDidMount(){
        let hour = [];
        let minute = [];
        let defaultMinute = 0;
        for(i = 1; i <= 12; i++){
            hour.push(i)
            if(i === 12){
                hour.unshift(null)
                this.setState({hour}, () => console.log("HOUR: ", hour))
            }
        }
        for(i = 0; i < 12; i++){
            defaultMinute = defaultMinute + 5
            minute.push(defaultMinute)
            if(i === 11){
                minute.unshift(0)
                minute.unshift(null)
                minute.pop();
                this.setState({minute}, () => console.log("MINUTE: ", minute))
            }
        }
    }

    submitTime(){
        const {meridian} = this.state;
        const {timeDifference, prebidTimeValue = false} = this.props;
        const hourHand = (this.state.hourHand < 10) ? `0${this.state.hourHand}` : this.state.hourHand;
        const minuteHand = (this.state.minuteHand < 10) ? `0${this.state.minuteHand}` : this.state.minuteHand;
        const from_Time = `${hourHand}:${minuteHand} ${meridian}`;
        const date = moment().format('DD-MM-YYYY');
        const fromTimeStamp = moment(`${date} ${from_Time}`, 'DD-MM-YYYY hh:mm A').valueOf();
        const to_Time = moment(fromTimeStamp).add(timeDifference, 'hours').format('hh:mm A');
        console.log("TIME: ", typeof from_Time, from_Time,  "to", typeof to_Time, to_Time)
        const time = {
            'fromTime': from_Time,
            'toTime': to_Time
        }
        if(prebidTimeValue == true){
            this.props.prebidTime(time) 
        }
        else{
            this.props.show_HideTimePicker(time)
        }
        this.setState({hourHand: 9, minuteHand: 30, meridian: 'AM'}, () => this.props.onBackdropPress())
    }

    incrementHourHand(){
        const {hourHand, hour} = this.state;
        if(hourHand === 12){
            this.setState({hourHand: 1})
            return;
        }
        if(hourHand < hour.length - 1 && hourHand > 0){
            this.setState({hourHand: hour[hourHand + 1]})
        }
    }

    decrementHourHand(){
        const {hourHand, hour} = this.state;
        if(hourHand === 1){
            this.setState({hourHand: 12})
            return;
        }
        if(hour[hourHand - 1] !== null){
            this.setState({hourHand: hour[hourHand - 1]})
        }
    }

    incrementMinuteHand(){
        const {minuteHand, minute} = this.state;
        if(minuteHand === 55){
            this.setState({minuteHand: 0})
            return;
        }
        const index = minute.findIndex((num) => {
                return (num === minuteHand) 
        })
        const length = minute.length - 1;
        const checkNull = minute[index]
        if(index <= length && index > 0){
            this.setState({minuteHand: minute[index + 1]})
        }
        //console.log("NUMBER INDEX: ", minute[index], index, minute)
    }

    decrementMinuteHand(){
        const {minuteHand, minute} = this.state;
        if(minuteHand === 0){
            this.setState({minuteHand: 55})
            return;
        }
        const index = minute.findIndex((num) => {
            return (num === minuteHand) 
        })
        const length = minute.length - 1;
        const checkNull = minute[index]
        if(index <= length && checkNull){
            this.setState({minuteHand: minute[index - 1]})
        }
        //console.log("NUMBER INDEX: ", minute[index], index, minute)
    }

    setPM(){
        const {meridanArray, meridian} = this.state;
        if(meridian === 'PM'){
            this.setState({meridian: 'AM'})
            return;
        }
        this.setState({meridian: meridanArray[1]})
    }

    setAM(){
        const {meridanArray, meridian} = this.state;
        if(meridian === 'AM'){
            this.setState({meridian: 'PM'})
            return;
        }
        this.setState({meridian: meridanArray[0]})
    }

    render(){
        const {meridian, hourHand, minuteHand, hour} = this.state;
        const {show, onBackdropPress} = this.props;
        //console.log("######## TIME PICKER MODAL")
        console.log("HOURHAND: ", hourHand,":",minuteHand, " ", meridian)
        return(
            <View>
                <ActionModal
                    isVisible={show}
                    style={{justifyContent: 'center', alignItems: 'center'}}
                    avoidKeyboard={true}
                    onBackdropPress={() => {
                        this.setState({hourHand: 9, minuteHand: 30, meridian: 'AM'})
                        onBackdropPress()
                    }}
                >
                    <View style={[{backgroundColor: 'white', borderRadius: 10,}, getWidthnHeight(85, 40)]}>
                        <View style={[{alignItems: 'center', justifyContent: 'center', backgroundColor:'#1079D5'}, getWidthnHeight(85, 7)]}>
                            <Text style={[{fontWeight: 'bold', color: 'white', textAlign: 'center'}, getWidthnHeight(60)]}>Time Picker</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center'}}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={[{alignItems: 'center', justifyContent: 'space-evenly'}, getWidthnHeight(undefined, 20)]}>
                                    <TouchableOpacity onPress={this.incrementHourHand.bind(this)}>
                                        <Image source={require('../../Image/upload.png')}/>
                                    </TouchableOpacity>
                                    <View style={{width: 50, height: 50, alignItems: 'center', justifyContent: 'center', borderColor: 'grey', borderWidth: 1}}>
                                        <Text>{(hourHand < 10)? `0${hourHand}` : hourHand}</Text>
                                    </View>
                                    <TouchableOpacity onPress={this.decrementHourHand.bind(this)}>
                                        <Image source={require('../../Image/download.png')}/>
                                    </TouchableOpacity>
                                </View>

                                <View style={[{width: 20, height: 50, alignItems: 'center', justifyContent: 'center'}, getWidthnHeight(undefined, 20)]}>
                                    <Text>:</Text>
                                </View>

                                <View style={[{alignItems: 'center', justifyContent: 'space-evenly'}, getWidthnHeight(undefined, 20)]}>
                                    <TouchableOpacity onPress={this.incrementMinuteHand.bind(this)}>
                                        <Image source={require('../../Image/upload.png')}/>
                                    </TouchableOpacity>
                                    <View style={{width: 50, height: 50, alignItems: 'center', justifyContent: 'center', borderColor: 'grey', borderWidth: 1}}>
                                        <Text>{(minuteHand < 10)? `0${minuteHand}` : minuteHand}</Text>
                                    </View>
                                    <TouchableOpacity onPress={this.decrementMinuteHand.bind(this)}>
                                        <Image source={require('../../Image/download.png')}/>
                                    </TouchableOpacity>
                                </View>

                                <View style={{width: 30}}/>
                                <View style={[{alignItems: 'center', justifyContent: 'space-evenly'}, getWidthnHeight(undefined, 20)]}>
                                    <TouchableOpacity onPress={this.setPM.bind(this)}>
                                        <Image source={require('../../Image/upload.png')}/>
                                    </TouchableOpacity>
                                    <View style={{width: 50, height: 50, alignItems: 'center', justifyContent: 'center', borderColor: 'grey', borderWidth: 1}}>
                                        <Text>{meridian}</Text>
                                    </View>
                                    <TouchableOpacity onPress={this.setAM.bind(this)}>
                                        <Image source={require('../../Image/download.png')}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity style={[{
                                borderRadius: 10, borderColor: '#177AD1', 
                                borderWidth: 2, alignItems: 'center', justifyContent: 'center'}, getWidthnHeight(25, 5)]}
                                onPress={this.submitTime.bind(this)}    
                            >
                                <Text style={[{color: '#177AD1', fontWeight: 'bold', textAlign: 'center'}, getWidthnHeight(20)]}>SUBMIT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ActionModal>

            </View>
        )
    }
}

const TimePickerComponent = connect(null, {show_HideTimePicker, prebidTime})(TimePicker);
export {TimePickerComponent as TimePicker};