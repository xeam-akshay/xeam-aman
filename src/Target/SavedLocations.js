import React, {Component} from 'react';
import {View, Text, Platform, Dimensions, Alert, AsyncStorage, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import { withNavigation } from "react-navigation";
import MapView, {Marker, Polyline} from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
import BackgroundGeolocation from '@react-native-community/geolocation';
import {Button, Spinner, DateSelector, SearchIcon, GradientText, Header, getWidthnHeight, Confirm, LocationDataTable, CommonModal, IOS_StatusBar} from '../KulbirComponents/common'
import {extractBaseURL} from '../api/BaseURL';

const LATITUDE_DELTA = 0.1;
const LONGITUDE_DELTA = 0.1;
let coordinates = [];
let distanceTotal = 0;
let calculate = Dimensions.get('window')

class SavedLocations extends Component {
    state = {
        dimensions: null,
        show: false,
        loading: false,
        DemoLocation: [],
        distance: 0,
        ready: false,
        recording: false,
        show: false,
        employeeID: null,
        date: null,
        month: null,
        error: false,
        tracks: false,
        totalDistance: null,
        baseURL: null,
        errorCode: null,
        apiCode: null,
        commonModal: false
    }

    componentDidMount(){
        const {navigation} = this.props;
        this._unsubscribe = navigation.addListener("didFocus", async() => {
            if(this.state.date){            
                this.setState({tracks: false})
                this.setState({DemoLocation: []})
                this.getLocation();
            }
            await this.extractLink();
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

    getLocation = async () => {
        const {baseURL} = this.state;
        console.log("URL: ", `${this.state.baseURL}/get-employee-cordinates`)
        const user_token = await AsyncStorage.getItem('user_token');
        const permissions_fir= JSON.parse(user_token);
        const token = permissions_fir.success.secret_token;
        const employeeID = permissions_fir.success.user.id
        this.setState({employeeID})
        console.log('EMP ID: ', this.state.employeeID)
        const _this = this;
        this.showLoader(); 
        var data = new FormData();
        data.append("user_id", this.state.employeeID);
        data.append("log_dates", this.state.date);
        
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", function() {
        if(xhr.readyState !== 4) {
                return;
        }if(xhr.status === 201){
            _this.hideLoader();
            const dataList = JSON.parse(xhr.responseText)
            if(dataList.message !== [] && dataList.message !== null && dataList.message.length !== null && dataList.message.length > 0){
                let DemoLocation = [];
                const length = dataList.message.length
                for(let i = 0; i < length; i++){
                    const getArray = JSON.parse(dataList.message[i]['coordinates'])
                    DemoLocation.push(...getArray)
                }
                _this.setState({DemoLocation})
                _this.setState({tracks: true})
                _this.totalDistance();
                //AsyncStorage.setItem('UnsavedLocations', dataList.message[0]['coordinates'])
            }else{
                console.log("***EMPTY ARRAY***")
                Alert.alert("NO RECORDS FOUND")
                _this.setState({tracks: false})
            }
            
            console.log("LOCATIONS: ", _this.state.DemoLocation.length)
            
            //_this.setState({DemoLocation: dataList.message.})
        }else {
            _this.hideLoader();
            console.log('AT Error: ', xhr.responseText, xhr.status);
            _this.enableModal(xhr.status, "101");
        }
        });
        
        xhr.open("POST", `${baseURL}/get-employee-cordinates`);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        
        xhr.send(data);
    }

    totalDistance(){
        let totalDistance = 0;
        let totalTime = [];
        this.state.DemoLocation.forEach((individual) => {
            totalDistance += individual.distance;
        })
        totalDistance = Number(totalDistance.toFixed(3))
        this.setState({totalDistance}, () => console.log("DISTANCE SUM: ", Number(this.state.totalDistance.toFixed(3))))
    }

    calculateDistance(){
        const R = 6371; //Radius of earth in 
        const {DemoLocation} = this.state
        let LocationData = DemoLocation
        let length = DemoLocation.length
        console.log("***LENGTH*** ", length)
        //console.log("***DEMO LOCATION*** ", DemoLocation[length - 1])
        let initialRegion = {
            latitude: DemoLocation[length - 1]['latitude'],
            longitude: DemoLocation[length - 1]['longitude'],
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }
        this.setState({initialRegion})
        this.setState({ready: true})
        this.setState({recording: true})
        this.setState({show: true})
        let distanceSum = 0
        for(let i = 1; i < length; i++){
            let dLat = this.deg2rad(LocationData[i]['latitude'] - LocationData[i - 1]['latitude'])
            let dLng = this.deg2rad(LocationData[i]['longitude'] - LocationData[i - 1]['longitude'])
            let a = Math.sin(dLat/2) * Math.sin(dLat/2) +  
                     Math.cos(this.deg2rad(LocationData[i - 1]['latitude'])) * Math.cos(this.deg2rad(LocationData[i]['latitude'])) *
                     Math.sin(dLng/2) * Math.sin(dLng/2);
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            let distance = R * c; //Distance in KM
            distanceTotal += distance
        }
        distanceSum = Number(distanceTotal.toFixed(3))
        this.setState({distance: distanceSum})
    }

    deg2rad(deg){
        return deg * (Math.PI/180)
    }

    onButtonPress(){
        if(this.state.date){
            this.setState({error: false})
            this.getLocation();
        }else {
            this.setState({error: true})
        }
    }

    renderError(){
        return (
            <View style={{alignItems: 'center', marginTop: 15, marginBottom: -15}}>
              <Text style={{fontSize: 10, color: 'red'}}>***Select Date***</Text>
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
            <View style={{backgroundColor: 'white', flex: 1}}>
                <View style={{borderColor: 'green', borderWidth: 0}}>
                <IOS_StatusBar color={gradient} barStyle="light-content"/>
                <Header navigation={this.props.navigation} title="Saved Location" width={[getWidthnHeight(50)]} menu="white" images={false}/>
                
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15}}>
                        <View style={[{marginHorizontal: 8, marginTop: 25}, getWidthnHeight(75)]}>
                            <DateSelector 
                                style={[getWidthnHeight(75)]}
                                date={this.state.date}
                                androidMode='spinner'
                                mode='date'
                                placeholder='Select Date'
                                format='YYYY-MM-DD'
                                minDate='2019-08-01'
                                maxDate='2025-08-01'
                                onDateChange={(date) => {
                                    console.log('Selected: ', date)
                                    this.setState({date})
                                    this.setState({tracks: false})
                                    this.setState({DemoLocation: []})
                                    this.setState({modalData: []})
                                }} 
                            />
                            <View style={styles.forDate}>
                                <GradientText title='For Date' style={{fontSize: 9, marginHorizontal: 4, fontWeight: null}}/>
                            </View>
                        </View>

                        <TouchableOpacity onPress={() => this.onButtonPress()}>
                            <SearchIcon style={{marginTop: 25}}/>
                        </TouchableOpacity>

                </View>

                {(this.state.error) ? this.renderError() : null}

                <View style={{marginTop: 30, alignItems: 'center'}}>
                    <LinearGradient 
                        start={{x: -0.5, y: 1.5}} 
                        end={{x:0.8, y: 0.0}} 
                        colors={['#F71A1A', '#E1721D']} 
                        style={[styles.linearGradient, getWidthnHeight(28)]}/>
                </View>
                </View>

                <View style={{backgroundColor: '#EAE6E6', flex: 1, borderTopStartRadius: 10, borderTopEndRadius: 10}}>
                <View style={[getWidthnHeight(100, 2)]}/>
                    <ScrollView>
                        <LocationDataTable 
                            title="SAVED TRACKS"
                            data={this.state.DemoLocation} 
                            tracks={this.state.tracks}
                            style={{marginTop: 15}}
                            totalDistance={this.state.totalDistance}
                        />
                    </ScrollView>
                </View>

                {(this.state.loading) ? 
                    <Spinner loading={this.state.loading} style={styles.loadingStyle}/> 
                : null}
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
    map: {
        marginTop: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 0
    },
    loadingStyle: {
        shadowOffset: null, 
        shadowColor: 'black', 
        shadowOpacity: null, 
        shadowRadius: 10, 
        elevation: 5,
        backgroundColor: '#F0F0F0',
        height: 60,
        borderRadius:5,
        marginTop: 50, 
    },
    forDate: {
        position: 'absolute',
        backgroundColor: 'white',
        alignItems: 'flex-start',  
        borderColor: 'black', 
        borderWidth: 0, 
        marginTop: -7, 
        width: 45, 
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
};

export default withNavigation(SavedLocations);

