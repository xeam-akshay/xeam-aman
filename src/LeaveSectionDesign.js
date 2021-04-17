 import React, {Component} from 'react';
 import {

   AsyncStorage,
   StyleSheet,
   Text,
   KeyboardAvoidingView,
   TouchableOpacity,
   View,
   Image,
   Dimensions,
   ActivityIndicator,
   Alert,
   Picker,
    ScrollView
 } from 'react-native';
 import {getWidthnHeight, getMarginVertical} from './KulbirComponents/common';

 const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
 export default class LeaveSectionDesign extends Component {

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
                 leaves:[],
                 message:[],
                 msg:[]

               }
          }
  conditional=(t)=>{

    if(t=="Approved"){
      return "Approved"
    }if(t=="In-Progress"){
      return "In-Progress"
    }if(t=="Rejected"){
      return "Rejected"
    }if(t=="Cancelled"){
      return "Cancelled"
    }
  }
     render (){
          const Options= [{Status:'Approved'},{Status:'In-Progress'},{Status:'Rejected'},{Status:'Cancelled'}]
          const Option_sec= [{state:'Approved'},{state:'In-Progress'},{state:'Rejected'},{state:'Cancelled'}]
 		return(

       <View style={[{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',borderColor: 'black', borderWidth: 0}, getWidthnHeight(95, 5), getMarginVertical(2)]}>
       {Options.map((item) => {
       return (
         <View style={{alignItems: 'center'}}>
         <View>
         <Text style={[
           (this.conditional(item.Status)=="Approved")?styles.Approve:styles.data_trd,
           (this.conditional(item.Status)=="In-Progress")?styles.In_Progress:styles.data_trd,
           (this.conditional(item.Status)=="Rejected")?styles.Rejected:styles.data_trd,
           (this.conditional(item.Status)=="Cancelled")?styles.Cancelled:styles.data_trd,

       ]}> {item.Status.substring(0,1)}</Text>
         </View>
         <View style={{bottom:'0%',left:'0%'}}>
         <Text>{item.Status} </Text>
         </View>
         </View>
       )})}
     {
     //   <Text style={{left:'12%',bottom:'12%',backgroundColor:'#78b341',borderRadius:10,height:20,width:20,color:'white',fontSize:15}}>  A</Text>
     // <Text style={{left:'18%',bottom:'15%',fontSize:12}}>-Approved</Text>
     //
     // <Text style={{left:'33%',bottom:'17.5%',backgroundColor:'#cc6600',borderRadius:10,height:20,width:20,color:'white',fontSize:15}}>  I </Text>
     // <Text style={{left:'38%',bottom:'20.5%',fontSize:12}}>-In-Progress</Text>
     // <Text style={{left:'55%',bottom:'23%',backgroundColor:'#c11418',borderRadius:10,height:20,width:20,color:'white',fontSize:15}}>  R</Text>
     // <Text style={{left:'60%',bottom:'26%',fontSize:12}}>-Rejected</Text>
     // <Text style={{left:'74%',bottom:'29%',backgroundColor:'#adadad',borderRadius:10,height:20,width:20,color:'white',fontSize:15}}>  C</Text>
     // <Text style={{left:'80%',bottom:'32%',fontSize:12}}>-Cancel</Text>
   }
         </View>
       );
     }
   }

   const styles = StyleSheet.create({
     Approve:{ backgroundColor:'#78b341',borderRadius:10,height:20,width:20,color:'white',fontSize:14,overflow: "hidden",},
     In_Progress:{ backgroundColor:'#cc6600',borderRadius:10,height:20,width:20,color:'white',fontSize:14,overflow: "hidden"},
     Rejected:{ backgroundColor:'#c11418',borderRadius:10,height:20,width:20,color:'white',fontSize:14,overflow: "hidden"},
     Cancelled:{ backgroundColor:'#adadad',borderRadius:10,height:20,width:20,color:'white',fontSize:14,overflow: "hidden"},

     Approved_Deflt:{backgroundColor:'black',borderRadius:12,height:50,width:50,color:'white',overflow: "hidden"},
     Approved:{

       width:'50%',
       backgroundColor:'#ffffff',
       borderRadius: 10,
       borderTopWidth: 1.5,
       borderBottomWidth:1.5,
       borderRightWidth:1.5,
       borderLeftWidth:1.5,
       borderColor: 'red',
     },
     pagecomponent_sec: {
                       flex:0.4,
                       bottom:20,
                       marginTop:0,
                        marginLeft:15,
                       justifyContent: 'center',
                       alignItems: 'center',
                       backgroundColor:'white',
                       borderRadius: 10,
                       borderTopWidth: 1.5,
                       borderBottomWidth:1.5,
                       borderRightWidth:1.5,
                       borderLeftWidth:1.5,
                       borderColor: 'transparent',
                       width:viewportWidth/1.1,
                         height: '10%',
                       // shadowOffset:{  width: 100,  height: 100,  },
                       shadowColor: '#330000',
                       shadowOpacity: 0,
                       // shadowRadius: 0,
                       elevation: 5,
     },
     pagecomponent_thrd: {
                       flex:2.5,
                       bottom:10,
                       marginTop:0,
                       marginLeft:5,
                       justifyContent: 'center',
                       alignItems: 'center',
                       backgroundColor:'#ffffff',
                       borderRadius: 10,
                       borderTopWidth: 1.5,
                       borderBottomWidth:1.5,
                       borderRightWidth:1.5,
                       borderLeftWidth:1.5,
                       borderColor: 'transparent',
                       width:viewportWidth/1.03,

                       // shadowOffset:{  width: 100,  height: 100,  },
                       shadowColor: '#330000',
                       shadowOpacity: 0,
                       // shadowRadius: 0,
                       elevation: 5,
     },
     card_view: {
                   marginBottom:0,
                   top:5,
                   left:'30%',
                   justifyContent: 'center',
                   alignItems: 'center',
                   borderBottomEndRadius: 0,

                   backgroundColor:'#3280e4',
                   width:'40%',
                   height: '7%',
                   // shadowOffset:{  width: 100,  height: 100,  },
                   // shadowColor: '#330000',
                   shadowOpacity: 0,
                   // shadowRadius: 0,

     },
     button: {
               width:'100%',
               color: '#DCE4EF',
               marginLeft:0,
               marginBottom: 0,
               paddingTop:0,
               paddingBottom:0,
               paddingLeft:0,
               paddingRight:0,
               backgroundColor:'rgb(19,111,232)',
               borderRadius:10,
               borderWidth: 1,
               borderColor: 'transparent',
               elevation: 0,
             },
     scroll: {
               margin:10,
               width:'70%',
               backgroundColor:'#ffffff',
               borderRadius: 10,
               borderTopWidth: 1.5,
               borderBottomWidth:1.5,
               borderRightWidth:1.5,
               borderLeftWidth:1.5,
               borderColor: 'green',
             },
     date_component: {


     },

   });
