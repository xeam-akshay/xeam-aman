import React from 'react';
import { View, Keyboard,  TouchableWithoutFeedback } from 'react-native';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback 
    onPress={() => Keyboard.dismiss()}> 
    <View>
        {children}
    </View>
    </TouchableWithoutFeedback>
    );

export {DismissKeyboard};
