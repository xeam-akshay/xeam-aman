import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, TextInput, Dimensions, ScrollView, Alert, AsyncStorage, ActivityIndicator} from 'react-native';
import { withNavigation } from "react-navigation";
import moment from 'moment';
import { LinearTextGradient } from 'react-native-text-gradient';
import LinearGradient from 'react-native-linear-gradient';
import {Dropdown} from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Input, Button, Header, GradientText, DateSelector, SearchIcon, Card, getWidthnHeight, Spinner, EditableCard, CommonModal, IOS_StatusBar, HolidayCard} from '../../KulbirComponents/common';
import {extractBaseURL} from '../../api/BaseURL';

const month = ["January", "February", "March", "April",
               "May", "June", "July", "August", "September",
               "October", "November", "December"]

let extracted_token = ""

class HolidaysList extends Component {
    state = {
        date: null,
        month: null,
        target: null,
        achieved: null,
        id: null,
        holidayData: [],
        name: null, 
        error: false,
        arrayLength: 0,
        loading: false,
        dropdownValue: "",
        dataType: null,
        empList: [],
        emp: [],
        targetMonth: null,
        empCode: null,
        dimensions: undefined,
        line: undefined,
        baseURL: null,
        errorCode: null,
        apiCode: null,
        commonModal: false,
        statesList:  [],
        stateID: null,
        stateName: null,
        year: null
    }

    // componentDidMount() {
    //     this.getEmpData()
    // }

    componentDidMount(){
        const {navigation} = this.props;
        this._unsubscribe = navigation.addListener("didFocus", async() => {
        await this.extractLink(); 
        //this.getEmpData();
        this.getStates();
        })
    }
    
    async extractLink(){
        await extractBaseURL().then((baseURL) => {
          this.setState({baseURL}, () => console.log("EXTRACT LINK: ", this.state.baseURL))
        })
    }

    UNSAFE_componentWillUnmount(){
    this._unsubscribe().remove();
    }

    onDecline(){
        this.setState({commonModal: false})
      }
      
    enableModal(status, apiCode){
        this.setState({errorCode: status})
        this.setState({apiCode})
        this.setState({commonModal: true})
    }

    showLoader = () => {
        this.setState({ loading: true });
      }
    
    hideLoader = () => {
        this.setState({ loading: false });
    }

    resetState(){
        this.setState({target: null})
        this.setState({achieved: null})
        this.setState({empData: []})
        this.setState({emp: []})
        this.setState({arrayLength: 0})
        this.setState({dataType: null})
        console.log("EMPDATA: ", this.state.empData, "EMP: ", this.state.emp)
        //this.setState({empCode: null})
    }

    getStates=async()=>{
        const {baseURL} = this.state;
        console.log("apply leave", this.state.baseURL);
        const context=this;
        const _this = this;
        this.showLoader();
        var user_token= await AsyncStorage.getItem('user_token');
        var permissions_fir= JSON.parse(user_token);
        var extracted_token=permissions_fir.success.secret_token;
        var data = new FormData();
      
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", function() {
      
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status === 200) {
          _this.hideLoader();
            // console.log(this.responseText);
            var json_obj = JSON.parse(xhr.responseText);
            var states = json_obj.success.leave_data.states;
            context.setState({statesList:states}, () => console.log("States: ", _this.state.statesList))
        }
        else{
          console.log("inside error")
          _this.hideLoader();
          _this.enableModal(xhr.status, "105");
        }
      });
      
      xhr.open("GET", `${baseURL}/apply-leave`);
      xhr.setRequestHeader("Authorization", `Bearer ${extracted_token}`);
      xhr.send(data);
      }

      getHolidaysList=async()=>{
        const {baseURL} = this.state;
        console.log("Holiday List: ", this.state.baseURL, this.state.stateID);
        const context=this;
        const _this = this;
        this.showLoader();
        var user_token= await AsyncStorage.getItem('user_token');
        var permissions_fir= JSON.parse(user_token);
        var token=permissions_fir.success.secret_token;
        var data = new FormData();
        data.append("state_id", this.state.stateID);
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", function() {
      
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status === 200) {
          _this.hideLoader();
            // console.log(this.responseText);
            var json_obj = JSON.parse(xhr.responseText);
            const holidayData = json_obj.success.holidays_list;
            if(holidayData !== [] && holidayData !== null && holidayData.length !== null && holidayData.length > 0){
                console.log("***ARRAY CONTAINS DATA***")
                _this.setState({holidayData})
                const dateArray = _this.state.holidayData[0]['holiday_ondate'].split('-')
                //console.log("YEAR: ", dateArray)
                _this.setState({year: dateArray[0]})
                _this.setState({arrayLength: _this.state.holidayData.length}, () => console.log("***CONTAINS***", _this.state.arrayLength))
              }else{
                console.log("***EMPTY ARRAY***")
                _this.setState({holidayData})
                _this.setState({arrayLength: _this.state.holidayData.length}, () => console.log("***EMPTY***", _this.state.arrayLength))
                //_this.setState({})
                Alert.alert("Not Available")
              }
            console.log("LIST OF HOLIDAYS: ", _this.state.holidayData, _this.state.holidayData.length )
            // var states = json_obj.success.leave_data.states;
            // context.setState({statesList:states}, () => console.log("States: ", _this.state.statesList))
        }
        else{
          console.log("inside error")
          _this.hideLoader();
          _this.enableModal(xhr.status, "106");
        }
      });
      
      xhr.open("POST", `${baseURL}/get-holiday-list`);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      xhr.send(data);
      }

    onButtonPress(){
        this.getHolidaysList();
    }

    renderError(){
        return (
            <View style={{alignItems: 'center', marginTop: 15, marginBottom: -15}}>
                <Text style={{fontSize: 10, color: 'red'}}>***Both fields are required***</Text>
            </View>
        );
    }

    bubbleLayout = (event) => {
        if(this.state.dimensions){
            return;
          }
          let width = Math.round(event.nativeEvent.layout.width)
          let height = Math.round(event.nativeEvent.layout.height)
          let bubble = event.nativeEvent.layout
          this.setState({dimensions: {width, height}}, () => console.log("BUBBLE DIMENSIONS: ", this.state.dimensions, bubble))
    }

    renderHolidays(){
        return this.state.holidayData.map((card, index) => (
            <HolidayCard
                key={index}
                holidayName={card.holiday_name}
                date={moment(card.holiday_ondate, 'YYYY-MM-DD').format('DD-MM-YYYY')}
                id={index + 1}
            />
        )); 
      }

    render(){
        const _this = this;

        const {holiday, dimensions, loading, errorCode, apiCode,stateName, arrayLength} = _this.state

        //console.log(`Report Check: ${name}, ${id}, ${target}, ${achieved}`)

        let bubbleMargin = null;

        if(dimensions){
            bubbleMargin = {marginTop: (-1) * (Math.round(dimensions.height/2) + 1)}
        }
        let user = this.props.employer;
        let gradient = null;
        let borderColor = null;
        let searchButton = null;
        if(user === "XEAMHO"){
        searchButton = {backgroundColor: 'rgb(19,111,232)'}
        gradient = ['#0E57CF', '#25A2F9']
        borderColor = {borderColor: 'rgb(19,111,232)'}
        }else if(user === "Aarti Drugs Ltd"){
        searchButton = {backgroundColor: '#F06130'}
        gradient = ['#F03030', '#E1721D']
        borderColor = {borderColor: '#F06130'}
        }

        return (
            <View style={[{backgroundColor: 'white', flex: 1}, getWidthnHeight(100)]}>
                <IOS_StatusBar color={gradient} barStyle="light-content"/>
                <Header navigation={this.props.navigation} title="Holidays" width={[getWidthnHeight(50)]} menu="white"/>

                <View style={{alignItems: 'center', marginHorizontal: 15, marginTop: 10}}>

                    <View style={[{flexDirection: 'row', justifyContent: 'space-evenly'}, getWidthnHeight(100)]}>

                        <View style={[getWidthnHeight(70)]}>
                            
                            <Dropdown
                                value={this.state.dropdownValue}
                                data={this.state.statesList}
                                label="Select State"
                                labelExtractor={({name}) => name}
                                valueExtractor={({id}) => id}
                                inputContainerStyle={{borderColor: 'gray', borderBottomWidth: 1}}
                                pickerStyle={[{marginHorizontal: 10, height: 200, width: 370}, getWidthnHeight(91)]}
                                onChangeText={(id, index, data) => {
                                    const stateName = data[index]['name']
                                    console.log("DROPDOWN: ", id, index)
                                    this.setState({stateID: id});
                                    this.setState({holidayData: []})
                                    this.setState({year: null})
                                    this.setState({arrayLength: 0})
                                    }
                                }
                            />

                        </View>

                        <View>
                            <TouchableOpacity onPress={() => this.onButtonPress()}>
                                <SearchIcon style={{marginTop: 15}}/>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>

                {(this.state.error) ? this.renderError() : null}

                <View style={{marginVertical: 30, alignItems: 'center'}}>
                    <LinearGradient 
                        start={{x: -0.5, y: 1.5}} 
                        end={{x:0.8, y: 0.0}} 
                        colors={['#F71A1A', '#E1721D']} 
                        style={[styles.linearGradient, getWidthnHeight(28)]}/>
                </View>

                <View style={{backgroundColor: '#EEEDED', flex: 1, marginTop: 0}}>
                
                    {/*Holidays List*/}
                    <View style={{marginTop: 20, flex: 1}}>
                        <ScrollView>
                        {(arrayLength > 0) ?
                            this.renderHolidays()
                        :
                        null
                        }
                        </ScrollView>
                    </View>

                    {(loading) ? <Spinner loading={loading} style={styles.loadingStyle}/> : null}

                        <View style={{backgroundColor: 'transparent', position: 'absolute', alignItems: 'center', marginTop: -10}}>
                            <View style={{marginTop: 10, backgroundColor: 'transparent', height: 2}}>
                                <View style={{alignItems: 'center', backgroundColor: 'transparent', height: 2}}>
                                    <LinearGradient 
                                        start={{x: -0.5, y: 1.5}} 
                                        end={{x:0.8, y: 0.0}} 
                                        colors={['#F71A1A', '#E1721D']} 
                                        style={[styles.lineGradient, getWidthnHeight(100)]}/>
                                </View>
                            </View>

                            <View style={[styles.bubble, getWidthnHeight(80, 3.5), bubbleMargin]} onLayout={this.bubbleLayout}>
                                {
                                    (!arrayLength) ?
                                        <Text style={{color: 'gray', backgroundColor: 'transparent', fontSize: 12}}>NO DATA FOUND</Text>
                                    :   <Text style={{color: 'gray', backgroundColor: 'transparent', fontSize: 12}}>{`HOLIDAY LIST FOR ${this.state.year}`}</Text>
                                }
                            </View>
                        </View>
                </View>
                <CommonModal 
                    title="Something went wrong"
                    subtitle= {`Error Code: ${errorCode}${apiCode}`}
                    visible={this.state.commonModal}
                    onDecline={this.onDecline.bind(this)}
                    buttonColor={['#0E57CF', '#25A2F9']}
                />
            </View>
        );
    }
}

const styles = {
    forDate: {
        position: 'absolute',
        backgroundColor: 'white',
        alignItems: 'flex-start',  
        borderColor: 'black', 
        borderWidth: 0, 
        marginTop: -7, 
        width: 57, 
        height: 16,
        marginLeft: 10,
    },
    linearGradient: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 3,
      width: 100,
      borderRadius: 50
    },
    lineGradient: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 1,
      width: 420,
      borderRadius: 50,
      backgroundColor: 'transparent'
    },
    bubble: {
        //position: 'absolute',
        backgroundColor: 'white', 
        borderWidth: 1, 
        borderColor: '#F71A1A', 
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
        //marginTop: -2
    },
    dropDown: {
        width: 370,
        marginTop: 20,
        marginHorizontal: 0
    },
    loadingStyle: {
        shadowOffset: null, 
        shadowColor: 'black', 
        shadowOpacity: null, 
        shadowRadius: 10, 
        elevation: 5,
        backgroundColor: 'white',
        height: 60,
        borderRadius:5
    },
};

export default withNavigation(HolidaysList);
