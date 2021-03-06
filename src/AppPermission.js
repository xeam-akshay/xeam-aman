import React, {Component} from 'react';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {View, Text, Platform, Alert} from 'react-native';

const PLATFORM_BACKGROUND_LOCATION_PERMISSIONS = {
    ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
    android: PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION
}

const REQUEST_PERMISSION_TYPE = {
    location: PLATFORM_BACKGROUND_LOCATION_PERMISSIONS
}

const PERMISSION_TYPE = {
    location: 'location'
}

class AppPermission {
    checkPermission = async (type): Promise<boolean> => {
        console.log("@@@@AppPermission checkPermission type: ", type)
        const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS]
        console.log("@@@@AppPermission checkPermission permissions: ", permissions)
        if(!permissions){
            return true;
        }
        try{
            const result = await check(permissions)
            console.log("@@@AppPermission checkPermission result: ", result)
            if(result === RESULTS.GRANTED) return true
            return this.requestPermission(permissions)// request permission
        }catch(error){
            console.log("@@@AppPermission checkPermission error: ", error)
            return false
        }
    }

    requestPermission = async (permissions): Promise<boolean> => {
        console.log("@@@AppPermission requestPermission permissions: ", permissions)
        try{
            const result = await request(permissions)
            console.log("@@@AppPermission requestPermission result: ", result)
            return result === RESULTS.GRANTED
        }catch(error){
            console.log("@@@AppPermission requestPermission error: ", error)
            return false
        }
    }
}

const Permission = new AppPermission();
export {Permission, PERMISSION_TYPE}