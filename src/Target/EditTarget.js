import React, {Component} from 'react';
import {View, Dimensions, ActivityIndicator, Alert, AsyncStorage} from 'react-native';
import { withNavigation } from "react-navigation";
import {Text} from 'react-native-elements';
import {Dropdown} from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import LinearGradient from 'react-native-linear-gradient';
import {Input, Header, Button, DateSelector, GradientText, getWidthnHeight, CommonModal, IOS_StatusBar} from '../KulbirComponents/common';
import {extractBaseURL} from '../api/BaseURL';
//import EmployeeList from './EmployeeList';

let extracted_token = ""
let arrayList = [];
let month = null;
let year = null;

class CreateTarget extends Component {
    constructor(props){
        super(props)

    this.state = {
        empData: [],
        dropdownValue: "",
        date: null,
        number: null,
        employeeID: null,
        name: "",
        loading: false,
        placeholder: null,
        targetID: null,
        error: false,
        baseURL: null,
        errorCode: null,
        apiCode: null,
        commonModal: false 
        }
    }

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

    onDecline(){
        this.setState({commonModal: false})
      }
      
    enableModal(status, apiCode){
        this.setState({errorCode: status})
        this.setState({apiCode})
        this.setState({commonModal: true})
    }

    // componentDidMount() {
    //     this.initializeData();
    // }

    // componentDidUpdate(prevProps, prevState){
    //     //console.log("PARAMS: ", this.props.route.params)
    //     // console.log("PrevProps: ", prevProps.route.params.empArray.date)
    //     // console.log("Recent Props: ", this.props.route.params.empArray.date)
    //     if(prevProps.route.params.name !== this.props.route.params.name){
    //       this.initializeData();
    //       return;
    //     }else if (prevProps.route.params.oldTarget !== this.props.route.params.oldTarget){
    //       this.initializeData()
    //       return;
    //     }
    // }

    initializeData(){
        arrayList = this.props;
        console.log("RECEIVED EDIT: ", this.props)
        let data = [];
        data.push({"name": arrayList.empName, "user_id": arrayList.userID})
        this.setState({empData: data})
        this.setState({dropdownValue: arrayList.empName.toUpperCase()})
        month = arrayList.month
        if(month.toString().length == 1){
            month = "0" + month
        }
        year = arrayList.year
        this.setState({date: `${year}-${month}`}, () => console.log("MONTH_YEAR: ", `${year}-${month}`))
        this.setState({employeeID: arrayList.userID})
        this.setState({name: arrayList.empName})
        this.setState({number: arrayList.oldTarget.toString()})
        this.setState({targetID: arrayList.id}, () => console.log("TARGET ID: ", this.state.targetID))
    }

    showLoader = () => {
        this.setState({ loading: true });
    }

    hideLoader = () => {
        this.setState({ loading: false });
    }

    //==========Upload Data==========\\
    uploadEmpData = async () => {
        const {baseURL} = this.state;
        console.log("URL: ", `${baseURL}/arti-drugs/edit-target`)
        const user_token = await AsyncStorage.getItem('user_token');
        const permissions_fir= JSON.parse(user_token);
        extracted_token = permissions_fir.success.secret_token;
        //console.log("EmpData: ", this.state.empData)
        console.log("Upload: ", this.state.employeeID, this.state.name, this.state.date, this.state.number)
        const _this = this;
        this.showLoader(); 
        var data = new FormData();
        data.append("target_of", this.state.date);
        data.append("user_id", this.state.employeeID);
        data.append("employee_name", this.state.name);
        data.append("target", this.state.number);
        data.append("target_id", this.state.targetID)
        
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", function() {
          if(this.readyState !== 4) {
                return;
          } if(this.status === 200){
                _this.hideLoader();
                // _this.setState({name: ""})
                // _this.setState({employeeID: null})
                // _this.setState({number: null})
                // _this.setState({date: null})
                Alert.alert("Updated Successfully!!!")
                const num = {feedback: _this.state.number}
                _this.props.navigation.navigate('TeamReport', {feedback: num})
                //console.log('Success Data: ', this.responseText);
          } else {
                _this.hideLoader();
                //console.log('Error: ', this.responseText);
                _this.enableModal(xhr.status, "092");
          }
        });
        
        xhr.open("POST", `${baseURL}/arti-drugs/edit-target`);
        xhr.setRequestHeader("Authorization", `Bearer ${extracted_token}`);
        
        xhr.send(data);
    }

    onButtonPress(){
        const {name, employeeID, number, date} = this.state;
        const check = name && employeeID && number && date;
        
        if(!check){
            this.setState({error: true})
        }else if(check){
            this.setState({error: false})
            this.uploadEmpData();
            //this.updateValue();
        } else {
            return;
        }
    }

    updateValue(id, name) {
        this.setState(() => {
            let dropdownValue = "Select Employee";
            console.log('Selected: ', dropdownValue)
            return {dropdownValue};
        }, () => {
            console.log('Finally: ', this.state.dropdownValue)
        })
    }

    renderError(){
        return(
          <View style={{alignItems: 'center', marginTop: 20, marginBottom: -20}}>
              <Text style={{color: 'red', fontSize: 10}}>***All fields are manadatory****</Text>
          </View>
        );
    }

    render() {
        const {errorCode, apiCode} = this.state;
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
                <Header navigation={this.props.navigation} title="Edit Target" width={[{width: 160}, getWidthnHeight(40)]} menu="white" menuState={false}/>

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
                
                <View>
                    <View style={[styles.dropDown, getWidthnHeight(90)]}>
                    
                        <Dropdown
                            value={this.state.dropdownValue}
                            data={this.state.empData}
                            label="Select Employee"
                            labelExtractor={({name}) => name.toUpperCase()}
                            //valueExtractor={({user_id}) => user_id}
                            inputContainerStyle={{borderColor: 'gray', borderBottomWidth: 1}}
                            pickerStyle={[{marginHorizontal: 10, height: 50, width: 370}, getWidthnHeight(91)]}
                        />

                    </View>

                    <View style={[{width: 370, marginHorizontal: 20, marginTop: 20,}, getWidthnHeight(90)]}>
                        <DateSelector 
                            style={[getWidthnHeight(90)]}
                            date={this.state.date}
                            androidMode='spinner'
                            mode='date'
                            placeholder='Select Month Only'
                            format='YYYY-MM'
                            minDate='2019-08'
                            maxDate='2025-08'
                            onDateChange={(date) => {
                                console.log("Selected: ", this.state.date)
                                // console.log('Selected: ', date)
                                // this.setState({date})
                            }} 
                        />
                        <View style={styles.forDate}>
                            <GradientText title='For Month' style={{fontSize: 9, marginHorizontal: 4, fontWeight: null, width: 57}}/>
                        </View>
                    </View>

                <View style={{flexDirection: 'column', alignItems: 'center', marginTop: 15}}>
                    <Text style={{fontSize: 16, color: 'gray'}}>Enter Target Amount</Text>
                    <View>
                        <View style={styles.alignment}>
                            <View style={styles.circle}>
                            <LinearGradient 
                                start={{x: -0.5, y: 1.5}} 
                                end={{x:0.8, y: 0.0}}  
                                colors={['#F71A1A', '#E1721D']} 
                                style={styles.linearGradient}/>
                            </View>
                            <Input 
                                updateContainer={{flex: null, flexDirection: 'column', marginTop: 10}}
                                style={styles.inputStyle}
                                value={this.state.number}
                                onChangeText={(text) => {
                                    const number = text.replace(/[^0-9]/g, '')
                                    this.setState({number})
                                }}
                                placeholder={this.state.placeholder}
                                keyboardType='numeric'
                            />
                            <View style={styles.circle}>
                            <LinearGradient 
                                start={{x: -0.5, y: 1.5}} 
                                end={{x:0.8, y: 0.0}} 
                                colors={['#F71A1A', '#E1721D']} 
                                style={styles.linearGradient}/>
                            </View>
                        </View>
                    </View>
                </View>

                {this.state.error ? this.renderError() : null}
                
                <Button onPress={() => this.onButtonPress()} style={[getWidthnHeight(90)]}>
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
        );
    }
}

const styles = {
    inputStyle: {
        flex: null, 
        borderColor: '#E97A26', 
        borderTopWidth: 1,
        borderBottomWidth: 1, 
        textAlign: 'center',
        borderRadius: 5,
        width: 200
    },
    dropDown: {
        width: 370,
        marginTop: 25,
        marginHorizontal: 20
    },
    datePicker: {
        marginHorizontal: 20,
        marginVertical: 20
    },
    circle: {
        position: 'relative',
        height: 50,
        width: 50,
        backgroundColor: 'red',
        borderRadius: 50,
        marginTop: 10,
        marginHorizontal: -30
    },
    alignment: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50,
        borderRadius: 50
    },
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
};

export default withNavigation(CreateTarget);