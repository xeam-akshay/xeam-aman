import React, { Component } from 'react';
import {View, Text, Image} from 'react-native';
import {GradientText} from './GradientText';
import {getWidthnHeight} from './width';

class Card extends Component{
    state = {
        dimensions: undefined,
    }

onLayout = (event) => {
    if(this.state.dimensions){
        return;
      }
      let width = Math.round(event.nativeEvent.layout.width)
      let height = Math.round(event.nativeEvent.layout.height)
      this.setState({dimensions: {width, height}})
}

render() {
    const {name, id, target, achieved} = this.props;

    const {container, card} = styles;
    
    let remaining = target - achieved
    
    //console.log('Remaining: ', remaining)

    let additional = remaining;

    let data = null;

    const value = getWidthnHeight(80);

    const calculateMargin = {marginLeft: value.width * 0.88};

    const {dimensions} = this.state;

    let squareIconBox = null;

    let iconSize = null;

    if(dimensions){
        squareIconBox = {width: dimensions.height, height: dimensions.height - 1}
        iconSize = {width: dimensions.height - 8, height: dimensions.height - 8}
        //console.log("SQUARE BOX: ", squareIconBox)
    }

    if(remaining > 0){
        remaining = additional
        data = <Text style={{color: 'red', fontWeight: 'bold', fontSize: 12}}>-{additional}</Text>
    } else if(remaining < 0){
        remaining = 0;
        data = <Text style={{color: 'green', fontWeight: 'bold', fontSize: 12}}>+{additional * (-1)}</Text>
    }

    return (
        <View style={{backgroundColor: '#EEEDED', flex: 1}}>
            <View style={[container, getWidthnHeight(100)]}>
                <Image source={require('../../Image/user.png')}/>

                <View style={[card, getWidthnHeight(80, 19)]}>
                    <View style={{alignItems: 'flex-start'}}>
                        <Text style={{fontSize: 14, fontWeight: 'bold'}}>{name}</Text>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={{color: '#5C5B5A', fontSize: 12}}>Employee Code : </Text>
                            <GradientText title={`${id}`} style={{fontSize: 12}}/>
                        </View>

                        <View>
                            {data}
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <View style={{marginTop: 10}}>
                            <Text style={styles.textHeader}>TOTAL TARGET</Text>
                            <View style={[styles.blueContent, getWidthnHeight(25, 4.7)]} onLayout={this.onLayout}>
                                <View style={[styles.blueIconBox, squareIconBox]}>
                                    <Image source={require('../../Image/aim32.png')} style={[iconSize]}/>
                                </View>
                                <Text style={styles.values}>{target}</Text>
                            </View>
                        </View>

                        <View style={{marginTop: 10}}>
                            <Text style={styles.textHeader}>ACHIEVED</Text>
                            <View style={[styles.greenContent, getWidthnHeight(25, 4.7)]}>
                                <View style={[styles.greenIconBox, squareIconBox]}>
                                    <Image source={require('../../Image/whiteTarget32.png')} style={[iconSize]}/>
                                </View>
                                <Text style={styles.values}>{achieved}</Text>
                            </View>
                        </View>

                        <View style={{marginTop: 10}}>
                            <Text style={styles.textHeader}>REMAINING</Text>
                            <View style={[styles.redContent, getWidthnHeight(25, 4.7)]}>
                                <View style={[styles.redIconBox, squareIconBox]}>
                                    <Image source={require('../../Image/WhiteHourglass32.png')} style={[iconSize]}/>
                                </View>
                                <Text style={styles.values}>{remaining}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
        );
    }
};

const styles = {
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 20,
        borderColor: 'black',
        borderWidth: 0,
        backgroundColor: '#EEEDED', 
        flex: 1
    },
    card: { 
        backgroundColor: 'white', 
        shadowColor: 'black', 
        elevation: 5,
        borderRadius: 5,
        padding: 5,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    blueContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#158EE5', 
        borderWidth: 1,
        marginVertical: 5
    },
    greenContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#06B485', 
        borderWidth: 1, 
        height: 30 , 
        width: 105, 
        marginVertical: 5
    },
    redContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#E72828', 
        borderWidth: 1, 
        height: 30 , 
        width: 105, 
        marginVertical: 5
    },
    blueIconBox: {
        width: 30, 
        height:29, 
        backgroundColor: '#158EE5', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    greenIconBox: {
        width: 30, 
        height:29, 
        backgroundColor: '#06B485', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    redIconBox: {
        width: 30, 
        height:29, 
        backgroundColor: '#E72828', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    textHeader: {
        fontSize: 9, 
        fontWeight: 'bold', 
        color: '#5C5B5A'
    },
    values: {
        marginRight: 5, 
        fontSize: 14
    },
};

export {Card};
