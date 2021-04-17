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
   ScrollView,
   TextInput,
   SafeAreaView
} from 'react-native';
import ActionModal from 'react-native-modal';
import { Dropdown } from 'react-native-material-dropdown';
import Button from 'react-native-button';
import NameBottomBorder from '../Components/Name bottom border';
import TitleBox from '../Components/title box';
import Header from '../Components/Header';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import {extractBaseURL} from '../api/BaseURL';
import {CommonModal, IOS_StatusBar, WaveHeader, getWidthnHeight} from '../KulbirComponents/common';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class RequestedDateExtensionList extends Component {

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
                msg:[],
                xyz:'',
                slideAnimationDialog: false,
                employee:[],
                sender:[],
                name:'',
                status:'pending',
                Month:'',
                Year:'',
                leave_approvals_id:'',
                applied_leave_id:'',
                slideAnimationDialog:'',
                button_value:'0',
                remark:'',
                leave_approval_id:'',
                mandatory:'0',
                leave_approve_status:'',
                reson:'',
                title:'',
                assigned_date:'',
                required_date:'',
                final_status:'',
                Data:[],
                user_name:'',
                user_remarks:'',
                modal_required_date:'',
                alloted_date:'',
                modal_task_id:'',
                modal_status:'',
                modal_id:'',
                comment:'',
                user_comments:'',
                due_Date:'',
                baseURL: null,
                errorCode: null,
                apiCode: null,
                commonModal: false
              }
         }

onDecline(){
  this.setState({commonModal: false})
}

enableModal(status, apiCode){
  this.setState({errorCode: status})
  this.setState({apiCode})
  this.setState({commonModal: true})
}

hideLoader = () => {
    this.setState({ loading: false });
  }

  showLoader = () => {
    this.setState({ loading: true });
  }

  async extractLink(){
    await extractBaseURL().then((baseURL) => {
      this.setState({baseURL}, () => console.log("EXTRACT LINK: ", this.state.baseURL))
    })
  }

show_approval_date_extension_list=async()=>{
    await this.extractLink();  
    const {baseURL} = this.state;
    //this.detailPage();
    console.log(this.state.status)
    const context=this;
    const _this = this;
    this.showLoader();
    var user_token= await AsyncStorage.getItem('user_token');
    var permissions_fir= JSON.parse(user_token);
    var permissions_four=permissions_fir.success.secret_token;
    var name = permissions_fir.success.user.employee.fullname;
    var id = permissions_fir.success.user.id;
    this.setState({name:name})
   
    var data = new FormData();

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
    if (xhr.readyState !== 4) {
        return;
    }
     if(xhr.status === 200){
         _this.hideLoader();
         console.log(xhr.responseText);
        var json_obj = JSON.parse(xhr.responseText);
        var Data = json_obj.data;
        context.setState({Data:Data})
        context.setState({mandatory:'0'})
         {Data.map((item) => {
            context.setState({title:item.task_name})
            context.setState({assigned_date:item.assigned_date})
            context.setState({required_date:item.required_date})
            context.setState({final_status:item.status})
          })}
     }else if(xhr.status === 204){
      _this.hideLoader();
      Alert.alert("No Records Found")
     }
     else{
        console.log(xhr.responseText);
      // Alert.alert("No Data Found");
        context.setState({mandatory:'1'})
        console.log("inside error")
        _this.hideLoader();
        _this.enableModal(xhr.status, "044");
     }
});

xhr.open("GET", `${baseURL}/request-task-date-extension/` +id + '/' + this.state.status);
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);

xhr.send(data);
  }


conditional=(t)=>{

  if(t=="Approved"){
    return "Approved"
  }
  if(t=="Inprogress"){
    return "In-progress"
  }
  if(t=="Rejected"){
    return "Rejected"
  }
  if(t=="Cancelled"){
    return "Cancelled"
  }
}
conditional_next=(t)=>{

  if(t=="Approved"){
    return "Approved"
  }
  if(t=="Inprogress"){
    return "Inprogress"
  }
  if(t=="Rejected"){
    return "Rejected"
  }
  if(t=="Cancelled"){
    return "Cancelled"
  }
}
message=()=>{
  const {message,msg,leaves}=this.state;
     // console.log(leaves)
     // Alert.alert("leaves")


        <View>
        <View style={styles.container}>

          <Button
            title="Slide Animation Dialog"
            onPress={() => {
              this.setState({
                slideAnimationDialog: true,
              });
            }}
          />
        </View>



        <Dialog
          onDismiss={() => {
            this.setState({ slideAnimationDialog: false });
          }}
          onTouchOutside={() => {
            this.setState({ slideAnimationDialog: false });
          }}
          visible={this.state.slideAnimationDialog}
          dialogTitle={<DialogTitle title="Slide Animation Dialog Sample" />}
          dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}>
          <DialogContent>
            <Text>
              Here is an example of slide animation dialog. Please click outside
              to close the the dialog.
            </Text>
          </DialogContent>
        </Dialog>
        </View>



 //console.log(message)
  // Alert.alert({message}

  // )
}
detailPage=async()=>{
  const {baseURL} = this.state;
  console.log("detailpage")
  const {leaves,message,msg,xyz}= this.state;
  console.log(xyz)
  const context=this;
  const _this = this;
  this.showLoader();
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;

 console.log("this.state.applied_leave_id",this.state.applied_leave_id)
 console.log("this.state.leave_approvals_id",this.state.leave_approvals_id)
  var data = new FormData();
data.append("applied_leave_id",this.state.applied_leave_id );
data.append("leave_approval_id", this.state.leave_approvals_id);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState !== 4){
    return;
  } 
  if(this.status === 200){
    _this.hideLoader();
      
      var adf = JSON.parse(xhr.responseText);
    var xyz = adf.success.leave_detail.id;
    console.log("xyz",xyz);
     context.props.navigation.navigate("Approve_leaves_detail_page",{data_sec:xhr.responseText});
     context.props.navigation.navigate("Approve_leaves_detail_page",{xyz:xyz});
  } else {
    _this.enableModal(xhr.status, "045");
  }
});

xhr.open("POST", `${baseURL}/leave-detail`);
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);
xhr.setRequestHeader("Content-Type", "multipart/form-data");
xhr.send(data);
}
approveRejectTaskDateExtension=async()=>{
  const {baseURL} = this.state;
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;
  const _this = this;
  const context=this;
  this.showLoader();
  var data = new FormData();
    data.append("status", this.state.modal_status);
    data.append("task_id", this.state.modal_task_id);
    data.append("allot_date", this.state.alloted_date);
    data.append("comment", this.state.comment);
    data.append("id", this.state.modal_id);
  
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function() {
    if(this.readyState !== 4) {
      return;
      
    }if(xhr.status === 200) {
      _this.hideLoader();
      console.log("200",xhr.responseText)
      if(context.state.leave_approve_status == 0){
      Alert.alert("Leave Approved Successfully")
      context.setState({ slideAnimationDialog: false });
      }
      if(context.state.leave_approve_status == 1){
        Alert.alert("Leave Rejected Successfully")
        context.setState({ slideAnimationDialog: false });
        }
      //context.setState({remark:''})
    }else{
      _this.hideLoader();
     let error=xhr.responseText;
         let error_withOut_validation= error.error;
         let error_with_validation = error.validation_error;
      console.log("else",error)
      //context.setState({remark:''})
      if(error == '{"validation_error":{"remark":["The remark field is required."]}}'){
        Alert.alert("remark : The remark field is required.")
        }else{
          Alert.alert("You cannot approve leave for a previous month's date now.")
        }
        _this.enableModal(xhr.status, "046");
    
  } 
  
  });
  
  xhr.open("POST", `${baseURL}/approve-reject-task-date-extension`);
  xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);
  
  xhr.send(data);
}

xyz(){
  this.show_approval_date_extension_list();
  this.abc();
}
goverment = () => {
  
  this.setState({button_value:0});
  this.approveRejectTaskDateExtension();
  
};
corporate = () => {
  this.setState({leave_approve_status:'0'})
  this.setState({button_value:1});
  this.approveRejectTaskDateExtension();
};
Rejected = () => {
  this.setState({leave_approve_status:'1'})
  this.setState({button_value:2});
  this.approveRejectTaskDateExtension();
};


componentDidMount(){
  
//   this.from_month();
//   this.to_month();
  this.show_approval_date_extension_list();

}
renderScreenHeader(employer){
  switch(employer){
    case "XEAMHO":
      return (
        <WaveHeader
          wave={Platform.OS ==="ios" ? false : false} 
          //logo={require('../Image/Logo-164.png')}
          menu='white'
          title='Requested Date Extension List'
          //version={`Version ${this.state.deviceVersion}`}
        />
            );
    case "Lehri HO":
      return (
        <WaveHeader
          wave={Platform.OS ==="ios" ? false : false} 
          //logo={require('../Image/Logo-164.png')}
          menu='white'
          title='Requested Date Extension List'
          //version={`Version ${this.state.deviceVersion}`}
        />
            );
    case "Aarti Drugs Ltd":
      return <Header navigation={this.props.navigation} title='Requested Date Extension List' width={[getWidthnHeight(50)]} menu="white" images={false}/>
    default:
      return null;
    }
  }

    render (){
          const {leaves,message,msg,xyz,employee,sender,name,from,errorCode, apiCode, slideAnimationDialog}= this.state;
           const context=this;
           let Extension_status = [{name: 'Pending',id:'pending'}, {name: 'Approved',id:'approved'}, {name: 'Rejected',id:'rejected'},];
           let user = this.props.employer;
          console.log("***EMPLOYER: ", user)
          let gradient = null;
          let borderColor = null;
          let searchButton = null;
          if(user === "Aarti Drugs Ltd"){
            searchButton = {backgroundColor: '#F06130'}
            gradient = ['#F03030', '#E1721D']
            borderColor = {borderColor: '#F06130'}
          }else{
            searchButton = {backgroundColor: 'rgb(19,111,232)'}
            gradient = ['#0E57CF', '#25A2F9']
            borderColor = {borderColor: 'rgb(19,111,232)'}
          }
		return(
      <View style={{height:viewportHeight,width:viewportWidth,backgroundColor:'white'}}>
         <IOS_StatusBar color={gradient} barStyle="light-content"/>
            {this.renderScreenHeader(user)}
      <View style={{height:'100%',top:'0%',backgroundColor:'white'}}>
      
        <ActionModal 
          isVisible={slideAnimationDialog}
          style={{justifyContent: 'center', alignItems: 'center'}}
          avoidKeyboard={true}
          onBackdropPress={() => this.setState({slideAnimationDialog: false})}
        >
          <View style={[{alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderBottomLeftRadius: 10, borderBottomRightRadius: 10}, getWidthnHeight(85, 50)]}>
            <View style={[{backgroundColor:'#F1F1F1', justifyContent: 'center'}, getWidthnHeight(85, 7)]}>
              <Text style={{textAlign: 'center', fontWeight: 'bold', textAlignVertical: 'center'}}>Take an Action</Text>
            </View>
          
            {(this.state.loading) ?
            <View style={{
                flex:1,flexDirection:'row',width: '50%', backgroundColor: '#EFEFEF',
                alignItems: 'center', justifyContent: 'center',
                position: 'absolute', height:'50%',
                shadowOffset:{  width: 100,  height: 100,  },
                shadowColor: '#330000',
                shadowOpacity: 0,
                shadowRadius: 5,
                elevation: 10,
                left:'25%',
                top:'100%'
            }}>

            <ActivityIndicator  size="large" color='rgb(19,111,232)' />
                    <Text style={{fontSize:15,left:10}}>Loading..</Text>
            </View>
            : null}
            <View style={[{flex: 1, alignItems: 'center'}, getWidthnHeight(75)]}>
              <View style={{flex: 1, justifyContent: 'space-around'}}>
                <Text style={{color:'rgb(19,111,232)', textAlign: 'center'}}>{this.state.user_name}</Text>
                <View style={[{alignItems:'center'}, getWidthnHeight(undefined, 15)]}>
                  <View style={[{alignItems: 'flex-start'}, getWidthnHeight(75)]}>
                    <Text style={{color:'rgb(19,111,232)', fontSize:12}}>Remarks:</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <ScrollView>
                    <Text style={[{fontSize:12,width:'100%',backgroundColor:'#f1f1f1'}, getWidthnHeight(75)]}>{this.state.user_remarks}</Text>
                    </ScrollView>
                  </View>
                </View>
                <View style={[{alignItems:'center'}, getWidthnHeight(undefined, 15)]}>
                  <View style={[{alignItems: 'flex-start'}, getWidthnHeight(75)]}>
                    <Text style={{color:'rgb(19,111,232)', fontSize:12}}>Comment:</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <ScrollView>
                      <Text style={[{fontSize:12,width:'100%',backgroundColor:'#f1f1f1'}, getWidthnHeight(75)]}>{this.state.user_comments}</Text>
                    </ScrollView>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ActionModal>
     

         <View style={styles.date_component}>
              <Text style={{bottom:'10%',backgroundColor:'white',color:'rgb(19,111,232)'}}>    Search for Particular Status    </Text>
<View style={{flexDirection:'row',top:0}}>
      

<Dropdown
              containerStyle={{width:'80%',left:'0%',bottom:10,paddingLeft:10}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
              data={Extension_status}
              valueExtractor={({id})=> id}
              labelExtractor={({name})=> name}
              label='Status'
              value={this.state.status}
              onChangeText={ status =>{ context.setState({ status }) || this.show_approval_date_extension_list() }}
              
            />
       
          <TouchableOpacity style={{top:20}} onPress={()=>this.show_approval_date_extension_list()}>
          <Image
                          source={require('../Image/search.png')}
                          style={{ width: 35, height: 35, marginLeft: 20,top:0,borderRadius:0 }}
                        />
      </TouchableOpacity>
    </View>
    
      </View>
      
      <View style={{top:'5%',height:'100%',}}>
      
        <TitleBox lable='Requested List'/>
        {(this.state.loading) ?
        <View style={{
                   flex:1,flexDirection:'row',width: '50%', backgroundColor: '#EFEFEF',
                   alignItems: 'center', justifyContent: 'center',
                   position: 'absolute', height:'8%',
                   shadowOffset:{  width: 100,  height: 100,  },
                   shadowColor: '#330000',
                   shadowOpacity: 0,
                   shadowRadius: 5,
                   elevation: 10,
                   left:'25%',
                   top:'28%'
               }}>

        <ActivityIndicator  size="large" color='rgb(19,111,232)' />
                <Text style={{fontSize:15,left:10}}>Loading..</Text>
        </View>
        : null}
           
           <View style={{height: '65%',top:10}} >
             
      <ScrollView >
        
      {this.state.mandatory == '0' ?
     <View>
       
      {this.state.Data.map((item) => {
        
        if(item.status == '0'){
            var status = "Not-Approved"
            var statusColor = 'red'
        }
          if(item.status == '1'){
            var status = "Approved"
            var statusColor = 'green'
        }
       
        if(item.status == '2'){
          var status = "Rejected"
          var statusColor = 'red'
      }

      return (
        
                <View>
                   <View style={ styles.Approved }>
               <View style={{flexDirection:'row',paddingTop:10}}> 
                <Text style={{fontSize:12,fontWeight:'bold',paddingTop:10,width:'90%'}}>  {item.task_name}</Text>
                
                <TouchableOpacity 
                onPress={() => {
                  this.setState({
                    slideAnimationDialog: true,
                    user_name:item.name,
                    user_remarks:item.remarks,
                    user_comments:item.comments,
                    AllotedDate:item.due_Date
                  });
                }}
                style={{top:hp('2%'),right: wp('1%')}}
                >
                <Image source={require('../Image/eye.png')}/>
                </TouchableOpacity>
                

                </View>
                <NameBottomBorder/>
                <View style={{flexDirection:'row',paddingTop:10,paddingBottom:10}}>
                <Text style={{margin:5,fontSize:11,color:'gray'}}>Assigned Date :</Text>
                <Text style={{margin:5,fontSize:11,right:8}}>{item.assigned_date}   |</Text>
                <Text style={{margin:5,fontSize:11,color:'gray',right:15}}> Required Date :</Text>
                <Text style={{margin:5,fontSize:11,right:22}}>{item.required_date}</Text>
                </View>

                <View style={{flexDirection:'row',paddingBottom:10}}>
                <Text style={{margin:5,fontSize:11,color:'gray'}}>  Alloted Date : </Text>
                <Text style={{margin:5,fontSize:11}}>{item.due_Date}   |</Text>
                <Text style={{margin:5,fontSize:11,color:'gray'}}>  Status : </Text>
                <Text style={{margin:5,fontSize:11,backgroundColor:statusColor,color:'white',paddingLeft:5,paddingRight:5,borderRadius:5}}>{status}</Text>
                </View>
 
 
                
                </View>
                
                </View>
                
                
            )
    })}
</View>
 :
 <View style={{flexDirection:'row',justifyContent:'center',bottom:'0%',}}>
   <Text style={{color:'gray',fontSize:20}}>No data</Text>
 </View>
 
 }
    
    </ScrollView>
    </View>
      </View>
        </View>
        <CommonModal 
          title="Something went wrong"
          subtitle= {`Error Code: ${errorCode}${apiCode}`}
          visible={this.state.commonModal}
          onDecline={this.onDecline.bind(this)}
          buttonColor={['#0E57CF', '#25A2F9']}
        />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
   
    Approved:{
      flexDirection:'column',
      
      width:'95%',
      backgroundColor:'white',
      borderRadius: 0,
      borderTopWidth: 1,
      borderBottomWidth:1,
      borderRightWidth:1,
      borderLeftWidth:5.5,
      borderLeftColor: '#85b3d1',
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      borderTopColor: 'transparent',
      margin:10,
      shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.34,
                  shadowRadius: 6.27,
                  elevation: 10,
    },
    
    
    date_component: {
      
      left:'5%',
      top:20,
       flexDirection:'column',
      margin:'0%',
      marginBottom:'0%',
      marginLeft:0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'transparent',
      borderRadius: 10,
      borderTopWidth: 1,
      borderBottomWidth:1,
      borderRightWidth:1,
      borderLeftWidth:1,
      borderColor: 'rgb(19,111,232)',
      width:'90%',
      
      // shadowOffset:{  width: 100,  height: 100,  },
      shadowColor: '#330000',
      shadowOpacity: 0,
      // shadowRadius: 0,
      elevation: 0,

},
   

    
   
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    

  });
