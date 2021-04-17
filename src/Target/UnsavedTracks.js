import React, { Component } from 'react';
import {Text, View, AsyncStorage, Alert, ScrollView} from 'react-native';
import { withNavigation } from "react-navigation";
import moment from 'moment';
import 'moment-duration-format';
import {Button, getWidthnHeight, GradientText, PlainHeader, Spinner, LocationDataTable, CommonModal, IOS_StatusBar, Header} from '../KulbirComponents/common';
import {extractBaseURL} from '../api/BaseURL';

class UnsavedTracks extends Component{
    state = {
        data: [],
        presentDate: null,
        uploadDate: null,
        loading: false,
        totalDistance: null,
        baseURL: null,
        errorCode: null,
        apiCode: null,
        commonModal: false
    }

    componentDidMount(){
        const {navigation} = this.props;
        this._unsubscribe = navigation.addListener("didFocus", async() => {
            await this.extractLink();
            this.unsavedTracks();
            console.log("CALLED")
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

    async unsavedTracks(){
        //const data = await AsyncStorage.getItem('SpareData')
        //AsyncStorage.setItem('UnsavedLocations', data)
        const asyncData = await AsyncStorage.getItem('UnsavedLocations')
        //AsyncStorage.setItem('SpareData', asyncData)
        let presentDate = moment().format('YYYY-MM-DD')
        this.setState({presentDate})
        //let presentDate = "2020-11-07"
        //console.log("ASYNC PRESENT DATE: ", moment().format('HH:mm:ss'), asyncData)

        if(asyncData){
            let asyncParsedData = JSON.parse(asyncData)
            console.log("DATA: ", asyncParsedData[0]['date'])
            let uploadDate = asyncParsedData[0]['date']
            this.setState({data: asyncParsedData})
            this.setState({uploadDate})
            this.setState({tracks: true})
            this.calculateDistance();
        }else {
            this.setState({tracks: false}, () => console.log("CALLED TRACKS: ", this.state.tracks))
        }
    }

    calculateDistance(){
        let totalDistance = 0;
        let totalTime = [];
        this.state.data.forEach((individual) => {
            totalDistance += individual.distance;
        })
        totalDistance = Number(totalDistance.toFixed(3))
        this.setState({totalDistance}, () => console.log("DISTANCE SUM: ", Number(this.state.totalDistance.toFixed(3))))
    }    

    //==========Upload Data==========\\
    uploadEmpData = async () => {
        const {baseURL} = this.state;
        console.log("URL: ", `${baseURL}/save-cordinates`)
        const user_token = await AsyncStorage.getItem('user_token');
        const asyncData = await AsyncStorage.getItem('UnsavedLocations');
        const asyncParsedData = JSON.parse(asyncData);
        const asyncDataEmpID = asyncParsedData[0]['empCode'];
        const permissions_fir = JSON.parse(user_token);
        const employeeID = permissions_fir.success.user.id
        const extracted_token = permissions_fir.success.secret_token;
        this.setState({employeeID})
        console.log("EMPLOYEE ID: ", asyncDataEmpID, asyncData, this.state.uploadDate)
        const _this = this;
        this.showLoader(); 
        var data = new FormData();
        data.append("user_id", asyncDataEmpID);
        data.append("coordinates", asyncData);
        data.append("log_dates", this.state.uploadDate);
        
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", async() => {
        if(xhr.readyState !== 4) {
                return;
        } if(xhr.status === 201){
                _this.hideLoader();
                await AsyncStorage.removeItem('UnsavedLocations')
                await _this.unsavedTracks();
                Alert.alert("Coordinates Saved Successfully")
                //console.log('COORDINATES', this.responseText);
                _this.setState({employeeID: null})
                _this.setState({uploadDate: null})
                _this.setState({data: []})
        } else {
                _this.hideLoader();
                _this.enableModal(xhr.status, "100");
        }
        });
        
        xhr.open("POST", `${baseURL}/save-cordinates`);
        //xhr.setRequestHeader("Authorization", `Bearer ${extracted_token}`);
        
        xhr.send(data);
    }

    render(){        
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
        <View style={{flex: 1}}>
            <IOS_StatusBar color={gradient} barStyle="light-content"/>
            <Header navigation={this.props.navigation} title="Unsaved Tracks" width={[getWidthnHeight(50)]} menu="white" images={false} menuState={false}/>
            
            {(this.state.loading) ? 
                <Spinner loading={this.state.loading} style={styles.loadingStyle}/> 
            : null}
            <ScrollView>
            <LocationDataTable 
                title="UNSAVED TRACKS"
                data={this.state.data} 
                tracks={this.state.tracks}
                style={{marginTop: 20}}
                icon={true}
                onPress={() => this.uploadEmpData()}
                navigation={this.props.navigation}
                totalDistance={this.state.totalDistance}
            />
            </ScrollView>
            <CommonModal 
                title="Something went wrong"
                subtitle= {`Error Code: ${errorCode}${apiCode}`}
                visible={this.state.commonModal}
                onDecline={this.onDecline.bind(this)}
                buttonColor={['#0E57CF', '#25A2F9']}
            />
        </View>
    )}
};

const styles = {
    container: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    loadingStyle: {
        shadowOffset: null, 
        shadowColor: 'black', 
        shadowOpacity: null, 
        shadowRadius: 10, 
        elevation: 5,
        backgroundColor: 'white',
        height: 60,
        borderRadius:5,
        marginTop: 0
    },
};

export default withNavigation(UnsavedTracks);