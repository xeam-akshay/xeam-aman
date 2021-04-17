import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

const Spinner = ({loading, style}) => {
    return(
            <View style={[{
                flexDirection:'row', width: '50%', backgroundColor: 'transparent',
                alignItems: 'center', justifyContent: 'center',
                position: 'absolute', height:'10%',
                shadowOffset: {width: 100, height: 100},
                shadowColor: '#330000',
                shadowOpacity: 0,
                shadowRadius: 5,
                elevation: 10,
                left:'25%',
                top:'40%'
            }, style]}>
                {(loading) ?
                    <>
                    <ActivityIndicator  size="large" color='rgb(19,111,232)'/>
                    <Text style={{fontSize:15,}}>Loading..</Text>
                    </>
                : null}
            </View>
    );
};

export {Spinner};