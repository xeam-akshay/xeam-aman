import React from 'react';
import {View} from 'react-native';
import {getWidthnHeight} from './width';
import LinearGradient from 'react-native-linear-gradient';

const MenuIcon = ({boundary, color, designby = ''}) => {
    let height = {height: Math.floor(boundary.height/18)}
    let heighttwoline = {height: Math.floor(boundary.height/20)}

    //console.log("MENUICON: ", height)
    let menuColor = null;
    if(color === "white"){
        menuColor = ['#FFFFFF', '#FFFFFF']
    }else {
        menuColor = ['#F71A1A', '#E1721D']
    }
    return (
        <View>
        {designby == ''?
        <View style={{flexDirection: 'column', alignContent: 'flex-start'}}>
            <View style={{marginVertical: 3}}>
                <LinearGradient 
                    start={{x: -0.5, y: 1.5}} 
                    end={{x:0.8, y: 0.0}} 
                    colors={menuColor} 
                    style={[styles.linearGradient, getWidthnHeight(10), height]}/>
            </View>
            <View style={{marginVertical: 3}}>
                <LinearGradient 
                    start={{x: -0.5, y: 1.5}} 
                    end={{x:0.8, y: 0.0}} 
                    colors={menuColor} 
                    style={[styles.linearGradient, getWidthnHeight(10), height]}/>
            </View>
            <View style={{marginVertical: 3}}>
                <LinearGradient 
                    start={{x: -0.5, y: 1.5}} 
                    end={{x:0.8, y: 0.0}} 
                    colors={menuColor} 
                    style={[styles.linearGradient, getWidthnHeight(6), height]}/>
            </View>
        </View>:
        <View style={{flexDirection: 'column', alignContent: 'flex-start'}}>
        <View style={{marginVertical: 3}}>
            <LinearGradient 
                start={{x: -0.5, y: 1.5}} 
                end={{x:0.8, y: 0.0}} 
                colors={menuColor} 
                style={[styles.linearGradient, getWidthnHeight(9), heighttwoline]}/>
        </View>
        <View style={{marginVertical: 3}}>
            <LinearGradient 
                start={{x: -0.5, y: 1.5}} 
                end={{x:0.8, y: 0.0}} 
                colors={menuColor} 
                style={[styles.linearGradient, getWidthnHeight(5.5), heighttwoline]}/>
        </View>
        </View>
        }
        </View>
    );
}

const styles = {
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 3,
        width: 100,
        borderRadius: 50
      },
}

export {MenuIcon};
