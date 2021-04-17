import React, {Component} from 'react';
import {View, Dimensions, ActivityIndicator, Alert, AsyncStorage} from 'react-native';
import { withNavigation } from "react-navigation";
import {Text} from 'react-native-elements';
import {Dropdown} from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import LinearGradient from 'react-native-linear-gradient';
import {Input, Header, Button, DateSelector, GradientText, getWidthnHeight, Spinner, CommonModal, IOS_StatusBar} from '../KulbirComponents/common';
import {extractBaseURL} from '../api/BaseURL';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
//import EmployeeList from './EmployeeList';

let extracted_token = ""
//let baseURL = ""

class CreateTarget extends Component {
    constructor(props){
        super(props)

    this.state = {
        empData: [],
        dropdownValue: "",
        date: null,
        number: null,
        employeeID: null,
        name: null,
        loading: false,
        //clicked: false,
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
            if(this.state.name || this.state.date || this.state.number){
                this.setState({dropdownValue: ""})
                this.setState({empData: []})
                this.setState({employeeID: null})
                this.setState({date: null})
                this.setState({number: null})
                this.updateValue()
            }
          await this.extractLink();
          this.getEmpData();
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
    
    //==========Download Data==========\\
    getEmpData = async () => {
        const {baseURL} = this.state;
        this.setState({dropdownValue: ""})
        console.log("URL: ", `${baseURL}/arti-drugs/employees`)
        const user_token = await AsyncStorage.getItem('user_token');
        const permissions_fir= JSON.parse(user_token);
        extracted_token = permissions_fir.success.secret_token;
        console.log('CRT Token: ', permissions_fir, "BASE_URL: ", baseURL)
        const _this = this;
        this.showLoader();        
        this.setState({dropdownValue: "Select Employee"})
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
    
      xhr.addEventListener("readystatechange", function() {
        if(xhr.readyState !== 4 ) {
            return;
        }if(xhr.status === 200){
          _this.hideLoader();
          const dataList = JSON.parse(xhr.responseText);
          const empData = dataList.data
          const arrangedData = _this.manageData(empData);
          _this.setState({empData: arrangedData})
          //console.log('EmpData CRT: ', _this.state.empData);
        } else {
            console.log('CRT Error Data: ', xhr.responseText)
            _this.hideLoader();
            _this.enableModal(xhr.status, "090");
        }
      });
    
      xhr.open("GET", `${baseURL}/arti-drugs/employees`);
      xhr.setRequestHeader("Authorization", `Bearer ${extracted_token}`);
    
      xhr.send();
    }

    //==========Upload Data==========\\
    uploadEmpData = async () => {
        const {baseURL} = this.state;
        console.log("URL: ", `${baseURL}/arti-drugs/add-targets`)
        console.log('EmpData: ', this.state.empData)
        console.log("Upload: ", this.state.employeeID, this.state.name, this.state.date, this.state.number)
        const _this = this;
        this.showLoader(); 
        var data = new FormData();
        data.append("target_of", this.state.date);
        data.append("user_id", this.state.employeeID);
        data.append("employee_name", this.state.name);
        data.append("target", this.state.number);
        
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", function() {
          if(this.readyState !== 4) {
                return;
          } if(this.status === 200){
                _this.hideLoader();
                console.log('CRT Success Data: ', this.responseText);
                Alert.alert("Target Saved Successfully")
                _this.setState({employeeID: null})
                _this.setState({number: null})
                _this.setState({date: null})
                _this.setState({dropdownValue: ""})
                _this.updateValue();
          } else if(this.status === 400){
                _this.hideLoader();
                console.log('CRT Error: ', this.responseText);
                const dataList = JSON.parse(xhr.responseText);
                if(dataList.status === 'error'){
                    //_this.hideLoader();
                    Alert.alert("Target already assigned. Please select a different month.")
                    return;
                }
          } else {
                _this.hideLoader();
                _this.enableModal(xhr.status, "091");
          }
        });
        
        xhr.open("POST", `${baseURL}/arti-drugs/add-targets`);
        xhr.setRequestHeader("Authorization", `Bearer ${extracted_token}`);
        
        xhr.send(data);
    }

    manageData(empData){
        
        const arrangedData = empData.map((emp) => {
            const name = emp.fullname.split(" ")
            const idName = name[0].toUpperCase() + " " + "-" + " " + emp.employee_code
            return {empIDName: idName, fullname: emp.fullname, user_id: emp.user_id}
        })
        return arrangedData;
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

    updateValue() {
        this.setState({name: null})
        this.setState({dropdownValue : "Select Employee"}, () => console.log("Dropdown: ", this.state.dropdownValue))
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
                <Header navigation={this.props.navigation} title="Create Target" width={[{width: 160}, getWidthnHeight(50)]} menu="white"/>
                
                {(this.state.loading) ? <Spinner loading={this.state.loading} style={styles.loadingStyle}/> : null}
                
                <View>
                    <View style={[styles.dropDown, getWidthnHeight(90)]}>
                    
                        <Dropdown
                            value={this.state.dropdownValue}
                            data={this.state.empData}
                            label="Select Employee"
                            labelExtractor={({empIDName}) => empIDName}
                            valueExtractor={({user_id}) => user_id}
                            inputContainerStyle={{borderColor: 'gray', borderBottomWidth: 1}}
                            pickerStyle={[{marginHorizontal: 10, height: 200, width: 370}, getWidthnHeight(91)]}
                            onChangeText={(employeeID, index, data) => {
                                const name = data[index]['fullname']
                                console.log('SetName: ', name)
                                this.setState({name});
                                this.setState({employeeID});
                                //this.setState({clicked: !this.state.clicked})
                                //this.updateValue();
                            }
                            }
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
                                console.log('Selected: ', date)
                                this.setState({date})
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
                                placeholder='Type here'
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
                    CREATE
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
    showID: {
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        marginRight: 20, 
        alignItems: 'center', 
        marginBottom: -5, 
        marginTop: 5, 
        position: 'absolute',
        alignSelf: 'flex-end',
        marginTop: 17
    },
    loadingStyle: {
        shadowOffset: null, 
        shadowColor: 'black', 
        shadowOpacity: null, 
        shadowRadius: 10, 
        elevation: 5,
        backgroundColor: '#F2F4F4',
        height: 60,
        borderRadius:5
    },
};

export default withNavigation(CreateTarget);