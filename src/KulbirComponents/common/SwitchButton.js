import React from 'react';
import { View, Text } from 'react-native';
import { Switch } from 'react-native-switch';
import {getMarginTop, fontSizeH3, getMarginLeft} from './width';
  
 
const MySwitch = ({
    value, 
    onValueChange, 
    disabled,
    title, 
}) => {
return (   
    <View style={styles.switchcontainer}>  
    <View style={{alignItems:'flex-start', flex:0.945}}>
    <Text style={styles.textStyle}>{title}</Text>  
    </View> 
    <View style={[{marginTop:getMarginTop(0.5).marginTop}]}>
    <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        activeText={'On'}
        inActiveText={'Off'}
        circleSize={15}
        barHeight={18}
        circleBorderWidth={0}
        backgroundActive={'#D9E9F6'}
        backgroundInactive={'lightgray'}
        circleActiveColor={'#347FE5'}
        circleInActiveColor={'grey'}
        changeValueImmediately={true}
        changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
        innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
        outerCircleStyle={{}} // style for outer animated circle
        renderActiveText={false}
        renderInActiveText={false}
        switchLeftPx={1} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
        switchRightPx={1} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
        switchWidthMultiplier={3} // multipled by the `circleSize` prop to calculate total width of the Switch
        switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
    />
    </View>
    </View>
)
}

const styles = {
    switchcontainer: {      
        flex:1,
        flexDirection:'row',
        marginTop:getMarginTop(1).marginTop,
        marginLeft:getMarginLeft(5).marginLeft,
      },  
      textStyle:{  
        fontSize: fontSizeH3().fontSize,  
        textAlign: 'left',  
        color: '#344953'    
      }  
  };

export {MySwitch};