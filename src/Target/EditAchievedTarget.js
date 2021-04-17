import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, TextInput, AsyncStorage, ActivityIndicator, Alert, KeyboardAvoidingView} from 'react-native';
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
let arrayList = [];

class EditAchievedTarget extends Component {
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
    id: null,
    placeholder: null,
    baseURL: null,
    errorCode: null,
    apiCode: null,
    commonModal: false
  };

  componentDidMount(){
    const {navigation} = this.props;
    this._unsubscribe = navigation.addListener("didFocus", async() => {
      await this.extractLink();
      this.initializeData();
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

  // componentDidMount(){
  //   this.initializeData();
  // }

  // componentDidUpdate(prevProps, prevState){
  //   //console.log("PARAMS: ", this.props.route.params)
  //   // console.log("PrevProps: ", prevProps.route.params.empArray.date)
  //   // console.log("Recent Props: ", this.props.route.params.empArray.date)
  //   if(prevProps.route.params.empArray[0].date !== this.props.route.params.empArray[0].date){
  //     this.initializeData();
  //     return;
  //   }else if (prevProps.route.params.empArray[0].dailyTarget !== this.props.route.params.empArray[0].dailyTarget){
  //     this.initializeData()
  //     return;
  //   }
  // }

  initializeData() {
    arrayList = this.props.empArray
    console.log('EmpArray Received: ', arrayList)
    this.setState({date: arrayList[0]["date"]})
    let empID = arrayList[0]["user_id"]
    this.setState({employeeID: empID})
    this.setState({id: arrayList[0]["id"]})
    this.setState({target: arrayList[0]["target"]})
    this.setState({achieved: arrayList[0]["achieved"]})
    let remaining = arrayList[0]["target"] - arrayList[0]["achieved"]
          
      remaining < 0 ? remaining = 0 : remaining
      
    this.setState({remainder: remaining})
    this.setState({number: arrayList[0]["dailyTarget"].toString()}, () => {
      const {target, achieved, remainder, number, employeeID, date, id, month} = this.state;
      console.log("Target:", target, "Achieved:", achieved, "Remainder:", remainder, "oldNumber:", number, "EMP-ID:", employeeID, "Date:", date, "ID:", id, "Month: ", month)
    })
    this.findMonthName(arrayList[0]["month"])
  }

  findMonthName(number){
    console.log('Month Number: ', number)
    this.setState({month: month[number - 1]})
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

  //==========Post Daily Target Details==========\\

  postDailyDetails = async () => {
    const {baseURL} = this.state;
    console.log("URL: ", `${baseURL}/arti-drugs/edit-achieved-target`)
    const user_token = await AsyncStorage.getItem('user_token');
    const permissions_fir= JSON.parse(user_token);
    extracted_token = permissions_fir.success.secret_token;
    //console.log('Achieved Target: ', extracted_token)
    console.log('AT Access Data: ', this.state.date, this.state.employeeID, this.state.number)
    const _this = this;
    this.showLoader(); 
    var data = new FormData();
    data.append("target_of", this.state.date);
    data.append("user_id", this.state.employeeID);
    data.append("target", this.state.number);
    data.append("achieve_target_id", this.state.id);
    
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function() {
      if(xhr.readyState !== 4) {
            return;
      }if(xhr.status === 200){
          _this.hideLoader();
          //console.log('POST E.A.T Data: ', xhr.responseText);
          Alert.alert("Updated Successfully!!!")
          const num = {dailyTarget: _this.state.number}
          _this.props.navigation.navigate('ReportLog', {feedback: num})
          //_this.getTarget();
      }else {
          _this.hideLoader();
          //console.log('POST E.A.T Error: ', xhr.responseText);
          _this.enableModal(xhr.status, "095");
      }
    });
    
    xhr.open("POST", `${baseURL}/arti-drugs/edit-achieved-target`);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${extracted_token}`);
    
    xhr.send(data);
  }

  onButtonPress(){
    const {date, number, error} = this.state;
    const check = date && number

    if(!check){
      this.setState({error: true})
      console.log("ERROR: ", this.state.error)
      //this.setState({value: this.state.value + 1})
      return;
    }else if(check){
      this.setState({error: false})
      this.postDailyDetails();
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
    const now = moment();
    const timeStamp = now.valueOf();
    const date = moment(timeStamp).format('DD MMM, YYYY');
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
        <Header navigation={this.props.navigation} title="Edit Achieved Target" width={[getWidthnHeight(65)]} menu="white" menuState={false}/>
    
          <View style={styles.targetText}>
            <Text style={{marginTop: 10}}>{`Target for ${this.state.month}`}</Text>

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
                    <Image style={{opacity: 0.2, width: 20, height: 20}} source={require('../Image/target32.png')}/>
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

            {(this.state.error) ? this.renderError() : null}

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
                  console.log('Selected: ', this.state.date)
                  // console.log('Selected: ', date)
                  // this.setState({date})
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
              placeholder={this.state.placeholder}
              keyboardType='numeric'
            />

            <Button style={[styles.buttonStyle, getWidthnHeight(90)]} onPress={()=> this.onButtonPress()}>
                UPDATE
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
      marginTop: 10,
      alignSelf: null,
      width: 370
  },
  boxStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: 'transparent',
    width: 70,
    height: 50
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

export default withNavigation(EditAchievedTarget);