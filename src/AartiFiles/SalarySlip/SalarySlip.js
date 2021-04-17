import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Platform, Image, TextInput, Dimensions, ScrollView, PermissionsAndroid, Alert, AsyncStorage, ActivityIndicator} from 'react-native';
import { withNavigation } from "react-navigation";
import {PDFDocument, PDFPage} from 'react-native-pdf-lib';
import RNFS, { stat } from 'react-native-fs';
import moment from 'moment';
import { LinearTextGradient } from 'react-native-text-gradient';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-datepicker';
import {Dropdown} from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Input, Button, Header, GradientText, DateSelector, SearchIcon, Card, getWidthnHeight, DataBar, Spinner, CommonModal, IOS_StatusBar, pdfSheet} from '../../KulbirComponents/common';
import {extractBaseURL} from '../../api/BaseURL';

const monthList = [
    {"month": "January", "id": 1}, {"month": "February", "id": 2},
    {"month": "March", "id": 3}, {"month": "April", "id": 4},
    {"month": "May", "id": 5}, {"month": "June", "id": 6},
    {"month": "July", "id": 7}, {"month": "August", "id": 8},
    {"month": "September", "id": 9}, {"month": "October", "id": 10},
    {"month": "November", "id": 11}, {"month": "December", "id": 12}
]

class SalarySlip extends Component {
    state = {
        date: null,
        month: null,
        target: null,
        achieved: null,
        id: null,
        empData: [],
        monthID: null, 
        yearID: null,
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
        commonModal: false,
        monthList: monthList,
        yearsList: this.yearList(),
        update: false,
        pdfFilePath: null,
        updateField: false,
        wait: false,
        status: false
    }

    async componentDidMount(){
        const {navigation} = this.props;
        this._unsubscribe = navigation.addListener("didFocus", async() => {
            await this.extractLink();
            if(Platform.OS === "android"){
                try {
                    await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                        {
                            title: 'Storage Permission',
                            message: 'Write storage permission required',
                            buttonNegative: 'Cancel',
                            buttonPositive: 'Ok'
                        },
                        );
                }catch(error){
                    console.warn(error);
                }
            }
            
        })  
    }

    async extractLink(){
        await extractBaseURL().then((baseURL) => {
          this.setState({baseURL}, () => console.log("EXTRACT LINK: ", this.state.baseURL))
        })
    }

    yearList() {
        let startYear = 2018;
        let endYear = moment().year();
        let id = 1;
        const yearsList = [];
        while ( startYear <= endYear ) {
            yearsList.push({"year": startYear++, "id": id++});
        }  
        return yearsList;
    }

    UNSAFE_componentWillUnmount(){
        this._unsubscribe().remove();
    }

   //========== SALARY SLIP API ==========\\
   getSalarySlip = async () => {
    const {baseURL} = this.state;
    console.log("URL: ", `${baseURL}/get-salary-detail`)
    const user_token = await AsyncStorage.getItem('user_token');
    const permissions_fir= JSON.parse(user_token);
    let extracted_token = permissions_fir.success.secret_token;
    this.setState({empCode: permissions_fir.success.user.employee_code})
    console.log('SENT DATA: ', this.state.empCode, this.state.monthID, this.state.yearID)
    const _this = this;
    this.showLoader(); 

    var data = new FormData();
    data.append("employee_code", this.state.empCode);
    //data.append("employee_code", 29021);
    data.append("salary_month", this.state.monthID);
    data.append("salary_year", this.state.yearID);
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
  
    xhr.addEventListener("readystatechange", function() {
      if(xhr.readyState !== 4 ) {
          return;
      }if(xhr.status === 200){
        _this.hideLoader();
        let dataList = JSON.parse(xhr.responseText);
        let data = dataList.success.salary_detail;
        console.log('******Salary Slip Success: ', xhr.responseText)
        if(data !== [] && data !== null && data.length !== null && data.length > 0){
            console.log("***ARRAY CONTAINS DATA***")
            const empData = data;
            _this.setState({empData})
            _this.setState({arrayLength: _this.state.empData.length})
          }else{
            console.log("***EMPTY ARRAY***")
            const empData = data
            _this.setState({empData})
            _this.setState({arrayLength: _this.state.empData.length})
            Alert.alert("Not Available")
            //_this.setState({})
          }
      } else {
          console.log('***ERROR: ', xhr.responseText)
          _this.hideLoader();
          _this.enableModal(xhr.status, "104");
      }
    });
  
    xhr.open("POST", `${baseURL}/get-salary-detail`);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${extracted_token}`);
    xhr.send(data);
  }

//   async createPDF(){
//     let docsDir = await RNFS.ExternalStorageDirectoryPath;
//     docsDir = `file://${docsDir}`;
//     let pdfPath = `${docsDir}/kulbir2.pdf`;
//     console.log("PDF PATH: ", pdfPath)
//     RNFS.writeFile(pdfPath, 'PDF DATA', "base64").then((success) => {
//         console.log("DONE FILE CREATED", pdfPath)
//         this.savePDFFile();
//     }).catch((error) => {
//         console.log("ERROR OCCURED AT RNFS")
//     })
//   }

    savePDFFile(){
        const {empData, month, yearID, status} = this.state;
        //this.showLoader();
        const office = "Xeam Ventures Pvt. Ltd.";
        const address = "E202, Phase 8B, Ind. Area, Mohali (P.B.) -160055";
        const monthSalarySlip = `Salary Slip for the month of ${month}/ ${yearID}`;
        const month_yearID = `${month}-${yearID}`;
        this.setState({loading: true}, async() => {
            console.log("***PDF LOADING: ", this.state.loading);
            await pdfSheet(office, address, monthSalarySlip, empData, month_yearID, (status) => {
                if(status){
                    this.setState({loading: false}, () => console.log("***LOADING: ", this.state.loading))
                    this.setState({wait: false})
                }else{
                    this.setState({loading: true}, () => console.log("***STILL LOADING: ", this.state.loading))
                    this.setState({wait: true})
                }
            });
        })
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

    onButtonPress(){
        if(this.state.monthID === null || this.state.yearID === null){
            this.setState({error: true})
            return;
        }
        if(this.state.monthID !== null && this.state.yearID !== null){
            this.setState({error: false});
            this.getSalarySlip();  
        }
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
        const {type, id, target, achieved, arrayLength, name, dimensions, errorCode, apiCode, month, yearID, update} = this.state

        //console.log("MONTHS: ", moment().year())
        // const page1 = PDFPage.create()
        // .setMediaBox(200, 200)
        // .drawText("This text is using the font Franklin Gothic Medium!", {
        //     x: 5,
        //     y: 235,
        //     color: "#F62727",
        //     fontName: "Franklin Gothic Medium"
        // });
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
                <Header navigation={this.props.navigation} title="Salary Slip" width={[getWidthnHeight(60)]} menu="white"/>

                <View style={[{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginHorizontal: 15}, getWidthnHeight(90)]}>
                        
                        <Dropdown
                            value={this.state.dropdownValue}
                            data={this.state.monthList}
                            label="Select Month"
                            labelExtractor={({month}) => month}
                            valueExtractor={({id}) => id}
                            inputContainerStyle={{borderBottomWidth: 0}}
                            containerStyle={[{borderColor: '#F71A1A', borderBottomWidth: 1}, getWidthnHeight(30)]}
                            pickerStyle={[{marginHorizontal: 10}, getWidthnHeight(30, 25)]}
                            onChangeText={(id, index, data) => {
                                const monthID = data[index]['id']
                                this.setState({monthID});
                                this.setState({month: data[index]['month']})
                                console.log('Set MonthID: ', this.state.monthID, this.state.month)
                                if(this.state.month && this.state.yearID){
                                    this.setState({update: true})
                                }
                                this.setState({arrayLength: 0})
                                this.setState({empData: []})
                                }
                            }
                        />

                        <Dropdown
                            value={this.state.dropdownValue}
                            data={this.state.yearsList}
                            label="Select Year"
                            labelExtractor={({year}) => year}
                            valueExtractor={({id}) => id}
                            inputContainerStyle={{borderBottomWidth: 0}}
                            containerStyle={[{borderColor: '#F71A1A', borderBottomWidth: 1}, getWidthnHeight(30)]}
                            pickerStyle={[{marginHorizontal: 10}, getWidthnHeight(30, 25)]}
                            onChangeText={(id, index, data) => {
                                const yearID = data[index]['year']
                                this.setState({yearID});
                                console.log('Set YearID: ', this.state.yearID) 
                                if(this.state.month && this.state.yearID){
                                    this.setState({update: true})
                                }  
                                this.setState({arrayLength: 0})
                                this.setState({empData: []})
                                }
                            }
                        />

                        <View>
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
                    {/*Salary Slip*/}
                    {(arrayLength > 0) ?
                        <View style={{alignItems: 'center', marginTop: 70}}>
                            <TouchableOpacity onPress={async() => {
                                if(!this.state.wait){
                                    console.log("ALLOWED");
                                    this.setState({wait: true})
                                    await this.savePDFFile();
                                }else {
                                    console.log("NOT ALLOWED");
                                }
                            }}
                                style={{width: 60, height: 60, borderRadius: 60, alignItems: 'center', justifyContent: 'center', backgroundColor: '#69726F'}}>
                                <Image source={require('../../Image/pdf.png')} style={{width: 40, height: 40}}/>
                            </TouchableOpacity>
                            <Text style={{textAlign: 'center', fontSize: 10, color: '#CC4B4C', fontWeight: 'bold', marginTop: 10}}>To Download:  Click Icon "ONCE" and wait</Text>
                        </View>
                        :
                        <View/>
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
                                    (!update) ?
                                        <Text style={{color: 'gray', backgroundColor: 'transparent', fontSize: 12}}>NO DATA FOUND</Text>
                                    :   <Text style={{color: 'gray', backgroundColor: 'transparent', fontSize: 12}}>Salary Slip for {`${month.toUpperCase()}, ${yearID}`}</Text>
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
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
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

export default withNavigation(SalarySlip);
