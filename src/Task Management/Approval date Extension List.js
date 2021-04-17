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
import DatePicker from 'react-native-datepicker';
import NameBottomBorder from '../Components/Name bottom border'
import TitleBox from '../Components/title box'
import Header from '../Components/Header'
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
export default class ApprovalDateExtensionList extends Component {

  constructor(props){
  super(props)
  this.state={
                loading: false,
                slideAnimationDialog: false,
                status:'pending',
                mandatory:'0',
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
                errorCode: null,
                apiCode: null,
                commonModal: false,
                buttonPressed: false,
                disable: false,
                commentError: true,
                approvalStatus: null
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
    console.log("BASEURL: ", `${baseURL}/request-task-date-extension/` + this.state.status)
    //this.detailPage();
    console.log(this.state.status)
    const context=this;
    const _this = this;
    this.showLoader();
    var user_token= await AsyncStorage.getItem('user_token');
    var permissions_fir= JSON.parse(user_token);
    var permissions_four=permissions_fir.success.secret_token;
    var name = permissions_fir.success.user.employee.fullname;
    this.setState({name:name})
   
    var data = new FormData();

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
    if (xhr.readyState !== 4) {
        return;
    }
     if(xhr.status===200){
         _this.hideLoader();
         console.log(xhr.responseText);
        var json_obj = JSON.parse(xhr.responseText);
        var Data = json_obj.data;
        context.setState({mandatory:'0'})
        context.setState({Data:Data})
        if(Data !== [] && Data !== null && Data.length !== null && Data.length > 0){
          console.log("***ARRAY CONTAINS DATA***")
          {Data.map((item) => {
            context.setState({title:item.task_name})
            context.setState({assigned_date:item.assigned_date})
            context.setState({required_date:item.required_date})
            context.setState({final_status:item.status})
          })}
        }else{
          console.log("***EMPTY ARRAY***")
          context.setState({mandatory:'1'})
          context.setState({Data:[]})
          Alert.alert("No Records Found")
        }
     }
     else{
        console.log(xhr.responseText);
        context.setState({mandatory:'1'})
        console.log("inside error")
        _this.hideLoader();
        _this.enableModal(xhr.status, "027");
     }
});

xhr.open("GET", `${baseURL}/request-task-date-extension/` + this.state.status);
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
  if(this.readyState !== 4) {
    return;
  }
  if(this.status === 200){
      _this.hideLoader();
      var adf = JSON.parse(xhr.responseText);
      var xyz = adf.success.leave_detail.id;
      console.log("xyz",xyz);
      context.props.navigation.navigate("Approve_leaves_detail_page",{data_sec:xhr.responseText});
      context.props.navigation.navigate("Approve_leaves_detail_page",{xyz:xyz});
  }else {
    _this.enableModal(xhr.status, "028");
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
      if(context.state.modal_status == 1){
      Alert.alert("Task date extension request has been Approved.")
      context.setState({ slideAnimationDialog: false });
      _this.setState({alloted_date: ''})
      _this.setState({comment: ''})
      }
      if(context.state.modal_status == 2){
        Alert.alert("Task date extension request has been Rejected.")
        context.setState({ slideAnimationDialog: false });
        _this.setState({alloted_date: ''})
        _this.setState({comment: ''})
        }
      context.setState({buttonPressed: false, commentError: true})
      context.setState({mandatory:'1'})
      context.setState({Data:[]})
      _this.show_approval_date_extension_list();
    }else{
      _this.hideLoader();
      _this.setState({alloted_date: ''})
      _this.setState({comment: ''})
      _this.setState({buttonPressed: false, commentError: true})
      _this.enableModal(xhr.status, "029");
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

confirmCorporate(){
  this.setState({buttonPressed: true})
  if(this.state.commentError){
    Alert.alert("Please fill the field highlighted in RED")
  }else{
    this.corporate();
  }
}

corporate = () => {
  this.setState({modal_status:'1'})
  this.setState({button_value:1});
  this.approveRejectTaskDateExtension();
};

confirmRejected(){
  this.setState({buttonPressed: true})
  if(this.state.commentError){
    Alert.alert("Please fill the field highlighted in RED")
  }else{
    this.Rejected();
  }
}

Rejected = () => {
  this.setState({modal_status:'2'})
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
          title='Approval Date Extension List'
          //version={`Version ${this.state.deviceVersion}`}
        />
            );
    case "Lehri HO":
      return (
        <WaveHeader
          wave={Platform.OS ==="ios" ? false : false} 
          //logo={require('../Image/Logo-164.png')}
          menu='white'
          title='Approval Date Extension List'
          //version={`Version ${this.state.deviceVersion}`}
        />
            );
    case "Aarti Drugs Ltd":
      return <Header navigation={this.props.navigation} title='Approval Date Extension List' width={[getWidthnHeight(50)]} menu="white" images={false}/>
    default:
      return null;
    }
  }

    render (){
          const {approvalStatus,errorCode,apiCode, slideAnimationDialog, buttonPressed, dateError, commentError}= this.state;
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
          style={{justifyContent: 'flex-end', alignItems: 'center'}}
          avoidKeyboard={true}
          onBackdropPress={() => {
              this.setState({buttonPressed: false, commentError: true, comment: ''}, () => {
                this.setState({slideAnimationDialog: false})
              })
            }
          }
        >
          <View style={[{alignItems: 'center', backgroundColor: 'white', borderRadius: 10}, getWidthnHeight(85, 45)]}>
          
          {(this.state.loading) ?
        <View style={{
                   flex:1,flexDirection:'row',width: '50%', backgroundColor: '#EFEFEF',
                   alignItems: 'center', justifyContent: 'center',
                   position: 'absolute', height:'30%',
                   shadowOffset:{  width: 100,  height: 100,  },
                   shadowColor: '#330000',
                   shadowOpacity: 0,
                   shadowRadius: 5,
                   elevation: 10,
                   left:'25%',
               }}>

        <ActivityIndicator  size="large" color='rgb(19,111,232)' />
                <Text style={{fontSize:15,left:10}}>Loading..</Text>
        </View>
        : null}
          <View style={[{backgroundColor:'#F1F1F1', justifyContent: 'center'}, getWidthnHeight(85, 7)]}>
            <Text style={{textAlign: 'center', fontWeight: 'bold', textAlignVertical: 'center'}}>Take an Action</Text>
          </View>
         
         <View style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center'}}>
          <Text style={{color:'rgb(19,111,232)'}}>{this.state.user_name}</Text>
            <View style={{flexDirection:'column',backgroundColor:'#f1f1f1', borderWidth: 0,width:'100%'}}>
                         <ScrollView style={[{height:40}, getWidthnHeight(75)]}>
                  <Text style={{margin:5,fontSize:12,width:'75%'}}>{this.state.user_remarks}</Text>
                  </ScrollView>
                </View>

                <View style={{flexDirection:'row',justifyContent:'space-between',paddingLeft:0,paddingRight:0}}>
                <View style={{alignItems: 'center'}}>
                  <View style={{alignSelf: 'flex-start', borderColor: 'red', borderWidth: 0}}>
                    <Text style={{fontSize: 10, color: 'rgb(19,111,232)'}}>Previous Date</Text>
                  </View>
                  <DatePicker
                    style={{top:'0%',left:'0%',}}
                    date={this.state.modal_required_date}
                    ref={input => { this.textDate = input }}
                    mode="date"
                    placeholder="Required Date"
                    format="YYYY-MM-DD"
                    minDate="2016-01"
                    maxDate="2022-12"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    disabled='true'
                    onDateChange={(date) => {this.setState({from_date: date})}}
                  />
                </View>

                <View style={{alignItems: 'center'}}>
                  <View style={{alignSelf: 'flex-start'}}>
                    <Text style={{fontSize: 10, color: 'rgb(19,111,232)', textAlign: 'left'}}>Requested Date</Text>
                  </View>
                  <DatePicker
                      style={{borderColor: (buttonPressed && dateError)? 'red' : 'transparent', borderWidth: 1}}
                      date={this.state.alloted_date}
                      ref={input => { this.textDate = input }}
                      mode="date"
                      placeholder="Alloted date"
                      format="YYYY-MM-DD"
                      minDate="2016-01"
                      maxDate="2022-12"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      disabled={this.state.disable}
                      onDateChange={(date) => {this.setState({alloted_date: date})}}
                    />
                </View>
              </View>

            <View style={[getWidthnHeight(75)]}>
             
              <Text>Comment:</Text>
            <TextInput
              style={{ 
                height: 70,
                borderColor: (buttonPressed && commentError)? 'red' : 'rgb(19,111,232)',
                borderWidth: 1,
                fontSize:14 ,
                paddingLeft:10,
                borderRadius:10,
                backgroundColor: (this.state.disable)? '#F7F5F2' : 'white'
                }}
              placeholder={(this.state.disable)? 'Comments are disabled' : 'Your comment here'}
              multiline
              numberOfLines={4}
              editable={(this.state.disable)? false : true}
              maxLength={190}
              onChangeText={comment => {
                this.setState({comment})
                if(comment === ''){
                  this.setState({commentError: true})
                }else{
                  this.setState({commentError: false})
                }
              }}
            />
                 </View>
                {(!this.state.disable)?
                <View style={[{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}, getWidthnHeight(75)]}>
                  <TouchableOpacity style={{
                    backgroundColor:'green',
                    paddingLeft:0,
                    paddingRight:0,
                    paddingTop:5,
                    paddingBottom:5,
                    borderRadius:5,
                    width:'30%'}} onPress={context.confirmCorporate.bind(this)}>
                  <Text style={{color:'white',textAlign:'center'}}>Approve</Text>
                  </TouchableOpacity> 

                  <TouchableOpacity style={{
                    backgroundColor:'red',
                    paddingLeft:0,
                    paddingRight:0,
                    paddingTop:5,
                    paddingBottom:5,
                    borderRadius:5,
                    width:'30%'}} onPress={context.confirmRejected.bind(this)}>
                  <Text style={{color:'white',textAlign:'center'}}>Reject</Text>
                  </TouchableOpacity> 
              </View>
              : null}
              </View>
      
           </View>
        </ActionModal>
     

         <View style={styles.date_component}>
              <Text style={{bottom:'6%',backgroundColor:'white',color:'rgb(19,111,232)'}}>    Search for Particular Status    </Text>
<View style={{flexDirection:'row',top:0}}>
      

<Dropdown
              containerStyle={{width:'80%',left:'0%',bottom:10}}
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
      
        <TitleBox lable='Approval List'/>
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
        
      {this.state.mandatory == 0 ?
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
                <Text style={{fontSize:12,fontWeight:'bold',paddingTop:10,width:'90%',}}>  {item.task_name}</Text>
                
                <TouchableOpacity 
                onPress={() => {
                  if(item.status !== '0'){
                    this.setState({disable: true})
                  }else{
                    this.setState({disable: false})
                  }
                  this.setState({
                    slideAnimationDialog: true,
                    leave_approval_id:item.id,
                    user_name:item.name,
                    user_remarks:item.remarks,
                    modal_required_date:item.due_Date,
                    madal_status:item.status,
                    modal_task_id:item.task_id,
                    modal_id:item.id,
                    alloted_date: item.required_date
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
                <Text style={{margin:5,fontSize:11,color:'gray'}}> Final status  : </Text>
                <Text style={{margin:5,fontSize:11,backgroundColor:statusColor,color:'white',paddingLeft:5,paddingRight:5,borderRadius:5}}>{status}</Text>
                </View>
 
 
                
                </View>
                
                </View>
                
                
            )
    })}
</View>
 :
 <View style={{flexDirection:'row',justifyContent:'center',bottom:'0%',}}>
   <Text style={{color:'gray',fontSize:20}}>No data </Text>
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
