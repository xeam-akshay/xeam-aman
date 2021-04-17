import React, { Component } from 'react';
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
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableNativeFeedback,
  FlatList
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import { SegmentedControls } from 'react-native-radio-buttons'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import { Hoshi } from 'react-native-textinput-effects';
import time from '../Image/menu.png'
import LeftSide from '../Image/side.png';
import DocumentPicker from 'react-native-document-picker';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Header from '../Components/New header'
import RedBox from '../Components/redBox'
import DropdownRedBox from '../Components/dropdownRedBox'
import RadioEnableComponent from '../Components/radioEnableComponent'
import RadioDisableComponent from '../Components/radioDisableComponent'
import NewsPaper from '../Components/NewsPaper';
import DateTime from '../Components/dateNtimeRedbox';
import RedButton from '../Components/normalButton';
import {extractBaseURL} from '../api/BaseURL';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {CommonModal, IOS_StatusBar, getWidthnHeight, getMarginTop} from '../KulbirComponents/common';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class Lead_List extends Component {

      constructor(props){
      super(props)
      this._onScroll = this._onScroll.bind(this)
                    this.state={
                                  employee_code:'',
                                  userPassword:'',
                                  device_id:'',
                                  device_type:'',
                                  loading: false,
                                  name:'',
                                  code:'',
                                  permissions:'',
                                  token:'',
                                  final_data:'',
                                  task_type:'',
                                  my_status:'',
                                  task_status:'',
                                  task:[],
                                  isChecked:false,
                                  checkedDefault: {},
                                  slideAnimationDialog: false,
                                  slideAnimationDialog_sec:false,
                                  task_title:[],
                                  taskoverview_title:'',
                                  taskoverview_due_date:'',
                                  dataToShow_sec:[],
                                  button_value:'',
                                  show: true,
                                  show_sec: true,
                                  singleFileOBJ: '',
                                  model_close:false,
                                  defaultAnimationModal: false,
                                  task_id:'',
                                  status:'',
                                  task_status_comment:'',
                                  priority:'',
                                  due_date:'',
                                  task_title_textinput:'',
                                  update_description:'',
                                  taskoverview_project:'',
                                  taskoverview_id:'',
                                  comment_text:'',
                                  Lead_listing:[],
                                  user_id:'',
                                  lead_type:'all',
                                  contentOffsetY: '',
                                  contentOffsetZ: 2678,
                                  contentOffsetA: 4198,
                                  contentOffsetB: 5718,
                                  contentOffsetC: 7238,
                                  NextPage:'',
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

          componentDidMount(){
            this.Lead_list().done();
          }

          async extractLink(){
            await extractBaseURL().then((baseURL) => {
            this.setState({baseURL}, () => console.log("EXTRACT LINK: ", this.state.baseURL))
            })
          }

Lead_list=async()=>{
await this.extractLink();
const {baseURL} = this.state;
console.log("AFTER")
const context=this;
this.showLoader();
const _this = this;
var user_token= await AsyncStorage.getItem('user_token');
var permissions_fir= JSON.parse(user_token);
var permissions_four=permissions_fir.success.secret_token;
var user_id=permissions_fir.success.user.id;
this.setState({user_id:user_id})
var data = new FormData();
data.append("lead_type", "all");
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.addEventListener("readystatechange", function() {
if (xhr.readyState !== 4) {
  return;
}
if(xhr.status===200){
  _this.hideLoader();
  // console.log("lead list",xhr.responseText)
  var json_obj = JSON.parse(xhr.responseText);
  var NextPage = json_obj.success.leadList.next_page_url;
  var Lead_list = json_obj.success.leadList.data;
  context.setState({Lead_listing:Lead_list});
  _this.setState({NextPage:NextPage})
  console.log("json_obj",Lead_list)
}
else{
console.log(xhr.responseText)
_this.hideLoader();
_this.enableModal(xhr.status, "082");
}
});
xhr.open("POST", `${baseURL}/approve-lead`);
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);

xhr.send(data);

}

Lead_list_down=async()=>{
  const {baseURL} = this.state;
  const context=this;
  this.showLoader();
  const _this = this;
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;
  var user_id=permissions_fir.success.user.id;
  this.setState({user_id:user_id})
  var data = new FormData();
  data.append("lead_status", "all");
  data.append("lead_type", "all");
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.addEventListener("readystatechange", function() {
  if (xhr.readyState !== 4) {
    return;
  }
  if(xhr.status===200){
    _this.hideLoader();
    // console.log("lead list",xhr.responseText)
    var json_obj = JSON.parse(xhr.responseText);
    var Lead_list = json_obj.success.leadList.data;
    var NextPage = json_obj.success.leadList.next_page_url;
  _this.setState({NextPage:NextPage})
    // context.setState({Lead_listing:Lead_list});
    {Lead_list.map((item,key,event) => {
      _this.state.Lead_listing.push(item)
    })}
    console.log("json_obj",Lead_list)
  }
  else{
  console.log(xhr.responseText)
  _this.hideLoader();
  _this.enableModal(xhr.status, "083");
  }
  });
  xhr.open("POST", `${this.state.NextPage}`);
  xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);
  
  xhr.send(data);
  
  }
    
     
handleClose = () => {
this.setState({ model_close: false })
}
taskOverViewComment(){
const context=this;
context.props.navigation.navigate("taskOverViewComment",{id:this.state.taskoverview_id});
this.setState({ slideAnimationDialog: false });
}
taskOverViewUpdate(){
const context=this;
context.props.navigation.navigate("taskOverViewUpdate",{id:this.state.taskoverview_id});
this.setState({ slideAnimationDialog: false });
}
taskOverViewHistory(){
const context=this;
context.props.navigation.navigate("taskOverViewHistory",{id:this.state.taskoverview_id});
this.setState({ slideAnimationDialog: false });
}
onDismiss(){
this.setState({ defaultAnimationDialog: false });
}

_onScroll(e){
  var contentOffset = e.nativeEvent.contentOffset.y;
  this.setState({contentOffsetY: contentOffset});
  this.state.contentOffsetY !== contentOffset ? this.Lead_list_down() : null
  // this.state.contentOffsetZ == contentOffset ? this.Lead_list_down() : null
  // this.state.contentOffsetA == contentOffset ? this.Lead_list_down() : null
  // this.state.contentOffsetB == contentOffset ? this.Lead_list_down() : null
  // this.state.contentOffsetC == contentOffset ? this.Lead_list_down() : null
  // this.state.contentOffsetZ == contentOffset ? this.Lead_list() : null
  
  console.log("contentOffset",contentOffset ,this.state.contentOffsetY)
}

render (){
const {errorCode, apiCode} = this.state;  
const context=this;
console.log(this.state.business_type)
let leadStatus = [{value: 'All',type:'all'}, {value: 'New',type:'1'}, {value: 'Open',type:'2'},{value: 'Lead For Recommendtion',type:'3' },{value: "Lead For Approval",type:'4'}];
let leadType = [{value: 'All Leads',type:'all'}, {value: 'Created Leads',type:'created'}, {value: 'Assigned Leads',type:'assigned'},];
console.log(this.state.leadIndustryOptions_id)
const renderItem = ({ item }) => (
  <Item title={item.name_of_prospect} />
);
let gradient = ['#E5314E', '#E5314E'];
return (
        <View style={{height:viewportHeight,width:viewportWidth,backgroundColor:'#e6e6e6'}}>
          <IOS_StatusBar color={gradient} barStyle="light-content"/>
          <Header titleFirstFloor='Recommended Lead' titleGroundFloor='List' onPress={() => Actions.drawerOpen()} source={require('../Image/newManuIcon.png')}
              style={{width: 35, height: 35, marginLeft: 10,top:0 }}
          />
          <TouchableOpacity style={{ left: '85%',bottom:70 }} onPress={() =>{Actions.CreateLead()}}>
              <Image
                  source={require('../Image/icons8-plus-64.png')}
                  style={{ width: 41.5, height: 35,}}
              />
          </TouchableOpacity>

          <View style={[styles.MainContainer, getMarginTop(2.5)]}> 
              <View style ={[{justifyContent: 'space-between'}, getMarginTop(4), getWidthnHeight(100, 15)]}>
                  <View style={{alignItems:'center',justifyContent:'space-evenly',}}>
                      <View style={styles.box}>
                          <Dropdown
                              containerStyle={[{justifyContent: 'center', borderColor: 'grey', borderWidth: 1, paddingLeft: 10, borderRadius: 10}, getWidthnHeight(80, 7)]}
                              value={this.state.lead_type}
                              inputContainerStyle={{borderBottomColor:"rgb(19,111,232)",fontSize:hp(2) }}
                              label={'Lead Type'}
                              data={leadType}
                              valueExtractor={({type})=> type}
                              labelExtractor={({value})=> value}
                              onChangeText={lead_type => this.setState({ lead_type })}
                              baseColor = '#e5314e'
                          />
                      </View>
                  </View>
                  <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                      <RedButton
                          title={'Filter'}
                          style={{backgroundColor:'#e5314e',width:'35%',}}
                          onPress={()=> {this.Lead_list()}}
                      />
                  </View> 
              </View>
                              {(this.state.loading) ?
                                  <View style={{
                                                  flex:1,flexDirection:'row',width: '45%', backgroundColor: '#EFEFEF',
                                                  alignItems: 'center', justifyContent: 'center',
                                                  position: 'absolute', height:'10%',
                                                  shadowOffset:{  width: 100,  height: 100,  },
                                                  shadowColor: '#330000',
                                                  shadowOpacity: 0,
                                                  shadowRadius: 5,
                                                  elevation: 10,
                                                  left:'25%',
                                                  top:'50%'
                                                    }}>

                                  <ActivityIndicator  size="large" color='#e5314e' />
                                    <Text style={{fontSize:15,left:10}}>Loading..</Text>
                                  </View>
                                    : null}
                                  <View style={{flex: 1}}>
                                  {this.state.Lead_listing.length>0 ?
                                    <ScrollView pagingEnabled={false} onScroll={this._onScroll} style={{marginTop: 20}}>
          {this.state.Lead_listing.map((item,key,event) => {
             if (item.priority == '0'){
               var color = '#12bbcf'
             }else{
               var color = '#ee282c'
             }
            return (
            //   <View>
            //     {item.map((item,key) => {
            // return (
                <View style={styles.task_list}>
                 
                <View style={{flexDirection:'row',justifyContent:'flex-start',}}>
                  <View style={{
                    width: 0,
                    height: 0,
                    backgroundColor: 'transparent',
                    borderStyle: 'solid',
                    borderTopWidth: 40,
                    borderRightWidth: 50,
                    borderBottomWidth: 15,
                    borderLeftWidth: 0,
                    borderTopColor: color,
                    borderRightColor: 'transparent',
                    borderBottomColor: 'transparent',
                    borderLeftColor: 'transparent',
                      
                    }}/>
                  <Text style={{fontSize:15,width:'77%', marginTop: 5}} numberOfLines = {1}>  {item.name_of_prospect == null ? '--' : item.name_of_prospect } </Text>
                  <TouchableOpacity style={{marginTop: 5}} onPress={() => Actions.RecommendedViewLead({view_lead:item, screen: Actions.currentScene})}>
                    <View style={{borderRadius:35,borderColor:'#e5314e',width: 28, height: 27,borderWidth:1,justifyContent:'center',alignItems:'center'}}>
                      <Image source={require('../Image/redEye.png')} style={{ width: 20, height: 13, }}/>
                    </View>
                  </TouchableOpacity>
              </View>

              <View style={{flexDirection:'row',borderLeftWidth:2,borderLeftColor:color,width:'100%',justifyContent: 'space-evenly', alignItems: 'center'}}>
                  <View style={{alignItems: 'center',width:'30%',borderWidth:1,borderColor:'#e5314e'}}>
                    <Text style={{fontSize:10,color:'black',height:18,paddingLeft:10,paddingRight:10, textAlignVertical: 'center'}}>{item.lead_code}</Text>
                  </View>

                  <View style={{flexDirection:'row',alignItems:'center',justifyContent: 'flex-end',borderWidth:0,borderLeftColor:color, width:'30%'}}>
                    <Image source={require('../Image/GrayBuilding.png')} style={{ width: 18, height: 18, }}/>
                    <Text style={{fontSize:10,color:'#767576',width:'80%'}}>  {item.business_type=='1'?'Goverment':'Corporate'} </Text>
                  </View>

                  {this.state.user_id == item.executive_id && ((item.status == '1' ) || (item.status == '2')) ?
                    <TouchableOpacity style={{width:'30%', alignItems: 'center'}} onPress={() =>Actions.LeadEdit({view_lead:item})}>
                      <View style={{borderRadius:35,borderColor:'#e5314e',width: 28, height: 27,borderWidth:1,justifyContent:'center',alignItems:'center'}}>
                        <Image source={require('../Image/redEditLead.png')} style={{ width: 16, height: 12, }}/> 
                      </View>
                    </TouchableOpacity>
                  : 
                    null
                  }
              </View>

                    <View style={{flexDirection:'row',alignItems:'center',borderLeftWidth:2,borderLeftColor:color,paddingLeft:10,width:'99%'}}>
                    <View style={{borderRadius:35,borderColor:'#e5314e',width: 20, height: 19,borderWidth:1,justifyContent:'center',alignItems:'center',backgroundColor:'#e5314e'}}>
                    <Image source={require('../Image/LeadMUser.png')} style={{ width: 10, height: 9, }}/>
                    </View>
                <Text style={{fontSize:10,color:'#e5314e',width:'44%'}}>  Employee : </Text>
                    </View>
                    <View style={{paddingTop:10,flexDirection:'row',alignItems:'center',borderLeftWidth:2,borderLeftColor:color,paddingLeft:10,width:'99%'}}>
                      <View style={{borderWidth:1,borderTopRightRadius:10,borderBottomEndRadius:10,height:30,width:'45%',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                         <Text style={{backgroundColor:'#e5314e',color:'white'}}>To :</Text>
                          <Text>    {item.lead_executives !== null ? item.lead_executives.fullname : "--"}</Text>
                      </View>
                      <View style={{borderWidth:1,borderTopRightRadius:10,borderBottomEndRadius:10,height:30,width:'45%',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                         <Text style={{backgroundColor:'#e5314e',color:'white'}}>By :</Text>
                         <Text>    {item.user_employee !== null ? item.user_employee.fullname : "--"}</Text>
                      </View>
                    </View>


                </View>
                )})}
                 {/* </View>
                  )})}
   */}
                    </ScrollView>:
                    <View style={{marginTop: 50,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'gray',fontSize:20}}>No Data Available</Text>
                    </View>}
                  
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
  MainContainer:{
    backgroundColor:'white',
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
    flex: 1,
    borderWidth: 0,
    borderColor: 'yellow',
    justifyContent: 'space-between',
    alignItems: 'center'
},
  button: {
    width:'90%',
    flexDirection:'row',
    justifyContent:'center',
    marginLeft:15,
    marginRight:5,
    marginBottom: 0,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:0,
    paddingRight:0,
    backgroundColor:'#e5314e',
    borderRadius:1,
    borderWidth: 0,
    // borderColor: 'rgb(19,111,232)',
    elevation: 0,
  },
  container: {
    flex: 0,
    flexDirection:'column',
    left:'0%',
    width:wp('100%'),
    height:hp('90%'),

  },
  image:{
    top:245,
    left: 300,
    bottom:0,
    backgroundColor:'white',
    width: 10,
    height: 14,
  },
  task_list:{
    margin:10,
    borderRadius: 0,
    borderTopWidth: 1.5,
    borderBottomWidth:1.5,
    borderRightWidth:3,
    borderLeftWidth:1.5,
    borderLeftColor:'transparent',
    borderTopColor:'transparent',
    borderBottomColor:'transparent',
    borderRightColor:'transparent',
    backgroundColor:'white',
    paddingTop:0,
    paddingBottom:0,
    width:'95%',
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 0,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
},
box:{
  borderWidth: 0,
  borderColor:'#c4c4c4',
  borderRadius:10,
  left:0,
  height:50,
  width:'90%',
  justifyContent: 'center',
  alignItems: 'center'
},
});
