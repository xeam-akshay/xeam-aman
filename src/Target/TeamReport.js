import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, TextInput, Dimensions, ScrollView, Alert, AsyncStorage, ActivityIndicator} from 'react-native';
import { withNavigation } from "react-navigation";
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {Dropdown} from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Header, GradientText, DateSelector, SearchIcon, Card, getWidthnHeight, Spinner, EditableCard, CommonModal, IOS_StatusBar, Input} from '../KulbirComponents/common';
import {extractBaseURL} from '../api/BaseURL';
import {searchText} from '../actions';

const month = ["January", "February", "March", "April",
               "May", "June", "July", "August", "September",
               "October", "November", "December"]

let extracted_token = ""

class Report extends Component {
    state = {
        date: null,
        month: null,
        target: null,
        achieved: null,
        id: null,
        empData: [],
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
        searchModal: false,
        showSearch: false,
        filterByName: []
    }

    // componentDidMount() {
    //     this.getEmpData()
    // }

    componentDidMount(){
        const {navigation} = this.props;
        this._unsubscribe = navigation.addListener("didFocus", async() => {
        await this.extractLink(); 
        this.getEmpData();
        this.setState({empData: []})
        this.setState({dataType: null})
        this.setState({showSearch: false})
          if(this.state.name === "ALL" && this.state.date){
            this.allEmpReport()
          }else if(this.state.name !== null && this.state.name !== undefined && this.state.name !== "ALL" && this.state.date){ 
            this.employeeReport()
          }
        this.props.searchText(null)
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

    // UNSAFE_componentWillReceiveProps(nextProps){
    //     if(nextProps.route.params){
    //         console.log("All Employee Reload")
    //         this.setState({dataType: null})
    //         this.allEmpReport();
    //     }
    // }

    onDecline(){
        this.setState({commonModal: false})
      }

    onSearchDecline(){
    this.setState({searchModal: false})
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
        this.setState({showSearch: false})
        console.log("EMPDATA: ", this.state.empData, "EMP: ", this.state.emp)
        //this.setState({empCode: null})
    }

    //========== DOWNLOAD EMPLOYEE LIST ==========\\
    getEmpData = async () => {
      const {baseURL} = this.state;
      console.log("URL: ", `${baseURL}/arti-drugs/employees`)
      const user_token = await AsyncStorage.getItem('user_token');
      const permissions_fir= JSON.parse(user_token);
      extracted_token = permissions_fir.success.secret_token;
      //console.log('CRT Token: ', extracted_token)
      const _this = this;
      this.showLoader();        
    
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
    
      xhr.addEventListener("readystatechange", function() {
        if(xhr.readyState !== 4 ) {
            return;
        }if(xhr.status === 200){
          _this.hideLoader();
          let dataList = JSON.parse(xhr.responseText);
          let empList = dataList.data
          let arrangedData = _this.manageData(empList);
          const addAll = {fullname: "ALL", user_id: "ADMIN", empIDName: "ALL"}
          arrangedData.unshift(addAll) 
          _this.setState({empList: arrangedData})
          arrangedData = [];
          dataList = {};
          empList = [];
          //console.log('EmpList TM-RPT: ', _this.state.empList);
        } else {
            console.log('TM-RPT Error EmpList: ', xhr.responseText)
            _this.hideLoader();
            _this.enableModal(xhr.status, "097");
        }
      });
    
      xhr.open("GET", `${baseURL}/arti-drugs/employees`);
      xhr.setRequestHeader("Authorization", `Bearer ${extracted_token}`);
    
      xhr.send();
    }

    /*========== INDIVIDUAL EMPLOYEE REPORT ==========*/
    employeeReport = async () => {
        const {baseURL} = this.state;
        console.log("URL: ", `${this.state.baseURL}/arti-drugs/employee/targets`)
        //const extracted_token = permissions_fir.success.secret_token;
        //console.log('TM-RPT Token: ', extracted_token)
        const _this = this;
        this.showLoader(); 
        var data = new FormData();
        data.append("target_of", this.state.date);
        data.append("user_id", this.state.id)
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", function() {
          if(this.readyState !== 4) {
                return;
          }if(this.status === 200){
                _this.hideLoader();
                //console.log("Response Text: ", xhr.responseText)
                let dataList = JSON.parse(xhr.responseText);
                if(dataList.status === 'error'){
                    //_this.hideLoader();
                    _this.setState({dataType: null})
                    Alert.alert("Target Not Assigned")
                    return;
                }
                let emp = dataList.data
                console.log("EMP: ", emp.length)
                _this.setState({emp})
                _this.setState({target: dataList.target})
                _this.setState({achieved: dataList.total_month_achieved_target})
                console.log('here', _this.state.id)
                //console.log('TM-RPT Singular Data: ', emp);
                if( typeof emp !== []
                    && emp !== null
                    && emp.length !== null
                    && emp.length > 0){
                        _this.setState({empCode: emp[0]['employee_code']})
                        _this.setState({month: month[emp[0]['month'] - 1].toUpperCase()})
                    }
                    _this.setState({dataType: 'single'})
                    dataList = {};
                    emp = [];
                }else {
                    _this.hideLoader();
                    console.log('TM-RPT Error: ', this.responseText);
                    _this.enableModal(xhr.status, "098");
                }
        });
        
        xhr.open("POST", `${baseURL}/arti-drugs/employee/targets`);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Authorization", `Bearer ${extracted_token}`);
        
        xhr.send(data);
      }

      /*========== ALL EMPLOYEES REPORT ==========*/
      allEmpReport = async () => {
        const {baseURL} = this.state;
        console.log("CALLING ALL")
        console.log("URL: ", `${baseURL}/arti-drugs/filter`)
        const _this = this;
        this.showLoader(); 
        var data = new FormData();

        data.append("target_of", this.state.date);

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", function() {
          if(this.readyState !== 4) {
                return;
          }if(this.status === 200){
            _this.hideLoader();
            //console.log("SUCCESS 200***")
            //console.log("ALL Response Text: ", xhr.responseText)
            let dataList = JSON.parse(xhr.responseText);
            if(dataList.status === 'error'){
            //_this.hideLoader();
            _this.setState({dataType: null})
            Alert.alert("Target Not Assigned")
            return;
            }
            //console.log("AGAIN SUCCESS 200***")
            let sortNames = dataList.data
            let empData = _this.sortEmpNames(sortNames)
            //console.log("AFTER SORT*****")
            _this.setState({empData: empData})
            _this.setState({arrayLength: _this.state.empData.length})
            _this.setState({showSearch: true});
            //console.log("AFTER SORT AGAIN*****")
            //console.log('CardArrayLength: ', _this.state.arrayLength)
            //   findMonthName = empData[0]['month']
            //   console.log('Month Number: '. findMonthName)
            //   this.setState({month: month[findMonthName - 1]})
            //console.log('TM-RPT Multiple Data: ', _this.state.empData);
            //console.log(" BEFORE SECOND LAST SUCCESS 200***")
            _this.setState({dataType: "multiple"})
            //console.log("SECOND LAST SUCCESS 200***")
            dataList = {};
            sortNames = [];
            empData = [];
            console.log("LAST SUCCESS 200***")
          }else {
              _this.hideLoader();
              console.log('TM-RPT Error: ', this.responseText);
              _this.enableModal(xhr.status, "099");
          }
        });
        
        xhr.open("POST", `${baseURL}/arti-drugs/filter`);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Authorization", `Bearer ${extracted_token}`);
        
        xhr.send(data);
      }

      sortEmpNames(sortNames){
          console.log("***SORT NAMES")
        return (
            sortNames.sort((a, b) => {
            if(a.employee_name > b.employee_name){
                return 1
            } else if(a.employee_name < b.employee_name){
                return -1
            } else {
                return 0
            }
        })
      )
    }

    manageData(empList){
        let arrangedData = [];
        return arrangedData = empList.map((emp) => {
            const name = emp.fullname.split(" ")
            const idName = name[0].toUpperCase() + " " + "-" + " " + emp.employee_code
            return {empIDName: idName, fullname: emp.fullname, user_id: emp.user_id}
        })
    }

    onButtonPress(){
        if(this.state.date === null || this.state.id === null){
            this.setState({error: true})
            return;
        }else if(this.state.date && typeof this.state.id === "number"){
            this.setState({error: false})
            this.employeeReport();
            return;
        }else if(this.state.date && this.state.id === "ADMIN"){
            this.setState({error: false})
            this.allEmpReport();
        }
    }

    renderError(){
        return (
            <View style={{alignItems: 'center', marginTop: 15, marginBottom: -15}}>
                <Text style={{fontSize: 10, color: 'red'}}>***Both fields are required***</Text>
            </View>
        );
    }

    singleCard() {
        const {emp, name, empCode, target, achieved, date} = this.state
        return (
                <Card 
                    name={name.toUpperCase()}
                    id={empCode}
                    target={target}
                    achieved={achieved}
                />
        );
    }

    searchEmpName(empArray, searchName){
        const filterNames = empArray.filter((data) => {
            const empName = data.employee_name.toLowerCase().includes(searchName.toLowerCase())
            return empName
        })
        if(filterNames.length < 1){
            console.log("NO RESULTS TO DISPLAY")
            return;
        }
        //console.log("*******FILTER NAMES: ", filterNames, searchName.split(''), typeof filterNames.length)
        const splitArray = searchName.toLowerCase().split('');
        const searchLength = splitArray.length;
        let data = [];
        //console.log("SPLIT SEARCH: ", splitArray, searchLength)
        for(let i = 0; i <= filterNames.length - 1; i++){
            const empName = filterNames[i]['employee_name'];
            const splitEmpName = empName.toLowerCase().split('');
            //console.log("INSIDE LOOP: ", empName, splitEmpName, searchLength)
                for(let j = 0; j < searchLength; j++){
                    //console.log("INSIDE FOR LOOP****: ", j, searchLength, splitArray)
                    if(splitArray[j] !== splitEmpName[j]){
                        break;
                    }
                    if(j === searchLength - 1 && splitArray[j] === splitEmpName[j]){
                        data.push(filterNames[i])
                        console.log("FOR LOOP DATA: ", data)
                    }
                }
        }
        return data;
    }

    multipleCards(){
        const {empData} = this.state;
        // this.setState({targetMonth: empData[0]["month"]})
        // console.log("TEST MONTH: ", targetMonth)
        // console.log("*****MULTICARD BEFORE FILTER: ", this.props.inputText.text, empData)
        let empArray = empData;
        let data = [];
        const searchName = this.props.inputText.text;
        //console.log("BEFORE FILTER*****: ", empArray, empArray.length, searchName)
        if(searchName){
            data = this.searchEmpName(empArray, searchName);
            console.log("IF STATEMENT: ", searchName, data)
            if(data === undefined){
                data = []
            }
        }
        console.log("GAURAV SIR: ", data)
        if(data !== [] && data !== null && data.length !== null && data.length > 0){
            return data.map((card, index) => (
                <View>
                    <EditableCard
                        key={index}
                        name={card.employee_name.toUpperCase()}
                        userID={card.user_id}
                        target={card.target}
                        achieved={card.achieved_target}
                        //userID={card.user_id}
                        month={card.month}
                        year={card.year}
                        //name={card.employee_name} 
                        id={card.id}
                        oldTarget={card.target}
                        empCode={card.employee_code}
                        navigation={this.props.navigation}
                        employer={this.props.employer}
                    />
                </View>
                )); 
        }else{
            return empData.map((card, index) => (
                <View>
                    <EditableCard
                        key={index}
                        name={card.employee_name.toUpperCase()}
                        userID={card.user_id}
                        target={card.target}
                        achieved={card.achieved_target}
                        //userID={card.user_id}
                        month={card.month}
                        year={card.year}
                        //name={card.employee_name} 
                        id={card.id}
                        oldTarget={card.target}
                        empCode={card.employee_code}
                        navigation={this.props.navigation}
                        employer={this.props.employer}
                    />
                </View>
                ));  
            }      
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
        const _this = this;

        const {name, id, target, achieved, loading, arrayLength, empData, dataType, dimensions, errorCode, apiCode, showSearch} = _this.state

        //console.log(`Report Check: ${name}, ${id}, ${target}, ${achieved}`)

        console.log("SEARCH TEXT: ", this.props.inputText.text, this.props.filteredNames)

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
                <Header navigation={this.props.navigation} title="Team Secondary Report" width={[getWidthnHeight(65)]} menu="white"/>

                <View style={{alignItems: 'center', marginHorizontal: 15}}>

                    <View style={[styles.dropDown, getWidthnHeight(90)]}>
                        
                        <Dropdown
                            value={this.state.dropdownValue}
                            data={this.state.empList}
                            label="Select Employee"
                            labelExtractor={({empIDName}) => empIDName}
                            valueExtractor={({user_id}) => user_id}
                            inputContainerStyle={{borderColor: 'gray', borderBottomWidth: 1}}
                            pickerStyle={[{marginHorizontal: 10, height: 200, width: 370}, getWidthnHeight(91)]}
                            onChangeText={(employeeID, index, data) => {
                                const name = data[index]['fullname']
                                const empCode = data[index]['empIDName'].split("-")
                                //console.log('SetName: ', name, "EmpCode: ", empCode[1])
                                this.setState({name});
                                this.setState({id: employeeID});
                                this.setState({empCode: empCode[1]})
                                this.resetState()
                                //this.setState({month: null})
                                //this.updateValue(employeeID, name);
                                }
                            }
                        />

                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={[{marginHorizontal: 8, marginTop: (!showSearch)? 25: 10}, getWidthnHeight(75)]}>
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
                                    this.resetState()
                                }} 
                            />
                            <View style={styles.forDate}>
                                <GradientText title='For Month' style={{fontSize: 9, marginHorizontal: 4, fontWeight: null, width: 57}}/>
                            </View>
                        </View>
                        
                        <View>
                            <TouchableOpacity onPress={() => this.onButtonPress()}>
                                <SearchIcon style={{marginTop: (!showSearch)? 25: 10}} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

                {(this.state.error) ? this.renderError() : null}

                <View style={{marginVertical: 0, alignItems: 'center', borderColor: 'black', borderWidth: 0}}>
                    {(!this.state.showSearch)?
                        <LinearGradient 
                            start={{x: -0.5, y: 1.5}} 
                            end={{x:0.8, y: 0.0}} 
                            colors={['#F71A1A', '#E1721D']} 
                            style={[styles.linearGradient, getWidthnHeight(28)]}/>
                        :
                        <View style={{marginVertical: 10}}>
                            <Input 
                                updateContainer={[{flex: null, flexDirection: 'column', marginVertical: 0}, getWidthnHeight(80)]}
                                style={[styles.inputStyle, getWidthnHeight(75)]}
                                value={this.props.inputText.text}
                                onChangeText={(text) => {
                                    //const number = text.replace(/[^0-9]/g, '')
                                    //this.setState({text})
                                    this.props.searchText(text);
                                }}
                                placeholder='Type your search'
                                keyboardType='default'
                            />
                        </View>
                    }
                </View>

                <View style={{backgroundColor: '#EEEDED', flex: 1, marginTop: 10}}>
                
                    {/*Employee Card*/}
                    {(dataType !== null) ?
                    <View style={{backgroundColor: '#EEEDED', marginTop: 0}}>
                        <ScrollView style={{marginTop: 0, backgroundColor: '#EEEDED'}}>
                            <View style={{backgroundColor: '#EEEDED', marginTop: 20,}}>
                                {
                                    dataType === "single" ?
                                        this.singleCard()
                                    :
                                        this.multipleCards()
                                }
                            </View>
                        </ScrollView>
                    </View>
                    : <View style={{alignItems: 'center', marginTop: 50}}>
                        <Text>No Records found</Text>
                        </View>
                    }

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
      borderRadius: 50,
      marginVertical: 30
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
        marginTop: 10,
        marginHorizontal: 20
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
    inputStyle: {
        flex: null, 
        borderColor: 'gray', 
        borderWidth: 1, 
        textAlign: 'left',
        height: 43,
        width: 370,
    },
};

const mapStateToProps = (state) => {
    //console.log("***Drawer***MAP STATE TO PROPS: ", state.enableDrawer.drawer, state.props)
    return {
      inputText: state.inputText,
    }
}

const ReportComponent = withNavigation(Report);
export default connect(mapStateToProps, {searchText})(ReportComponent);
