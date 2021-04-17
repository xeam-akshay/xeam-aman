import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';

export const MenuIcon = ({navigation}) => {
    return (
    <View>
    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Image
            source={require('../../Image/menu.png')}
            style={{ width: 35, height: 35, marginLeft: 10, top:0 }}
        />
    </TouchableOpacity>
    </View>
    );
}

export const Title = ({name}) => {
    return <Text style={{color:'white',fontSize:20, fontWeight:'bold'}}>{name}</Text>
}