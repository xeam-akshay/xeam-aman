import React, { Component } from 'react'
import { Text, View, } from 'react-native'
import RadioForm,  { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'

const gender =[
    { label:"Male", value:0},
    { label:"FeMale", value:1},
    { label:"Other", value:2}
]



export default class App extends Component{
    render(){
        return(
            <RadioForm
            radio_props={gender}
            initial={1} // you can set as per requirement, initial i set here 0 for male
            // initial={-1} // you can set as per requirement, initial i set here 0 for male
            onPress={()=>this.value}
            buttonSize={40} // size of radiobutton
            buttonOuterSize={60}
            selectedButtonColor={'green'}
            selectedLabelColor={'green'}
            labelStyle={{fontSize:15}}
            />

        )
    }

}
