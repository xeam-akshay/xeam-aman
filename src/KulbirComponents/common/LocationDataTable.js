import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import {getWidthnHeight} from './width';
import {GradientText} from './GradientText';
import {Confirm} from './Confirm';

class LocationDataTable extends Component {
    state = {
        numberLayout: undefined,
        dateLayout: undefined,
        distanceLayout: undefined,
        startLayout: undefined,
        stopLayout: undefined,
        totalLayout: undefined,
        tracks: false,
        showModal: false,
        modalData: [],
        modalDistance: null,
        initialRegion: null,
        modalIndex: null,
        modalDate: null,
        startPoint: null,
    }

    displayModal(coords, distance, index, date){
        console.log("WAS EXECUTED")
        this.setState({modalData: coords})
        this.setState({modalDistance: distance})
        this.setState({showModal: !this.state.showModal})
        let initialRegion = {
            latitude: coords[coords.length - 1]['latitude'],
            longitude: coords[coords.length - 1]['longitude'],
            latitudeDelta: 0.008,
            longitudeDelta: 0.008
        }
        let startPoint = {
            latitude: coords[0]['latitude'],
            longitude: coords[0]['longitude'],
            latitudeDelta: 0.008,
            longitudeDelta: 0.008
        }
        this.setState({startPoint}) //First Coordinate or Start Point
        this.setState({initialRegion}) //Last Coordinate or End Point
        this.setState({modalIndex: index + 1})
        this.setState({modalDate: date})
    }

    displayTrackRecord() {
        return this.props.data.map((data, index) => (
            <TouchableOpacity key={index} onPress={() => this.displayModal(data.coords, data.distance, index, data.date)}>
            <View style={[{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderColor: '#E72828', borderLeftWidth: 1, borderRightWidth: 1, borderBottomWidth: 1, borderRadius: 5, backgroundColor: 'white'}, getWidthnHeight(90,5)]}>
                <Text onLayout={this.numberLayout} style={{color: 'black', fontSize: 10, textAlign: 'center' }}>{`${index + 1}.`}</Text>
                <Text onLayout={this.dateLayout} style={{color: '#158EE5', fontSize: 10, textAlign: 'center' }}>{data.date}</Text>
                <Text onLayout={this.distanceLayout} style={{color: '#06B485', fontSize: 10, textAlign: 'center' }}>{data.distance + " " + "KM"}</Text>
                <Text onLayout={this.startLayout} style={{color: '#E72828', fontSize: 10, textAlign: 'center' }}>{`${moment(data.uponStart).format("HH:mm:ss")}`}</Text>
                <Text onLayout={this.stopLayout} style={{color: '#E72828', fontSize: 10, textAlign: 'center' }}>{`${moment(data.uponStop).format("HH:mm:ss")}`}</Text>
                <Text onLayout={this.totalLayout} style={{color: '#EE5E00', fontSize: 10, textAlign: 'center' }}>{`${moment.utc(moment(data.uponStop,"YYYY-MM-DD HH:mm:ss").diff(moment(data.uponStart,"YYYY-MM-DD HH:mm:ss"))).format("HH:mm:ss")}`}</Text>
            </View>
            </TouchableOpacity>
        ))
    }

    numberLayout = (event) => {
        if(this.state.numberLayout){
            return;
        }
        let width = Math.round(event.nativeEvent.layout.width)
        let height = Math.round(event.nativeEvent.layout.height)
        this.setState({numberLayout: {width, height}}, () => console.log("NUMBER DIMENSIONS: ", this.state.numberLayout))
    }

    dateLayout = (event) => {
        if(this.state.dateLayout){
            return;
        }
        let width = Math.round(event.nativeEvent.layout.width)
        let height = Math.round(event.nativeEvent.layout.height)
        this.setState({dateLayout: {width, height}}, () => console.log("DATE DIMENSIONS: ", this.state.dateLayout))
    }

    distanceLayout = (event) => {
        if(this.state.distanceLayout){
            return;
        }
        let width = Math.round(event.nativeEvent.layout.width)
        let height = Math.round(event.nativeEvent.layout.height)
        this.setState({distanceLayout: {width, height}}, () => console.log("DISTANCE DIMENSIONS: ", this.state.distanceLayout))
    }

    startLayout = (event) => {
        if(this.state.startLayout){
            return;
        }
        let width = Math.round(event.nativeEvent.layout.width)
        let height = Math.round(event.nativeEvent.layout.height)
        this.setState({startLayout: {width, height}}, () => console.log("START DIMENSIONS: ", this.state.startLayout))
    }

    stopLayout = (event) => {
        if(this.state.stopLayout){
            return;
        }
        let width = Math.round(event.nativeEvent.layout.width)
        let height = Math.round(event.nativeEvent.layout.height)
        this.setState({stopLayout: {width, height}}, () => console.log("STOP DIMENSIONS: ", this.state.stopLayout))
    }

    totalLayout = (event) => {
        if(this.state.totalLayout){
            return;
        }
        let width = Math.round(event.nativeEvent.layout.width)
        let height = Math.round(event.nativeEvent.layout.height)
        this.setState({totalLayout: {width, height}}, () => console.log("TOTAL DIMENSIONS: ", this.state.totalLayout))
    }


    onDecline(){
        this.setState({showModal: false})
    }

    render(){
        const {tracks, title, style, data, icon, onPress, showModal, totalDistance} = this.props;
        // const timeStamp = moment().valueOf();
        // const semi = timeStamp - 100000
        // const full = timeStamp - semi
        // const now = moment(timeStamp).format("YYYY-MM-DD HH:mm:ss");
        // const then = moment(semi).format("YYYY-MM-DD HH:mm:ss")
        // console.log("TIMESTAMP: ", timeStamp, now, then, "DIFFERENCE: ", 
        // moment.utc(moment(now,"YYYY-MM-DD HH:mm:ss").diff(moment(then,"YYYY-MM-DD HH:mm:ss"))).format("HH:mm:ss"),
        // "ONLY TIME: ", moment(then).format("HH:mm:ss"))
        let numberWidth = null;
        let dateWidth = null;
        let distanceWidth = null;
        let startWidth = null;
        let stopWidth = null;
        let totalWidth = null;
        if(this.state.numberLayout){
            numberWidth = {width: this.state.numberLayout.width}
        }
        if(this.state.dateLayout){
            dateWidth = {width: this.state.dateLayout.width}
        }
        if(this.state.distanceLayout){
            distanceWidth = {width: this.state.distanceLayout.width}
        }
        if(this.state.startLayout){
            startWidth = {width: this.state.startLayout.width}
        }
        if(this.state.stopLayout){
            stopWidth = {width: this.state.stopLayout.width}
        }
        if(this.state.totalLayout){
            totalWidth = {width: this.state.totalLayout.width}
        }
        return (
            <View>
                <View style={[{marginTop: 0, alignItems: 'center'}, style]}>
                    <View style={{alignItems: 'center'}}>
                        <View style={[{borderColor: '#E72828', borderTopWidth: 1, borderBottomWidth: 0, borderLeftWidth: 1, borderRightWidth: 1, alignItems: 'center', justifyContent: 'center', borderTopStartRadius: 5, borderTopEndRadius: 5, backgroundColor: 'white'}, getWidthnHeight(90, 7)]}>
                            <GradientText title={title} style={[{fontSize: 14, borderColor: 'black', borderWidth: 0, textAlign: 'center'}, getWidthnHeight(45)]}/>
                        </View>
                        {(icon) ?
                            <View style={{position: 'absolute', alignSelf: 'flex-end'}}>
                                {(data !== [] && data !== null && data.length !== null && data.length > 0) ?
                                    <TouchableOpacity onPress={onPress}>
                                    <View style={{alignItems: 'center'}}>
                                        <Image source={require('../../Image/sync.png')} style={{width: 20, height: 20, marginRight: 10, marginTop: 5}}/>
                                        <Text style={{fontSize: 6, marginRight: 10}}>Sync Now</Text>
                                    </View>
                                    </TouchableOpacity>
                                :
                                    <View style={{alignItems: 'center'}}>
                                        <Image source={require('../../Image/disable-sync.png')} style={{width: 20, height: 20, marginRight: 10, marginTop: 5}}/>
                                        <Text style={{fontSize: 6, marginRight: 10}}>Disabled</Text>
                                    </View>
                                }
                            </View>
                        : null
                        }
                    </View>
                    <View style={[{borderColor: '#E72828', borderTopWidth: 0, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderBottomStartRadius: 5, borderBottomEndRadius: 5, backgroundColor: 'white'}, getWidthnHeight(90, 2)]}>
                    {(this.state.totalLayout && tracks) ? 
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>   
                        <Text style={[{color: 'black', fontSize: 8, textAlign: 'center'}, numberWidth]}>#</Text>
                        <Text style={[{color: '#158EE5', fontSize: 8, textAlign: 'center', fontWeight: 'bold'}, dateWidth]}>DATE</Text>
                        <Text style={[{color: '#06B485', fontSize: 8, textAlign: 'center', fontWeight: 'bold'}, distanceWidth]}>DISTANCE</Text>
                        <Text style={[{color: '#E72828', fontSize: 8, textAlign: 'center', fontWeight: 'bold'}, startWidth]}>START</Text>
                        <Text style={[{color: '#E72828', fontSize: 8, textAlign: 'center', fontWeight: 'bold'}, stopWidth]}>STOP</Text>
                        <Text style={[{color: '#EE5E00', fontSize: 8, textAlign: 'center', fontWeight: 'bold'}, totalWidth]}>HOURS</Text>
                    </View>
                    : null
                    }
                    </View>
                </View>

                <View style={{marginTop: 0, alignItems: 'center'}}>
                        {
                        (tracks) ?
                        <View style={{borderColor: 'red', borderWidth: 0}}>
                            {this.displayTrackRecord()}
                            {(this.state.totalLayout) ?
                            <View style={[{justifyContent: 'center', borderColor: '#E72828', borderLeftWidth: 1, borderRightWidth: 1, borderBottomWidth: 1, borderRadius: 5, backgroundColor: 'white'}, getWidthnHeight(90, 5)]}>
                                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                    <Text style={{fontSize: 10, fontWeight: 'bold'}}>TOTAL DISTANCE: </Text>
                                    <Text style={{fontSize: 10, fontWeight: 'bold', color: '#06B485'}}>{`${totalDistance} KM`}</Text>
                                </View>
                            {/*<View style={[{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderColor: '#E72828', borderLeftWidth: 1, borderRightWidth: 1, borderBottomWidth: 1, borderRadius: 5, backgroundColor: 'white'}, getWidthnHeight(90, 5)]}>
                                    <View style={[{borderColor: 'black', borderWidth: 0}, numberWidth]}/>
                                    <View style={[{borderColor: 'black', borderWidth: 0}, dateWidth]}>
                                        <Text style={{fontSize: 10, textAlign: 'center', fontWeight: 'bold'}}>TOTAL:</Text>
                                    </View>
                                    <View style={[{borderColor: 'black', borderWidth: 0}, distanceWidth]}>
                                        <Text style={{fontSize: 10, textAlign: 'center', color: '#06B485'}}>{`${totalDistance} KM`}</Text>
                                    </View>
                                    <View style={[{borderColor: 'black', borderWidth: 0}, startWidth]}/>
                                    <View style={[{borderColor: 'black', borderWidth: 0}, stopWidth]}>
                                        <Text style={{fontSize: 10, textAlign: 'center', fontWeight: 'bold'}}></Text>
                                    </View>
                                    <View style={[{borderColor: 'black', borderWidth: 0}, totalWidth]}>
                                        <Text style={{fontSize: 10, textAlign: 'center', color: '#EE5E00'}}></Text>
                                    </View>
                            </View>*/}
                            </View>
                            : null
                            }
                        </View>
                        :   <View style={[{alignItems: 'center', borderColor: '#E72828', borderLeftWidth: 1, borderRightWidth: 1, borderBottomWidth: 1, borderRadius: 5, justifyContent: 'center', backgroundColor: 'white'}, getWidthnHeight(90,5)]}>
                                <Text style={{fontSize: 12, color: '#158EE5'}}>Nothing to Display</Text>
                            </View>
                        }
                </View>
                {(this.state.startPoint) ?
                <Confirm
                    visible={this.state.showModal}
                    distance={this.state.modalDistance}
                    data={this.state.modalData}
                    title="MAP VIEW"
                    startPoint={this.state.startPoint}
                    initialRegion={this.state.initialRegion}
                    onDecline={this.onDecline.bind(this)}
                    index={this.state.modalIndex}
                    date={this.state.modalDate}
                />
                : null
                }
            </View>
        );
    }
}

export {LocationDataTable};