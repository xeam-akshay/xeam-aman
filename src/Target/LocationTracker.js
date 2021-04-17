import React, {Component} from 'react';
import {View, Text, Platform, Alert, ScrollView, AsyncStorage, TouchableOpacity, TouchableWithoutFeedback, PermissionsAndroid, BackHandler, Linking} from 'react-native';
import {connect} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import {Actions, Drawer} from 'react-native-router-flux';
import { withNavigation, NavigationEvents } from "react-navigation";
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import moment from 'moment';
import MapView, {Marker, Polyline} from 'react-native-maps';
import BackgroundGeolocation from '@react-native-community/geolocation';
import {Header, getWidthnHeight, Button, Spinner, CommonModal, GradientText, IOS_StatusBar} from '../KulbirComponents/common'
import Utils from '../Utils';
import { ToastAndroid } from 'react-native';
import {disableDrawer} from '../actions';
import {Permission, PERMISSION_TYPE} from '../AppPermission';

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0922;
let coordinates = [];
let distanceTotal = 0;
const now = moment();
const timeStamp = now.valueOf();
let asyncParsedData = [];
let uploadDate = null;
let grantedCheck = null;
let resultCheck = null;

class LocationTracker extends Component {

    state = {
        initialRegion: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0922,
        },
        ready: false,
        coords: [],
        lat: 0,
        lng: 0,
        update: false,
        recording: false,
        show: false,
        distance: null,
        dimensions: undefined,
        scroll: undefined,
        unsavedTracks: [],
        presentDate: null,
        employeeID: null,
        loading: false,
        showMap: false,
        uponStart: null,
        commonModal: false,
        unsavedTracksModal: false,
        disableButton: false,
        checkModal: false
    }

    async componentDidMount() {
        this.setState({ready: false})
        this.setState({update: false})
        this.setState({recording: false})
        this.setState({show: false})
        this.setState({tracks: false})
        this.setState({showMap: false})
        await this.getUserCurrentLocation();
        const {navigation} = this.props;

        BackHandler.addEventListener('hardwareBackPress', () => {
            ToastAndroid.show('Not Allowed for this screen', ToastAndroid.show)
            return true;
        })

        this._unsubscribe = navigation.addListener("didFocus", async() => {
            let presentDate = await moment(timeStamp).format('YYYY-MM-DD');
            this.setState({presentDate})
            console.log("PRESENT DATE: ", this.state.presentDate, presentDate)
            this.unsavedTracks();
        })
        
        BackgroundGeolocation.configure({
            desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
            stationaryRadius: 10,
            distanceFilter: 10,
            notificationTitle: 'Background tracking',
            notificationText: 'ENABLED',
            debug: true,
            startOnBoot: false,
            stopOnTerminate: true,
            locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
            interval: 1000,
            fastestInterval: 500,
            activitiesInterval: 1000,
            stopOnStillActivity: false,
            startForeground: true,
            // url: 'http://192.168.81.15:3000/location',
            // httpHeaders: {
            //   'X-FOO': 'bar'
            // },
            // customize post properties
            // postTemplate: {
            //   lat: '@latitude',
            //   lon: '@longitude',
            //   foo: 'bar' // you can also add your own properties
            // }
          });

        //BackgroundGeolocation.start(); //triggers start on start event      

        BackgroundGeolocation.on('location', (position) => {
            console.log("NEW POSITION: ", position)
            let lat = Number(position.latitude)
            let lng = Number(position.longitude)
            if(this.state.recording){
                coordinates.push({...position})
                if(coordinates.length > 1){
                    let value = 0;
                    this.setState({show: true})
                    this.calculateDistance()
                }
                this.setState({update: true})
                this.setState({lat})
                this.setState({lng})
                this.setState({coords: coordinates})
                console.log("COORDINATES: ", this.state.coords)
            }else {
                coordinates = [];
                this.setState({coords: []})
            }
            let lastRegion = {
                latitude: lat,
                longitude: lng,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }
            this.setState({initialRegion: lastRegion})
        })

        BackgroundGeolocation.on('background', () => {
            console.log('[INFO] App is in background');
          });
      
        BackgroundGeolocation.on('foreground', async() => {
            console.log('[INFO] App is in foreground');
            let presentDate = await moment(timeStamp).format('YYYY-MM-DD');
            this.setState({presentDate})
            console.log("FOREGROUND PRESENT DATE: ", this.state.presentDate, presentDate)
            this.unsavedTracks();
        });
    }

    UNSAFE_componentWillUnmount(){
        this._unsubscribe().remove();
        BackgroundGeolocation.removeAllListeners();
        BackHandler.removeEventListener('hardwareBackPress', () => {
            ToastAndroid.show('Not Allowed for this screen', ToastAndroid.SHORT)
            return true;
        })
    }

    getUserCurrentLocation(){
        let geoOptions = {
            timeOut: 20000,
            maximumAge: 60 * 60 * 24,
            distanceFilter: 1
        }
        const _this = this;
        async function requestLocationPermission() {
            try {
                // const API_LEVEL = DeviceInfo.getApiLevelSync();
                // let granted = null;
                // if(API_LEVEL < 29){
                //     granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                // }else {
                //     granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION)
                //     // await Permission.checkPermission(PERMISSION_TYPE.location).then((result) => {
                //     //     console.log("VERIFY PERMISSION: ", result)
                //     //     if(result){
                //     //         granted = RESULTS.GRANTED;
                //     //     }
                //     // })
                // }
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('granted');
                    console.log('show location dialog if gps is off');
                    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
                      .then(data => {
                            BackgroundGeolocation.getCurrentLocation((position) => {
                                console.log("LOCATION: ", position)
                                let lat = Number(position.latitude)
                                let lng = Number(position.longitude)
                                console.log("LATITUDE: ", position.latitude, "LONGITUDE: ", position.longitude)
                                let initialRegion = {
                                    latitude: lat,
                                    longitude: lng,
                                    latitudeDelta: LATITUDE_DELTA,
                                    longitudeDelta: LONGITUDE_DELTA,
                                }
                                _this.setState({disableButton: false})
                                _this.setState({initialRegion})
                                _this.setState({showMap: true})
                                //this.setState({ready: true})
                            },
                            (error) => {
                                Alert.alert(error.message)
                            },
                            geoOptions
                            )
                        }).catch(err => {
                            // The user has not accepted to enable the location services or something went wrong during the process
                            // "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
                            // codes :
                            //  - ERR00 : The user has clicked on Cancel button in the popup
                            //  - ERR01 : If the Settings change are unavailable
                            //  - ERR02 : If the popup has failed to open
                            console.log(err)
                            if (err && err.code === 'ERR00') {
                                BackHandler.exitApp()
                            }
                        });
                    } else {
                        //Alert.alert("ERROR 2")
                        //console.log('Permission Denied');
                        // if(API_LEVEL < 29){
                        //     Alert.alert("Permission Denied")
                        //     Actions.pop();
                        // }else {
                        //     Alert.alert("Set App Location Permission: ", "Allow all the time")
                        //     Actions.pop();
                        //     Linking.openSettings();
                        // }
                        Alert.alert("Permission Denied")
                        BackHandler.exitApp();
                    }
                } catch (err) {
                    console.log('error in runtime permission block');
                    //Alert.alert("ERROR 3: ", err)
                    console.warn(err)
                }
            }
        if (Utils.isAndroid()) {
            //Calling the permission function
            requestLocationPermission();
        }
    }

    onButtonStart(){
        this.setState({recording: true})
        this.props.disableDrawer(true)
        coordinates = [];
        this.setState({coords: []})
        BackgroundGeolocation.checkStatus(status => {
            console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
            console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
            console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);
            //BackgroundGeolocation.showLocationSettings()
        
            // you don't need to check status before start (this is just the example)
            if (!status.isRunning) {
                BackgroundGeolocation.start(); //triggers start on start event
            }
        });
        const timeStamp = moment().valueOf();
        const then = moment(timeStamp).format("YYYY-MM-DD HH:mm:ss");
        this.setState({uponStart: then})
    }

    onButtonStop = async() => {
        const user_token = await AsyncStorage.getItem('user_token');
        const permissions_fir= JSON.parse(user_token);
        const employeeID = permissions_fir.success.user.id
        this.setState({employeeID})
        this.setState({recording: false});
        this.props.disableDrawer(false)
        BackgroundGeolocation.stop();
        const timeStamp = moment().valueOf();
        const now = moment(timeStamp).format("YYYY-MM-DD HH:mm:ss");
        const removeCoord = this.state.coords
        console.log("BEFORE SPLICE: ", this.state.coords.length)
        removeCoord.splice(0, 1)
        this.setState({coords: removeCoord})
        console.log("AFTER SPLICE: ", this.state.coords.length)
        const unsavedLocations = {
            date: this.state.presentDate,
            coords: this.state.coords,
            distance: this.state.distance,
            uponStart: this.state.uponStart,
            uponStop: now,
            empCode: this.state.employeeID
        }
        const checkForData = []
        const asyncData = await AsyncStorage.getItem('UnsavedLocations')
        if(asyncData){
            const data = JSON.parse(asyncData)
            //console.log("DATA: ", data[0])
            const length = data.length
            for(let i = 0; i < length; i++){
                checkForData.push(data[i])    
            }
            checkForData.push({...unsavedLocations})
            console.log("CHECK DATA: ", checkForData)
            //AsyncStorage.removeItem('UnsavedLocations')
        }else {
            //checkForData.push({...unsavedLocations})
            checkForData.push({...unsavedLocations})
            console.log("SINGLE CHECK DATA: ", checkForData)
        }
        if(this.state.coords.length < 2){
            //Do Nothing
        } else if(this.state.coords.length > 1){
            AsyncStorage.setItem('UnsavedLocations', JSON.stringify(checkForData))
        }
        distanceTotal = 0;
        coordinates = [];
        this.setState({distance: null});
        this.setState({coords: []});
        this.setState({show: false})
        //this.getUserCurrentLocation();
        this.setState({lat: 0});
        this.setState({lng: 0});
        this.setState({show: false});
        
    }

    async calculateDistance(){
        const R = 6371; //Radius of earth in KM
        //console.log("***COORDINATES*** ", coordinates)
        let length = coordinates.length
        let distanceSum = 0;
        for(let i = 1; i < length; i++){
            let dLat = this.deg2rad(coordinates[i]['latitude'] - coordinates[i - 1]['latitude'])
            let dLng = this.deg2rad(coordinates[i]['longitude'] - coordinates[i - 1]['longitude'])
            let a = Math.sin(dLat/2) * Math.sin(dLat/2) +  
                    Math.cos(this.deg2rad(coordinates[i - 1]['latitude'])) * Math.cos(this.deg2rad(coordinates[i]['latitude'])) *
                    Math.sin(dLng/2) * Math.sin(dLng/2);
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            let distance = R * c; //Distance in KM
            distanceSum += distance
        }
        let value = await this.removeFirstCoord(distanceSum, R);
        distanceSum = distanceSum - value;
        let num = Number(distanceSum.toFixed(3))
        this.setState({distance: num})
    }

    removeFirstCoord(distanceSum, R){
        let dLat = this.deg2rad(coordinates[1]['latitude'] - coordinates[0]['latitude'])
        let dLng = this.deg2rad(coordinates[1]['longitude'] - coordinates[0]['longitude'])
        let a = Math.sin(dLat/2) * Math.sin(dLat/2) +  
                Math.cos(this.deg2rad(coordinates[0]['latitude'])) * Math.cos(this.deg2rad(coordinates[1]['latitude'])) *
                Math.sin(dLng/2) * Math.sin(dLng/2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let distance = R * c; //Distance in KM
        return distance;
    }

    deg2rad(deg){
        return deg * (Math.PI/180)
    }

    onLayout = (event) => {
        if(this.state.dimensions){
            return;
          }
          let width = Math.round(event.nativeEvent.layout.width)
          let height = Math.round(event.nativeEvent.layout.height)
          let data = event.nativeEvent.layout
          this.setState({dimensions: {width, height}})
    }

    scrollLayout = (event) => {
        if(this.state.scroll){
            return;
          }
          let width = Math.round(event.nativeEvent.layout.width)
          let height = Math.round(event.nativeEvent.layout.height)
          let data = event.nativeEvent.layout
          this.setState({scroll: {width, height}})
    }

    async unsavedTracks(){
        //const data = await AsyncStorage.getItem('SpareData')
        //AsyncStorage.setItem('UnsavedLocations', data)
        const asyncData = await AsyncStorage.getItem('UnsavedLocations')
        //AsyncStorage.setItem('SpareData', asyncData)
        let presentDate = await moment(timeStamp).format('YYYY-MM-DD');
        this.setState({presentDate})
        
        //console.log("ASYNC PRESENT DATE: ", moment().format('HH:mm:ss'), asyncData)

        if(asyncData){
            asyncParsedData = JSON.parse(asyncData)
            console.log("DATA: ", asyncParsedData[0]['date'])
            //console.log("ASYNC DATA: ", asyncData)
            uploadDate = asyncParsedData[0]['date']
            if(this.state.presentDate > uploadDate){
                this.setState({tracks: true})
                this.setState({commonModal: true})
            }
        }else {
            this.setState({tracks: false})
        }
    }

    displayTrackRecord() {
        return asyncParsedData.map((coords, index) => (
            <View key={index} style={[{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', borderColor: '#E72828', borderLeftWidth: 1, borderRightWidth: 1, borderBottomWidth: 1, borderRadius: 5}, getWidthnHeight(90,5)]}>
                <Text style={{color: 'black', fontSize: 10 }}>{`${index + 1}.`}</Text>
                <Text style={{color: '#158EE5', fontSize: 10 }}>{coords.date}</Text>
                <Text style={{color: '#06B485', fontSize: 10 }}>{coords.distance + " " + "KM"}</Text>
                <Text style={{color: '#E72828', fontSize: 10 }}>{coords.uponStart}</Text>
                <Text style={{color: '#E72828', fontSize: 10 }}>{coords.uponStop}</Text>
            </View>
        ))
    }
    
    onDecline(){
        this.setState({commonModal: false})
        this.setState({unsavedTracksModal: false})
    }

    permissonCheck(){
        this.setState({checkModal: false})
        //this.setState({unsavedTracksModal: false})
    }

    render() {
        //console.log("MOMENT: ", moment().format('hh:mm:ss A'))
        //AsyncStorage.removeItem('UnsavedLocations')
        let marginTop = null;
        let scrollHeight = null;
        let distanceBox = getWidthnHeight(undefined, 2);
        if(this.state.dimensions){
            marginTop = {marginTop: Math.round(this.state.dimensions.height - (distanceBox.height+1)/2)}
        }
        if(this.state.scroll){
            scrollHeight = {height: Math.round(this.state.scroll.height)}
            console.log("SCROLL HEIGHT: ", scrollHeight)
        }
        
        // let user = this.props.employer;
        // let gradient = null;
        // let borderColor = null;
        // let searchButton = null;
        // if(user === "XEAMHO"){
        // searchButton = {backgroundColor: 'rgb(19,111,232)'}
        // gradient = ['#0E57CF', '#25A2F9']
        // borderColor = {borderColor: 'rgb(19,111,232)'}
        // }else if(user === "Aarti Drugs Ltd"){
        // searchButton = {backgroundColor: '#F06130'}
        // gradient = ['#F03030', '#E1721D']
        // borderColor = {borderColor: '#F06130'}
        // }
        console.log("REDUCER PROP: ", this.props.disableDrawer);
        return (
            <View style={{flex: 1}}>
                <Header 
                    navigation={this.props.navigation} 
                    title="Location Tracker" 
                    width={[getWidthnHeight(55)]} 
                    menu="white" 
                    images={false} 
                    //hideIcon={(this.state.recording) ? true : false}
                />

                {(this.state.loading) ? 
                    <Spinner loading={this.state.loading} style={styles.loadingStyle}/> 
                : null}
                
                <ScrollView style={{borderColor: 'red', borderWidth: 0}}> 
                <View style={[styles.map, getWidthnHeight(100, 50)]}>
                {(this.state.showMap) ?         
                    <View style={{borderColor: '#E72828', borderWidth: 1, alignItems: 'center'}}>
                        <MapView  
                            style={[{top: 0, bottom: 0, left: 0, right: 0},getWidthnHeight(85, 45)]}
                            initialRegion={this.state.initialRegion}
                            showsUserLocation={true}
                            onLayout={this.onLayout}
                            >
                            {(this.state.recording) ?
                            <Polyline strokeWidth={4} strokeColor={'#116DEB'} coordinates={this.state.coords.map((coordinate) => {
                                console.log("POLYLINE", coordinate)
                                return coordinate
                            })}/>
                            : null
                            }
                        </MapView>
                        {<View style={[{position: 'absolute', alignSelf: 'center', justifyContent: 'center', backgroundColor: '#EFE7DB', borderRadius: 5, borderColor: '#E72828', borderWidth: 1}, marginTop, getWidthnHeight(40, 2)]}>
                            {(this.state.show) ?
                                <Text style={{fontSize: 8, alignSelf: 'center'}}>{`DISTANCE: ${this.state.distance} KM`}</Text>
                            :   <Text style={{fontSize: 8, alignSelf: 'center'}}>DISTANCE: 0.000 KM</Text>
                            }
                        </View>}
                    </View>
                : 
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{textAlign: 'center'}}>Please Wait...</Text>
                </View>
                }
                </View>

                <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={() => Actions.UnsavedTracks({employer: this.props.employer})}>
                    <View style={[{alignItems: 'center', justifyContent: 'center', borderBottomEndRadius: 150, backgroundColor: 'rgba(240,97,48,0.95)'}, getWidthnHeight(40, 7)]}>
                        <Text style={{fontSize: 9, color: 'white'}}>Click to View</Text>
                        <Text style={[{fontSize: 11, color: 'white', fontWeight: 'bold'}, getWidthnHeight(30)]}>UNSAVED TRACKS</Text>
                    </View>
                    </TouchableOpacity>
                    <View style={[{alignItems: 'center', justifyContent: 'center', borderBottomStartRadius: 150, backgroundColor:'rgba(240,97,48,0.95)'}, getWidthnHeight(40, 7)]}>
                        {(this.state.update) ?
                            <View style={{alignItems: 'center'}}>
                                <Text style={[{fontSize: 9, color: 'white', fontWeight: 'bold'}, getWidthnHeight(30)]}>{`LATITUDE: ${this.state.lat.toFixed(3)}`}</Text>
                                <Text style={[{fontSize: 9, color: 'white', fontWeight: 'bold'}, getWidthnHeight(30)]}>{`LONGITUDE: ${this.state.lng.toFixed(3)}`}</Text>
                            </View>
                        :   <View style={{alignItems: 'center'}}>
                                <Text style={[{fontSize: 9, color: 'white', fontWeight: 'bold'}, getWidthnHeight(30)]}>LATITUDE: 0.000</Text>
                                <Text style={[{fontSize: 9, color: 'white', fontWeight: 'bold'}, getWidthnHeight(30)]}>LONGITUDE: 0.000</Text>
                            </View>
                        }
                    </View>
                </View>

                    {(!this.state.tracks) ?
                    <View style={{alignItems: 'center'}}>
                    {(!this.state.recording) ?
                        <Button onPress={() => this.onButtonStart()} style={[getWidthnHeight(90)]}>
                            START RECORDING
                        </Button>
                    : 
                        <Button onPress={() => this.onButtonStop()} style={[getWidthnHeight(90)]}>
                            STOP
                        </Button>
                    }
                    </View>
                    :
                    <View style={{alignItems: 'center'}}>
                        <TouchableWithoutFeedback onPress={() => this.unsavedTracks()}>
                        <View style={[{alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginTop: 40, backgroundColor: '#ABA9A9', height: 40}, getWidthnHeight(90)]}>
                            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
                                    START RECORDING
                            </Text>
                        </View>
                        </TouchableWithoutFeedback>
                    </View>
                    }

                <CommonModal 
                    title="Please be sure to upload previous UNSAVED TRACKS. Before you continue."
                    visible={this.state.commonModal}
                    onDecline={this.onDecline.bind(this)}
                />
                <CommonModal 
                    title={`${grantedCheck}, ${resultCheck}`}
                    visible={this.state.checkModal}
                    onDecline={this.permissonCheck.bind(this)}
                />

                </ScrollView>
            </View>
        );
    }
}

const styles = {
    map: {
        marginTop: 10,
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
        backgroundColor: 'white',
        height: 60,
        borderRadius:5,
        marginTop: 150
    },
};

const LocationTrackerComponent = connect(null, {disableDrawer})(LocationTracker);
export default withNavigation(LocationTrackerComponent);

