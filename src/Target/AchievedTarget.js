import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, TextInput, AsyncStorage, ActivityIndicator, Alert, KeyboardAvoidingView, KeyboardAvoidingViewComponent} from 'react-native';
import { withNavigation } from "react-navigation";
import moment from 'moment';
import { LinearTextGradient } from 'react-native-text-gradient';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-datepicker';
import {Input, Button, Header, GradientText, DateSelector, getWidthnHeight, CommonModal, IOS_StatusBar} from '../KulbirComponents/common';
import {extractBaseURL} from '../api/BaseURL';

const now = moment();
const timeStamp = now.valueOf();
const month = ["January", "February", "March", "April",
               "May", "June", "July", "August", "September",
               "October", "November", "December"]

let extracted_token = ""             

class AchievedTarget extends Component {
  state = {
    number: null, 
    target: null, 
    remainder:null, 
    achieved: null, 
    date: null,
    presentDate: null,
    loading: false,
    employeeID: null,
    empData: [],
    month: null,
    error: false,
    value: 0,
    baseURL: null,
    errorCode: null,
    apiCode: null,
    commonModal: false
  };

  componentDidMount(){
    const {navigation} = this.props;
    this._unsubscribe = navigation.addListener("didFocus", async() => {
      this.setState({target: null})
      this.setState({achieved: null})
      this.setState({remainder: null})
      this.setState({month: null})
      this.setState({date: null})
      this.setState({number: null})
      await this.extractLink();
      this.getTarget();
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

  /*========== INDIVIDUAL EMPLOYEE REPORT ==========*/
  getTarget = async () => {
    const {baseURL} = this.state;
    console.log("URL: ", `${baseURL}/arti-drugs/employee/targets`)
    const presentDate = moment(timeStamp).format('YYYY-MM-DD');
    console.log("MONTH: ", moment(timeStamp).month())
    this.setState({presentDate})
    const user_token = await AsyncStorage.getItem('user_token');
    const permissions_fir= JSON.parse(user_token);
    const employeeID = permissions_fir.success.user.id
    this.setState({employeeID})
    extracted_token = permissions_fir.success.secret_token;
    //console.log('ACHVD TRGT Token: ', extracted_token)
    const _this = this;
    this.showLoader(); 
    var data = new FormData();
    data.append("target_of", this.state.presentDate);
    data.append("user_id", this.state.employeeID);
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState !== 4) {
            return;
      }if(this.status === 200){
          const dataList = JSON.parse(xhr.responseText);
          const empData = dataList.data
          console.log('ACHVD Success Data: ', dataList);
          if(dataList.status === "error"){
            _this.hideLoader();
            const findMonthName = moment(timeStamp).month();
            _this.setState({month: month[findMonthName]})
            Alert.alert("Target Not Assigned")
            return;
          }else if(dataList.data !== [] && dataList.data !== null && dataList.data.length !== null && dataList.data.length > 0){
            console.log("***ARRAY CONTAINS DATA***")
            const findMonthName = empData[0]['month']
            //console.log('Month Number: '. findMonthName)
            _this.setState({month: month[findMonthName - 1]})
          }else{
            console.log("***EMPTY ARRAY***")
            const findMonthName = moment(timeStamp).month();
            _this.setState({month: month[findMonthName]})
          }
          _this.setState({empData})
          _this.setState({target: dataList.target})
          _this.setState({achieved: dataList.total_month_achieved_target})
          let remainder = (_this.state.target - _this.state.achieved)
          
          remainder < 0 ? remainder = 0 : remainder

          _this.setState({remainder})        
          _this.hideLoader();
          _this.setState({dropdownValue: "Choose an option"})
      }else {
          _this.hideLoader();
          console.log('ACHVD Error: ', this.responseText);
          _this.enableModal(xhr.status, "093");
      }
    });
    
    xhr.open("POST", `${baseURL}/arti-drugs/employee/targets`);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${extracted_token}`);
    
    xhr.send(data);
  }

  //==========Post Daily Target Details==========\\

  postDailyDetails = async () => {
    const {baseURL} = this.state;
    console.log("URL: ", `${baseURL}/arti-drugs/achieved-targets`)
    const user_token = await AsyncStorage.getItem('user_token');
    const permissions_fir= JSON.parse(user_token);
    const token = permissions_fir.success.secret_token;
    //console.log('Achieved Target: ', token)
    console.log('AT Access Data: ', this.state.date, this.state.employeeID, this.state.number)
    const _this = this;
    this.showLoader(); 
    var data = new FormData();
    data.append("target_of", this.state.date);
    data.append("user_id", this.state.employeeID);
    data.append("target", this.state.number);
    
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function() {
      if(xhr.readyState !== 4) {
            return;
      }if(xhr.status === 200){
          _this.hideLoader();
          _this.setState({number: null})
          _this.setState({date: null})
          //console.log('AT Data: ', xhr.responseText);
          Alert.alert("Target Saved Successfully")
          _this.getTarget();
      }else if(xhr.status === 400) {
          _this.hideLoader();
          //console.log('AT Error: ', xhr.responseText);
          const dataList = JSON.parse(xhr.responseText);
          if(dataList.status === 'error'){
              //_this.hideLoader();
              //Alert.alert("Target for the specified date has already been assigned. Please select a different date")
              Alert.alert("Target already set. Please select a different date.");
          }
      } else {
          _this.hideLoader();
          _this.enableModal(xhr.status, "094");
      }
    });
    
    xhr.open("POST", `${baseURL}/arti-drugs/achieved-targets`);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${extracted_token}`);
    
    xhr.send(data);
  }

  onButtonPress(){
    const {date, number, error, target} = this.state;
    const check = date && number

    if(!check){
      this.setState({error: true})
      //this.setState({value: this.state.value + 1})
      return;
    }else if(check){
      this.setState({error: false})
      if(target){
        this.postDailyDetails();
      }else {
        this.setState({date: null})
        this.setState({number: null})
        Alert.alert("Monthly target not set. Please contact your Admin.")
      }
    }
  }

  renderError(){
    return(
      <View>
          <Text style={styles.shakeText}>***Both fields are required****</Text>
      </View>
    );
  }

  render() {
    const {errorCode, apiCode, achieved, remainder} = this.state;
    // const now = moment();
    // const timeStamp = now.valueOf();
    // const date = moment(timeStamp).format('DD MMM, YYYY');
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
      <KeyboardAvoidingView behavior="position" style={{flex: 1}}>
      <View style={[{backgroundColor: 'white'}, getWidthnHeight(100)]}>
        <IOS_StatusBar color={gradient} barStyle="light-content"/>
        <Header navigation={this.props.navigation} title="Achieved Target" width={[getWidthnHeight(55)]} menu="white"/>
        
          <View style={styles.targetText}>
          {(this.state.target) ?
            <Text style={{marginTop: 10}}>{`Target for ${this.state.month}`}</Text>
            : null
          }
            {/*Assigned Target Value*/}
            <GradientText title={this.state.target}/>

            {(this.state.loading) ?
              <View style={{
                         flex:1, flexDirection:'row', width: '50%', backgroundColor: '#EFEFEF',
                         alignItems: 'center', justifyContent: 'center',
                         position: 'absolute', height:'10%',
                         shadowOffset:{  width: 100,  height: 100,},
                         shadowColor: '#330000',
                         shadowOpacity: 0,
                         shadowRadius: 5,
                         elevation: 10,
                         left:'25%',
                         top:'40%'
                     }}>

              <ActivityIndicator  size="large" color='rgb(19,111,232)'/>
                      <Text style={{fontSize:15,left:10}}>Loading..</Text>
              </View>
            : null}

            <View style={{flexDirection: 'row', marginTop: 30, alignItems: 'center'}}>
              
              <View style={[styles.redBox, getWidthnHeight(45, 11)]}>
                <View style={styles.hourglass}>
                  <Image source={require('../Image/hourglass.png')}/>
                </View>
                  <View style={[styles.boxStyle, getWidthnHeight(20, 7)]}>
                    <Text style={{color: 'white', fontSize: 11, fontWeight: 'bold'}}>REMAINING</Text>
                    <Text style={{color: 'white', fontSize: (remainder < 1000)? 25: 14, fontWeight: 'bold'}}>{remainder}</Text>
                  </View>
                  <View style={{alignSelf: 'flex-start', marginTop: 10}}>
                    <Image style={[{opacity: 0.2, width: 20, height: 20}]} source={require('../Image/target32.png')}/>
                  </View>
              </View>
              

              <View>
                <View style={[styles.greenBox, getWidthnHeight(45, 11)]}>
                <View style={styles.targetChecked}>
                  <Image source={require('../Image/targetChecked.png')}/>
                </View>
                  <View style={[styles.boxStyle, getWidthnHeight(20, 7)]}>
                    <Text style={{color: 'white', fontSize: 11, fontWeight: 'bold'}}>ACHIEVED</Text>
                    <Text style={{color: 'white', fontSize: (achieved < 1000)? 25: 14, fontWeight: 'bold'}}>{achieved}</Text>
                  </View>
                  <View style={{alignSelf: 'flex-start', marginTop: 10}}>
                    <Image style={{opacity: 0.2, width: 20, height: 20}} source={require('../Image/target32.png')}/>
                  </View>
                </View>
              </View>

            </View>

            <View style={{marginVertical: 40}}>
              <LinearGradient 
                start={{x: -0.5, y: 1.5}} 
                end={{x:0.8, y: 0.0}} 
                colors={['#F71A1A', '#E1721D']} 
                style={styles.linearGradient}/>
            </View>

            {this.state.error ? this.renderError() : null}

            {/*Date*/}
            <View style={[getWidthnHeight(90)]}>
              <DateSelector 
                style={[getWidthnHeight(90)]}
                date={this.state.date}
                androidMode='default'
                mode='date'
                placeholder='Select Date'
                format='YYYY-MM-DD'
                minDate='2019-08-15'
                maxDate='2025-05-15'
                onDateChange={(date) => {
                  console.log('Selected: ', date)
                  if(date <= this.state.presentDate){
                    this.setState({date})
                  }else if(date > this.state.presentDate){
                    Alert.alert("Future dates are restricted")
                    this.setState({date: null})
                  }

              }} 
              />
              <View style={styles.forDate}>
                <GradientText title='For Date' style={{fontSize: 10, marginLeft: 5, fontWeight: null, width: 57}}/>
              </View>
            </View>

            {/*User Enters a Number*/}
            <Input 
              updateContainer={[{flex: null, flexDirection: 'column', marginVertical: 20}, getWidthnHeight(90)]}
              style={[styles.inputStyle, getWidthnHeight(90)]}
              value={this.state.number}
              onChangeText={(text) => {
                const number = text.replace(/[^0-9]/g, '')
                this.setState({number})
            }}
              placeholder='Enter Target Achieved'
              keyboardType='numeric'
            />

            <Button style={[styles.buttonStyle, getWidthnHeight(90)]} onPress={()=> this.onButtonPress()}>
                SUBMIT
            </Button>
          </View>
          <CommonModal 
              title="Something went wrong"
              subtitle= {`Error Code: ${errorCode}${apiCode}`}
              visible={this.state.commonModal}
              onDecline={this.onDecline.bind(this)}
              buttonColor={['#0E57CF', '#25A2F9']}
          />
      </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  targetText: {
      marginTop: 30,
      height:'95%',
      width:'100%',
      backgroundColor:'white',
      flexDirection: 'column',
      alignItems: 'center',
  },
  inputStyle: {
      flex: null, 
      borderColor: 'gray', 
      borderWidth: 1, 
      textAlign: 'left',
      height: 43,
      width: 370,
  },
  buttonStyle: {
      flex: null,
      alignSelf: null,
      width: 370
  },
  boxStyle: {
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  redBox: {
    backgroundColor:'#E96035', 
    width: 180, 
    height: 70, 
    borderRadius: 10, 
    marginRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  greenBox: {
    backgroundColor:'#06B485', 
    width: 180, 
    height: 70, 
    borderRadius: 10,
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 3,
    width: 150,
    borderRadius: 50
  },
  hourglass: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40, 
    height: 40, 
    backgroundColor: 'white', 
    borderRadius: 40
  },
  targetChecked: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40, 
    height: 40, 
    backgroundColor: 'white', 
    borderRadius: 40
  },
  forDate: {
    position: 'absolute',
    backgroundColor: 'white',
    alignItems: 'flex-start',  
    borderColor: 'black', 
    borderWidth: 0, 
    marginTop: -7, 
    width: 50, 
    height: 16,
    marginLeft: 10,
  },
  shakeText: {
    alignItems: 'center', 
    color: 'red', 
    fontSize: 10, 
    marginTop: -20, 
    marginBottom: 20
  }
}

export default withNavigation(AchievedTarget);