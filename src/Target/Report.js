import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, TextInput, Dimensions, ScrollView, Alert, AsyncStorage, ActivityIndicator} from 'react-native';
import { withNavigation } from "react-navigation";
import moment from 'moment';
import { LinearTextGradient } from 'react-native-text-gradient';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-datepicker';
import {Dropdown} from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Input, Button, Header, GradientText, DateSelector, SearchIcon, Card, getWidthnHeight, DataBar, Spinner, CommonModal, IOS_StatusBar} from '../KulbirComponents/common';
import {extractBaseURL} from '../api/BaseURL';


const month = ["January", "February", "March", "April",
               "May", "June", "July", "August", "September",
               "October", "November", "December"]

class Report extends Component {
    state = {
        date: null,
        month: null,
        target: null,
        achieved: null,
        id: null,
        empData: [],
        type: null, 
        error: false,
        arrayLength: 0,
        loading: false,
        option: [{"name": "DAILY", "id": 1}, {"name": "MONTHLY", "id": 2}],
        dropdownValue: "",
        name: null,
        leftOver: null,
        empCode: null,
        dimensions: undefined,
        baseURL: null,
        errorCode: null,
        apiCode: null,
        commonModal: false
    }

    componentDidMount(){
        const {navigation} = this.props;
        this._unsubscribe = navigation.addListener("didFocus", async() => {
            await this.extractLink();
            // this.getAsyncData((empCode) => {
            //     console.log("EMPLOYEE CODE: ", empCode)
            //     if(this.state.empCode){
            //         if(empCode !== this.state.empCode){
            //             this.setState({dropdownValue: ""})
            //             this.setState({date: null})
            //             this.setState({month: null})
            //             this.setState({dropdownValue: "Choose an option"})
            //             this.resetState();
            //         }
            //     }
            // })
        this.getAsyncData((empCode) => {
                console.log("EMPLOYEE CODE: ", empCode, this.state.empCode)
                if(this.state.name && this.state.date){
                    if(empCode !== this.state.empCode){
                        this.setState({dropdownValue: ""})
                        this.setState({date: null})
                        this.setState({month: null})
                        this.setState({dropdownValue: "Choose an option"})
                        this.resetState();
                    }else {
                        this.employeeReport();
                    }
                }
            })
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

    getAsyncData = async(callback) => {
        const user_token = await AsyncStorage.getItem('user_token');
        const permissions_fir= JSON.parse(user_token);
        console.log("ASYNC DATA: ", permissions_fir.success.user.employee_code)
        callback(permissions_fir.success.user.employee_code)
    }

    resetState(){
        this.setState({arrayLength: 0})
        this.setState({target: null})
        this.setState({achieved: null})
        this.setState({empdata: []})
        this.setState({id: null})
        this.setState({name: null})
        this.setState({empCode: null})
        this.setState({leftOver: null})
    }

    // UNSAFE_componentWillReceiveProps(nextProps){
    //     if(nextProps.route.params){
    //         this.setState({arrayLength: 0})
    //         this.employeeReport();
    //     }
    // }

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

    onButtonPress(){
        if(this.state.date === null || this.state.type === null){
            this.setState({error: true})
            return;
        }
        if(this.state.date !== null && this.state.type !== null){
            this.setState({error: false})
            this.employeeReport();
        }
    }

    employeeReport = async () => {
        const {baseURL} = this.state;
        console.log("URL: ", `${baseURL}/arti-drugs/employee/targets`)
        const user_token = await AsyncStorage.getItem('user_token');
        const permissions_fir= JSON.parse(user_token);
        const employeeID = permissions_fir.success.user.id
        this.setState({id: employeeID})
        this.setState({empCode: permissions_fir.success.user.employee_code})
        this.setState({name: permissions_fir.success.user.employee.fullname})
        //console.log('User ID RPT: ', this.state.id, permissions_fir)
        const extracted_token = permissions_fir.success.secret_token;
        //console.log('RPT Token: ', extracted_token)
        const _this = this;
        this.showLoader(); 
        var data = new FormData();
        data.append("target_of", this.state.date);
        data.append("user_id", this.state.id);
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", function() {
          if(this.readyState !== 4) {
                return;
          }if(this.status === 200){
            _this.hideLoader();
              const dataList = JSON.parse(xhr.responseText);
              console.log('*****RPT Success Data: ', xhr.responseText, "DATALIST: ");
              if(dataList.status === 'error'){
                _this.hideLoader();
                _this.setState({arrayLength: 0})
                Alert.alert("Target Not Assigned")
                return;
              }else if(dataList.data !== [] && dataList.data !== null && dataList.data.length !== null && dataList.data.length > 0){
                console.log("***ARRAY CONTAINS DATA***")
                let sortDate = dataList.data
                const empData = _this.sortDates(sortDate)
                _this.setState({empData})
                _this.setState({arrayLength: _this.state.empData.length})
              }else{
                console.log("***EMPTY ARRAY***")
                const empData = dataList.data
                _this.setState({empData})
                _this.setState({arrayLength: _this.state.option.length})
                //_this.setState({})
              }
              _this.setState({target: dataList.target})
              _this.setState({achieved: dataList.total_month_achieved_target})

              if(_this.state.type === "DAILY"){
                  let leftOver = _this.state.target - _this.state.achieved
                  if(leftOver > 0){
                    _this.setState({leftOver})
                  }else {
                    leftOver = 0
                    _this.setState({leftOver})
                  }

              }
              
            console.log('CardArrayLength: ', _this.state.arrayLength)
            //   findMonthName = empData[0]['month']
            //   console.log('Month Number: '. findMonthName)
            //   this.setState({month: month[findMonthName - 1]})
          }else {
              _this.hideLoader();
              console.log('RPT Error: ', this.responseText);
              _this.enableModal(xhr.status, "096");
          }
        });
        
        xhr.open("POST", `${baseURL}/arti-drugs/employee/targets`);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Authorization", `Bearer ${extracted_token}`);
        
        xhr.send(data);
      }

      sortDates(sortDate){
          return (
              sortDate.sort((a, b) => {
              if(a.date < b.date){
                  return 1
              } else if(a.date > b.date){
                  return -1
              } else {
                  return 0
              }
          })
        )
      }

      renderCard() {
          return (
            <Card 
                name={this.state.name.toUpperCase()}
                id={this.state.empCode}
                target={this.state.target}
                achieved={this.state.achieved}
            />
          )
      }

      renderDates(){
        return this.state.empData.map((card, index) => (
            <DataBar
                key={card.index}
                date={card.date}
                target={this.state.target}
                achievedTarget={this.state.achieved}
                dailyTarget={card.achieved_target}
                navigation={this.props.navigation}
                id={card.id}
                userID={card.user_id}
                month={card.month}
                employer={this.props.employer}
            />
        )); 
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

    render(){
        const {type, id, target, achieved, arrayLength, name, dimensions, errorCode, apiCode} = this.state

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
                <Header navigation={this.props.navigation} title="My Report" width={[getWidthnHeight(40)]} menu="white"/>

                <View style={{alignItems: 'center', marginHorizontal: 15}}>

                    <View style={[styles.dropDown, getWidthnHeight(90)]}>
                        
                        <Dropdown
                            value={this.state.dropdownValue}
                            data={this.state.option}
                            label="Choose an option"
                            labelExtractor={({name}) => name}
                            valueExtractor={({id}) => id}
                            inputContainerStyle={{borderColor: 'gray', borderBottomWidth: 1}}
                            pickerStyle={[{marginHorizontal: 10, height: 100, width: 370}, getWidthnHeight(91)]}
                            onChangeText={(id, index, data) => {
                                const name = data[index]['name']
                                this.setState({type: name});
                                console.log('SetType: ', this.state.type)
                                this.resetState();                                
                                }
                            }
                        />

                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15}}>
                        <View style={[{marginHorizontal: 8, marginTop: 25}, getWidthnHeight(75)]}>
                            <DateSelector 
                                style={[getWidthnHeight(75)]}
                                date={this.state.date}
                                androidMode='spinner'
                                mode='date'
                                placeholder='Select Month Only'
                                format='YYYY-MM'
                                minDate='2019-08'
                                maxDate='2025-08'
                                onDateChange={(date) => {
                                    console.log('Selected: ', date)
                                    this.setState({date})
                                    this.setState({month: month[date.slice(-2) - 1].toUpperCase()})
                                    this.resetState();
                                }} 
                            />
                            <View style={styles.forDate}>
                                <GradientText title='For Month' style={{fontSize: 9, marginHorizontal: 4, fontWeight: null, width: 57}}/>
                            </View>
                        </View>

                        <TouchableOpacity onPress={() => this.onButtonPress()}>
                            <SearchIcon style={{marginTop: 25}}/>
                        </TouchableOpacity>

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

                <View style={{backgroundColor: '#EEEDED', flex: 1, marginTop: 10}}>
                    {/*Employee Data*/}
                        {(arrayLength > 0) ?
                        <View style={{backgroundColor: '#EEEDED', marginTop: 10}}>
                            <ScrollView style={{marginTop: -10, backgroundColor: '#EEEDED'}}>
                                <View style={{backgroundColor: '#EEEDED', marginTop: 20,}}>
                                    {
                                        type === 'MONTHLY' ?
                                            this.renderCard()
                                        :
                                        <View style={{flexDirection: 'column', alignItems: 'center'}}> 
                                            <View style={[styles.titleContainer, getWidthnHeight(90, 10)]}>
                                                <GradientText title={this.state.name.toUpperCase()} style={styles.titleBackground}/>
                                                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10}}>
                                                    <View style={{flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>
                                                        <Text style={{fontSize: 8}}>TARGET</Text>
                                                        <Text style={{color: '#158EE5'}}>{this.state.target}</Text>
                                                    </View>
                                                    <View style={{flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>
                                                        <Text style={{fontSize: 8}}>ACHIEVED</Text>
                                                        <Text style={{color: '#06B485'}}>{this.state.achieved}</Text>
                                                    </View>
                                                    <View style={{flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>
                                                        <Text style={{fontSize: 8}}>REMAINING</Text>
                                                        <Text style={{color: '#E72828'}}>{this.state.leftOver}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            {this.renderDates()}
                                        </View>
                                    } 
                                </View>
                            </ScrollView>
                        </View>
                        : <View style={{alignItems: 'center', marginTop: 50}}>
                            <Text>No Records found</Text>
                          </View>
                        }

                        {(this.state.loading) ? <Spinner loading={this.state.loading} style={styles.loadingStyle}/> : null}

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
                                    (!this.state.month) ?
                                        <Text style={{color: 'gray', backgroundColor: 'transparent', fontSize: 12}}>NO DATA FOUND</Text>
                                    :   <Text style={{color: 'gray', backgroundColor: 'transparent', fontSize: 12}}>{this.state.month} MONTH TARGET REPORT</Text>
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
    iconStyle: {
        position: 'absolute',
        alignSelf: 'flex-end',
        marginTop: 25,
        marginRight: 0,
        width: 70,
        height: 50,
        borderColor: 'black',
        borderWidth: 0
    },
    dropDown: {
        width: 370,
        marginTop: 20,
        marginHorizontal: 20
    },
    titleBackground: {
        fontSize: 16, 
        fontWeight: 'bold', 
        alignSelf: 'center', 
        marginBottom: 10,
    },
    titleContainer: {
        backgroundColor: 'white', 
        borderRadius: 5, 
        alignSelf: 'center', 
        borderWidth: 1, 
        borderColor: '#E72828' 
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

export default withNavigation(Report);
