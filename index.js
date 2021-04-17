/**
 * @format
 */
import React, { Component } from "react";
import {AppRegistry} from 'react-native';
import App from './App';
import App2 from './src/app2';
import {name as appName} from './app.json';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'


AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App2));
