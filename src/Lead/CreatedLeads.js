import React, { Component } from 'react';
import {
  AsyncStorage, StyleSheet, Text,
  TouchableOpacity, View, Image,
  Dimensions, ActivityIndicator,
  Alert, ScrollView, TouchableWithoutFeedback
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/Ionicons'
import EditIcon from 'react-native-vector-icons/Feather';
import Chain from 'react-native-vector-icons/FontAwesome';
import {extractBaseURL} from '../api/BaseURL';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {CommonModal, getWidthnHeight, LeadInfoModal, WaveHeader, RoundButton, getMarginLeft, getMarginHorizontal, getMarginTop} from '../KulbirComponents/common';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const colorBase = '#25A2F9';
const modalColor = '#1079D5';

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
                                  canUnassigned:'',
                                  canApprove:'',
                                  hodId:'',
                                  leadListId:'',
                                  lead_status:'all',
                                  lead_type:'created',
                                  contentOffsetY: 1158,
                                  contentOffsetZ:0,
                                  baseURL: null,
                                  errorCode: null,
                                  apiCode: null,
                                  commonModal: false,
                                  options: false,
                                  optionsKey: null
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

unassign_user=async()=>{
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
data.append("lead_id", this.state.leadListId);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
if(this.readyState !== 4) {
return;
}if(xhr.status == 200){
console.log(this.responseText);
_this.hideLoader();
var json_obj = JSON.parse(xhr.responseText);
var msg = json_obj.msg;
Alert.alert(msg);
_this.Lead_list()
}else{
  _this.enableModal(xhr.status, "070");
}
});

xhr.open("POST", `${baseURL}/unassigned-user`);
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);

xhr.send(data);
}

Lead_list=async()=>{
await this.extractLink();
const {baseURL} = this.state;
const context=this;
this.showLoader();
const _this = this;
var user_token= await AsyncStorage.getItem('user_token');
var permissions_fir= JSON.parse(user_token);
var permissions_four=permissions_fir.success.secret_token;
var user_id=permissions_fir.success.user.id;
this.setState({user_id:user_id, options: false, optionsKey: null})
var data = new FormData();
data.append("lead_status", this.state.lead_status);
data.append("lead_type", this.state.lead_type);
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
  var canUnassigned = json_obj.success.canUnassigned;
  _this.setState({canUnassigned:canUnassigned})
  var canApprove = json_obj.success.canApprove;
  _this.setState({canApprove:canApprove})
  var hodId = json_obj.success.hodId;
  _this.setState({hodId:hodId})
  _this.setState({NextPage:NextPage})
  context.setState({Lead_listing:Lead_list});
  console.log("json_obj",Lead_list)
}
else{
console.log(xhr.responseText)
_this.hideLoader();
_this.enableModal(xhr.status, "071");
}
});
xhr.open("POST", `${baseURL}/list-lead`);
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
  data.append("lead_status", this.state.lead_status);
data.append("lead_type", this.state.lead_type);
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
    context.setState({Lead_listing:Lead_list});
    console.log("json_obj",Lead_list)
  }
  else{
  console.log(xhr.responseText)
  _this.hideLoader();
  _this.enableModal(xhr.status, "072");
  }
  });
  xhr.open("POST", `${baseURL}/list-lead?page=2`);
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
  this.state.contentOffsetY == contentOffset ? this.Lead_list_down() : null
  this.state.contentOffsetZ == contentOffset ? this.Lead_list() : null
  //this.setState({contentOffsetY: contentOffset});
  console.log("contentOffset",contentOffset ,this.state.contentOffsetY)
}

render (){
  const {errorCode, apiCode, slideAnimationDialog} = this.state;
  const context=this;
  console.log(this.state.business_type)
  let leadStatus = [{value: 'All',type:'all'}, {value: 'New',type:'1'}, {value: 'Open',type:'2'},{value: 'Lead For Recommendtion',type:'3' },{value: "Lead For Approval",type:'4'}];
  let leadType = [{value: 'All Leads',type:'all'}, {value: 'Created Leads',type:'created'}, {value: 'Assigned Leads',type:'assigned'},];
  // console.log(this.state.user_id)
  const renderItem = ({ item }) => (
    <Item title={item.name_of_prospect} />
  );

return (
        <View style={{height:viewportHeight,width:viewportWidth,backgroundColor:'#e6e6e6'}}>
            <WaveHeader
                wave={Platform.OS ==="ios" ? false : false} 
                //logo={require('../Image/Logo-164.png')}
                menu='white'
                title='Created Leads'
            />

          <LeadInfoModal 
            visible={slideAnimationDialog}
            onBackdropPress={() => this.setState({slideAnimationDialog: false})}
            color={modalColor}
          />

              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={{marginVertical: 15}} onPress={() => {this.setState({slideAnimationDialog: true})}}>
                  <Text style={{color: colorBase, textAlign: 'center', fontWeight: 'bold', fontFamily: ''}}>Click Here</Text>
                </TouchableOpacity>
                <Text>  For Information About Lead List</Text>
              </View>
              <View style={styles.MainContainer}>
                    <View style={[{alignItems: 'center', justifyContent: 'space-evenly', borderWidth: 0, borderColor: 'red', marginTop: 10}, getWidthnHeight(100, 18)]}>
                      <View style={[{flexDirection: 'row', justifyContent: 'space-around'}, getWidthnHeight(90)]}>
                          <View style={styles.box}>
                              <Dropdown
                                  containerStyle={[{justifyContent: 'center', borderColor: 'grey', borderWidth: 1, paddingLeft: 10, borderRadius: 10}, getWidthnHeight(40, 7)]}
                                  value={this.state.lead_type}
                                  maxLength = {12}
                                  inputContainerStyle={{borderBottomColor:"rgb(19,111,232)",fontSize:hp(2) }}
                                  label={'Lead Type'}
                                  data={leadType}
                                  valueExtractor={({type})=> type}
                                  labelExtractor={({value})=> value}
                                  onChangeText={lead_type => this.setState({ lead_type, options: false, optionsKey: null, Lead_listing: [] }, () => this.Lead_list())}
                                  baseColor = {colorBase}
                                  overlayStyle={[getMarginTop(9.5)]}
                              />
                          </View>

                          <View style={styles.box}>
                              <Dropdown
                                containerStyle={[{justifyContent: 'center', borderColor: 'grey', borderWidth: 1, paddingLeft: 10, borderRadius: 10}, getWidthnHeight(40, 7)]}
                                value={this.state.lead_status}
                                maxLength = {12}
                                inputContainerStyle={{borderBottomColor:"rgb(19,111,232)",fontSize:hp(2) }}
                                label={'Lead Status'}
                                data={leadStatus}
                                valueExtractor={({type})=> type}
                                labelExtractor={({value})=> value}
                                onChangeText={lead_status => this.setState({ lead_status, options: false, optionsKey: null, Lead_listing: [] }, () => this.Lead_list())}
                                baseColor = {colorBase}
                                overlayStyle={[getMarginTop(4.5)]}
                              />
                          </View>
                      </View>
                      <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                          <RoundButton 
                            title="Filter"
                            onPress={()=>this.Lead_list()}
                            gradient={['#0E57CF', '#25A2F9']}
                            style={[getWidthnHeight(30, 5)]}
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
              <ScrollView pagingEnabled={false} onScroll={this._onScroll}>
          {this.state.Lead_listing.map((item,key,event) => {
            console.log("DUE DATE CREATED: ", item, typeof item.priority, typeof item.business_type)
             if (item.priority == 0){             //LOW
               var color = '#3181c4'
             }else if (item.priority == 1){       //NORMAL
               var color = '#f57f20'
             }else if (item.priority == 2){       //CRITICAL
              var color = '#ee282c'
            }
            //const serialNumber = 
            return (
            //   <View>
            //     {item.map((item,key) => {
            // return (
                <View key={key} style={[styles.task_list, getWidthnHeight(90, 13)]}>
                <TouchableWithoutFeedback onPress={() => this.setState({options: false})}>
                <View style={{flexDirection:'row',justifyContent:'space-between',}}>
                <View style={{
                     width: 0,
                     height: 0,
                     backgroundColor: 'transparent',
                     borderStyle: 'solid',
                     borderTopWidth: 40,
                     borderBottomWidth: 0,
                     borderLeftWidth: 0,
                     borderRightWidth: 60,
                     borderTopColor: color,
                     borderBottomColor: 'transparent',
                     borderLeftColor: 'transparent',
                     borderRightColor: 'transparent',
                  }}/>
                  <Text style={{position: 'absolute', color: 'white',width: 50, borderColor: 'red', borderWidth: 0, marginLeft: 10}}>{(key < 9)? `0${key + 1}` : key + 1}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1, borderColor: 'red', borderWidth: 0}}>
                  <Text style={[{fontSize:14, fontWeight: 'bold', borderWidth: 0, borderColor: 'black'}, getWidthnHeight(65), getMarginTop(2)]} numberOfLines = {1}>  {item.name_of_prospect == null ? '--' : item.name_of_prospect } </Text>
                  <TouchableOpacity style={{marginTop: 5}} onPress={() =>this.setState({options: true, optionsKey: key})}>
                    <View style={{borderRadius:35,borderColor:'#e5314e',width: 28, height: 27,borderWidth:0,justifyContent:'center',alignItems:'center'}}>
                      <Image source={require('../Image/blackiconothers.png')} style={{ width: 20, height: 13, transform: [{rotate: '90deg'}]}}/>
                    </View>
                  </TouchableOpacity>
                </View>
                </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => this.setState({options: false})}>
                <View style={[{borderLeftWidth:2,borderLeftColor:color, alignItems: 'center', marginLeft: 10, justifyContent: 'space-between'}, getWidthnHeight(90, 6), getMarginTop(1)]}>
                  <View style={[getWidthnHeight(90)]}>
                    <View style={{flexDirection:'row',borderLeftWidth:0,borderLeftColor:color, alignItems: 'center', marginLeft: 10}}>
                      <View style={{alignItems: 'center',width:'30%',borderWidth:1,borderColor:'#e5314e'}}>
                        <Text style={{fontSize:12,color:'black',height:18,paddingLeft:10,paddingRight:10, textAlignVertical: 'center', fontWeight: 'bold', fontFamily: ''}}>{item.lead_code}</Text>
                      </View>

                      <View style={[{flexDirection:'row',alignItems:'center',borderWidth:0,borderLeftColor:color, width:'30%'}, getMarginLeft(5)]}>
                          <Image source={require('../Image/GrayBuilding.png')} style={{ width: 18, height: 18, }}/>
                          <Text style={{fontSize:12,color:'#767576'}}>  {(item.business_type == 1)?'Goverment':'Corporate'} </Text>
                      </View>
                    </View>
                  </View>

                  <View style={{alignSelf: 'flex-start',borderWidth:0,borderLeftColor:color,paddingLeft:10}}>
                    <View style={{flexDirection:'row',alignItems:'center',borderLeftWidth:0,borderLeftColor:color,paddingLeft:0,justifyContent: 'space-evenly'}}>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{borderRadius:35,borderColor:'#e5314e',width: 20, height: 19,borderWidth:1,justifyContent:'center',alignItems:'center',backgroundColor:'#e5314e'}}>
                          <Image source={require('../Image/LeadMUser.png')} style={{ width: 10, height: 9, }}/>
                        </View>
                        <Text style={{fontSize:12,color:'#e5314e', textAlignVertical: 'center', marginLeft: 5}}> {item.lead_executives !== null ? item.lead_executives.fullname : "--"}</Text>
                      </View>

                      <View style={[getMarginHorizontal(5)]}>
                        <Text style={{fontSize:18,color:'#767576'}}>|</Text>
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        <View style={{borderRadius:35,borderColor:'#e5314e',width: 20, height: 19,borderWidth:1,justifyContent:'center',alignItems:'center',backgroundColor:'#e5314e'}}>
                          <Image source={require('../Image/LeadMStatus.png')} style={{ width: 10, height: 9, }}/>
                        </View>
                        {(item.priority === 0)?
                          <Text style={{fontSize:12, textAlignVertical: 'center', marginLeft: 5}}>Low</Text>
                        :
                          null
                        }
                        {(item.priority === 1)?
                          <Text style={{fontSize:12, textAlignVertical: 'center', marginLeft: 5}}>Normal</Text>
                        :
                          null
                        }
                        {(item.priority === 2)?
                          <Text style={{fontSize:12, textAlignVertical: 'center', marginLeft: 5}}>Critical</Text>
                        :
                          null
                        }
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>

                {/* AVAILABLE OPTIONS */}
                {(this.state.options && this.state.optionsKey === key && item.lead_executives !== null)?
                    <View style={[{backgroundColor: 'transparent', justifyContent: 'center',position: 'absolute', borderWidth: 0, borderColor: 'red'}, getMarginLeft(60), getWidthnHeight(20, 13)]}>
                      <View style={[{backgroundColor: 'white', borderColor: 'grey', borderWidth: 0, elevation: 7, shadowColor: '#000000', alignItems: 'center'}, getWidthnHeight(20, 10)]}>
                        <View style={{alignItems: 'flex-start', justifyContent: 'space-evenly', flex: 1}}>
                          <View>
                            <TouchableOpacity style={{borderBottomWidth: 0, borderBottomColor: 'grey'}} onPress={() => this.setState({options: false, optionsKey: null }, () => Actions.ViewLead({view_lead:item, screen: Actions.currentScene}))}>
                              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                                <Icon name='eye-outline' size={15} style={{marginRight:5}} color='#e5314e'/>
                                <Text style={{fontSize: 12}}>View</Text>
                              </View>
                            </TouchableOpacity>
                          </View>

                          {(this.state.user_id == item.executive_id && ((item.status == '1' ) || (item.status == '2')) || (this.state.canUnassigned == true && item.executive_id !== 0))?
                            <View style={[{borderBottomColor: 'grey', borderBottomWidth: 1}, getWidthnHeight(18)]}/>
                          :
                            null
                          }
                          {this.state.user_id == item.executive_id && ((item.status == '1' ) || (item.status == '2')) ?
                            <View>
                              <TouchableOpacity onPress={() => this.setState({options: false, optionsKey: null }, () => Actions.LeadEdit({view_lead:item}))}>
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                                  {/* {<Image source={require('../Image/redEditLead.png')} style={{ width: 16, height: 12, }}/> } */}
                                  <EditIcon name='edit' size={15} style={{marginRight: 5}} color='#e5314e'/>
                                  <Text style={{fontSize: 12}}>Edit</Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                            :null
                          }

                          {this.state.canUnassigned == true && item.executive_id !== 0 ?
                            <View>
                              <TouchableOpacity onPress={() => this.setState({leadListId:item.id, options: false, optionsKey: null }) || this.unassign_user()}> 
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                                  <Chain name='chain-broken' size={12} style={{marginRight: 5}} color='#e5314e'/>
                                  <Text style={{fontSize: 12}}>Unassign</Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                            :null
                          }
                        </View>
                      </View>
                    </View>
                  :
                    null
                  }
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
    flex: 1,
    alignItems: 'center',
    backgroundColor:'white',
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 50,
        },
        zIndex: 10
      },
      android: {
        elevation: 15,
      }
    }),
    shadowOpacity: 0.3,
    shadowRadius: 40,
    borderColor: 'blue',
    borderWidth: 0
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
    //justifyContent: 'space-around',
    margin:10,
    borderRadius: 0,
    backgroundColor:'white',
    paddingTop:0,
    paddingBottom:0,
    width:'95%',
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 5,
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
