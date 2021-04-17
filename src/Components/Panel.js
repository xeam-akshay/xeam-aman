import React, {Component,useRef} from 'react';
import {StyleSheet,Text,View,Image,TouchableHighlight,Animated,TouchableOpacity} from 'react-native'; //Step 1
const icons = {     //Step 2
    'up'    : require('../Image/Arrowhead-01-128.png'),
    'down'  : require('../Image/Arrowhead-Down-01-128.png')
};
export default class Panel extends React.Component{
    constructor(props){
        super(props);
        this.state = {       //Step 3
            title       : props.title,
            expanded    : true,
            animation   : new Animated.Value(),
            maxHeight:'',
            minHeight:''
        };
    }

    toggle(){
        //Step 1
    let initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
    finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

this.setState({
    expanded : !this.state.expanded  //Step 2
});

this.state.animation.setValue(initialValue);  //Step 3
Animated.spring(     //Step 4
    this.state.animation,
    {
        toValue: finalValue
    }
).start();  //Step 5
    }
    _setMaxHeight(event){
        this.setState({
            maxHeight   : event.nativeEvent.layout.height
        });
    }
    
    _setMinHeight(event){
        this.setState({
            minHeight   : event.nativeEvent.layout.height
        });
    }

    render(){
        let icon = icons['down'];

        if(this.state.expanded){
            icon = icons['up'];   //Step 4
        }

        //Step 5
        return ( 
            <Animated.View 
            style={{backgroundColor: '#fff',
            margin:10,
            overflow:'hidden',
            
            }}>
                 <View style={styles.container}>
                <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
                    <Text style={styles.title}>{this.state.title}</Text>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={this.toggle.bind(this)}
                        underlayColor="#f1f1f1">
                        <Image
                            style={styles.buttonImage}
                            source={icon}
                        ></Image>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
                    {this.props.children}
                </View>
                </View>
            
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container   : {
        backgroundColor: '#fff',
        margin:10,
        overflow:'hidden',
       
    },
    titleContainer : {
        flexDirection: 'row'
    },
    title       : {
        flex    : 1,
        padding : 10,
        color   :'#2a2f43',
        fontWeight:'bold'
    },
    button      : {

    },
    buttonImage : {
        width   : 30,
        height  : 25
    },
    body        : {
        padding     : 10,
        paddingTop  : 0
    }
});