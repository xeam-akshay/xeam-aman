import React, { useState } from "react";
import { Alert, Text, View, TouchableOpacity, StyleSheet,Picker } from 'react-native'
import { CustomPicker } from 'react-native-custom-picker'
import Base_url from '../src/Base_url';
export default class CustomExample extends React.Component {

  constructor(props){
  super(props)
  this.state={
                  loading: false,
                  token:'',
                  final_data:'',
                  final_data_sec:'',
                  language:'',
                  language_sec:'',
                  tvf:[],
                  tvl:[],
                  data:[],
                  from:'',
                  to:'',
                  counter_data:'',
                  pic_name_data:'',
                  emp_code:'',
                  user: ''
              }
         }
  componentDidMount(){
    this.show_thrd();

  }

  show_thrd=()=>{
    const b="show_thrd";
    console.log(b)

    const context=this;
    const _this = this;
    // this.showLoader();
    // var user_token= await AsyncStorage.getItem('user_token');
    // var permissions_fir= JSON.parse(user_token);
    // var permissions_sec=permissions_fir.success.secret_token;
    var data = new FormData();
    // const {language}=this.state;
  data.append("department_ids", "2");

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (xhr.readyState !== 4) {
                        return;
   }
   if(xhr.status===200){
       // _this.hideLoader();
     // console.log(xhr.responseText)
     var json_obj = JSON.parse(xhr.responseText);
     var c = json_obj.success.employees;
     context.setState({tvf:c});
   }
   else{
     return;
     console.log("inside error")
      Alert.alert("Invaild data");
  // _this.hideLoader();
   }

  });
  xhr.open("POST", "http://erp.xeamventures.com/api/v1/departments-wise-employees");
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImEyMGU1MmUyN2Q5ZjA2ZTg1YzVhODJjMTVmOGVkZTRmMzM1NTc3NWQ0MWM4MWQzOGQ3NGZjNjJmMzQ5YTNiNTZhYWQyYmFjODQ0YTBmYzVmIn0.eyJhdWQiOiIxIiwianRpIjoiYTIwZTUyZTI3ZDlmMDZlODVjNWE4MmMxNWY4ZWRlNGYzMzU1Nzc1ZDQxYzgxZDM4ZDc0ZmM2MmYzNDlhM2I1NmFhZDJiYWM4NDRhMGZjNWYiLCJpYXQiOjE1ODUyMjA0MzYsIm5iZiI6MTU4NTIyMDQzNiwiZXhwIjoxNjE2NzU2NDM2LCJzdWIiOiIxMDYiLCJzY29wZXMiOltdfQ.sGUbQkxfOZ6objamC0V4_O5UNXNC0XfeJc9f2yY9wFGwt6Z9lsy3ZzC3zVZG9nEBY3VSxAjQDbJTskA9SbvxMmccS4tJ0FXjFy5P-QwA9_OfnI32sYHhp6qyXow15a12zwohjworWAYXAPtcptK3_rIBLDs-qxKNaTvt7Hm8VrKuXOYVmbYJsp3QeEydNdjFeou2ZIyaqmYn7U3DTvqbFMHn5g95Tk4y_XpQ3LRbXMMglyBPHxKWliUL64ws5Tg3uIlnOy5VCr4_d2fdUa4DSHO1K6sU_GCVvTemaAokGz5HCgDQLqAaPldUt_48yRuQqA3TPFdV271oEbZPJ70vRzvc3--VZICSy2vC0Z-UpkoES3AT2L2GRM3_1WqCQfK17_NmQt9dTf1nU5ZLrlyJwY4J5F5fOYTmMMO90FEluwBqV9JJJlOrMn5_KyA7ioakrB38pVyum5TLy5dU8urdx1m6oUC6w3MNawde50omJY6chukx7PQNUwAf0HyQX5X-tv4CcRPXObu3pC-cg_wqybEZERIOkSQlwhj4i_hbwiBKNGQ4G18hl1RCIYfW4gMOFMgbEz_sjEPBM9uni0dInfXLKFyPlzgouBJOY0yJdz2QFvFmExBYFYalf6Ld2PiLOz1EtdZ3mZG7er5CDcpj0-KY1mRcHawT7h-7GZJIr04");
  xhr.setRequestHeader("Content-Type", "multipart/form-data");

  xhr.send(data);
  }
  updateUser = (user) => {
        this.setState({ user: user })
     }
message=()=>{
  console.log("naveen");
// const [selectedValue, setSelectedValue] = useState("java");
  return(
    <View style={{height:'100%',top:'50%'}}>
    <Picker selectedValue = {this.state.user} onValueChange = {this.updateUser}>
               <Picker.Item label = "Steve" value = "steve" />
               <Picker.Item label = "Ellen" value = "ellen" />
               <Picker.Item label = "Maria" value = "maria" />
            </Picker>
            <Text style = {styles.text}>{this.state.user}</Text>

        </View>
      );
}
  render() {
    const {tvf }=this.state;

    return (
      Alert.alert(
      <View>

            <Text>"hey"</Text>
         </View>)
    )
  }
}


const styles = StyleSheet.create({
  container: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 15
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  text: {
    fontSize: 18
  },
  headerFooterContainer: {
    padding: 10,
    alignItems: 'center'
  },
  clearButton: { backgroundColor: 'grey', borderRadius: 5, marginRight: 10, padding: 5 },
  optionContainer: {
    padding: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1
  },
  optionInnerContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  box: {
    width: 20,
    height: 20,
    marginRight: 10
  }
})
