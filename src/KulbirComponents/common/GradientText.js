import React from 'react';
import {View, Text} from 'react-native';
import { LinearTextGradient } from 'react-native-text-gradient';

const GradientText = ({title, style}) => {
    const {linearStyle} = styles;
    return (
        <View>
            <LinearTextGradient
                style={[linearStyle, style]}
                locations={[0, 1]}
                colors={['#F03030', '#E1721D']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <Text>{title}</Text>
            </LinearTextGradient>
        </View>
    );
};

const styles = {
    linearStyle: { 
        fontWeight: "bold", 
        fontSize: 40 
    },
};

export {GradientText};