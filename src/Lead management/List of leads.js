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
import ActionModal from 'react-native-modal';
import {withNavigation} from 'react-navigation';
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import { SegmentedControls } from 'react-native-radio-buttons'
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
import PopupMenu from '../Components/Popup Component'
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {CommonModal, IOS_StatusBar, getWidthnHeight, LeadInfoModal} from '../KulbirComponents/common';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const MD_ID = '13';
class Lead_List extends Component {

  
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
        userId:'',
        employeeFullname:'',
        NextPage:'',
        lead_status:'3',
        lead_type:'all',
        canUnassigned:'',
        canApprove:'',
        hodId:'',
        leadListId:'',
        contentOffsetY: '',
        contentOffsetZ: 2678,
        contentOffsetA: 4198,
        contentOffsetB: 5718,
        contentOffsetC: 7238,
        baseURL: null,
        errorCode: null,
        apiCode: null,
        commonModal: false,
        apiLink: null,
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
      const {navigation} = this.props;
      this._unsubscribe = navigation.addListener("didFocus", async() => {
        await this.initialize();
      })
    }

    async initialize(){
      await this.extractLink();
      await this.MDuserID().done();
      //await this.Lead_list().done();
    }

    async extractLink(){
      await extractBaseURL().then((baseURL) => {
      this.setState({baseURL}, () => console.log("EXTRACT LINK: ", this.state.baseURL))
      })
    }
  
    UNSAFE_componentWillUnmount(){
      this._unsubscribe().remove();
    }

    MDuserID=async()=>{
        var user_token= await AsyncStorage.getItem('user_token');
        var permissions_fir= JSON.parse(user_token);
        var user_id=permissions_fir.success.user.id;
        this.setState({user_id:user_id}, () => {
          if(this.state.user_id){
            this.Lead_list().done();
          }
        });
    }


    unassign_user=async()=>{
        const {baseURL} = this.state;
        const context=this;
        this.showLoader();
        const _this = this;
        var user_token= await AsyncStorage.getItem('user_token');
        var permissions_fir= JSON.parse(user_token);
        var permissions_four=permissions_fir.success.secret_token;
        // var user_id=permissions_fir.success.user.id;
        // this.setState({user_id:user_id})
        var data = new FormData();
        data.append("lead_id", this.state.leadListId);

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
            if(this.readyState !== 4) {
                return;
            }if(xhr.status == 200){
                //console.log(this.responseText);
                _this.hideLoader();
                var json_obj = JSON.parse(xhr.responseText);
                var msg = json_obj.msg;
                Alert.alert(msg);
                _this.Lead_list()
            }else {
                _this.hideLoader();
                _this.enableModal(xhr.status, "077");
            }
        });

        xhr.open("POST", `${baseURL}/unassigned-user`);
        xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);

        xhr.send(data);
    }

    formLink(baseURL){
        const userIDString = String(this.state.user_id)
        switch(userIDString){
            case '13':
                console.log("***MD_ID: ", Boolean(this.state.user_id), this.state.user_id)
                this.setState({apiLink: `${baseURL}/get-list-lead`}, () => console.log("MD's APILINK: ", this.state.apiLink))
              return;
            default:
                console.log("***USER ID: ", Boolean(this.state.user_id), typeof this.state.user_id)
                this.setState({apiLink: `${baseURL}/list-lead`}, () => console.log("USER APILINK: ", this.state.apiLink))
              return;
        }
    }

    Lead_list=async()=>{
        const context=this;
        this.showLoader();
        console.log("Lead_List --- user_id: ",this.state.user_id, this.state.baseURL)
        //const baseValue = (this.state.user_id === 13 ? 'get-list-lead' : 'list-lead')
        await this.formLink(this.state.baseURL);
        console.log("API LINK: ", this.state.apiLink);
        const _this = this;
        var user_token= await AsyncStorage.getItem('user_token');
        var permissions_fir= JSON.parse(user_token);
        var permissions_four=permissions_fir.success.secret_token;
        var user_id=permissions_fir.success.user.id; 
        var employeeFullname=permissions_fir.success.user.employee.fullname;

        this.setState({user_id:user_id}, () => console.log("API 78: ", this.state.user_id))
        this.setState({employeeFullname:employeeFullname})
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
            //console.log("lead list",xhr.responseText)
            
            var json_obj = JSON.parse(xhr.responseText);
            console.log("**kk*lead list", _this.state.lead_status, _this.state.lead_type);
            var NextPage = json_obj.success.leadList.next_page_url;
            var canUnassigned = json_obj.success.canUnassigned;
            _this.setState({canUnassigned:canUnassigned})
            var canApprove = json_obj.success.canApprove;
            _this.setState({canApprove:canApprove})
            var hodId = json_obj.success.hodId;
            _this.setState({hodId:hodId})
            var userId = json_obj.success.userId;
            _this.setState({userId:userId})
            _this.setState({NextPage:NextPage})
            var Lead_list = json_obj.success.leadList.data;
            
            for (let i = 0; i < Lead_list.length; i++) {
              Lead_list[i]["SERIAL_NO"] = i;
            }
            context.setState({Lead_listing:Lead_list});
            
            //console.log("json_obj",Lead_list)
        }
        else{
            //console.log("API LINK: ", `${baseURL}/${baseValue}`)
            console.log("*****ERROR API 78: ", xhr.responseText)
            _this.hideLoader();
            console.log("RESPONSE CODE: ", xhr.status);
            _this.enableModal(xhr.status, "078");
        }
        });
    xhr.open("POST", `${this.state.apiLink}`);
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
            let data = _this.state.Lead_listing;
            var json_obj = JSON.parse(xhr.responseText);
            var NextPage = json_obj.success.leadList.next_page_url;
            _this.setState({NextPage:NextPage})
            var Lead_list = json_obj.success.leadList.data;
            for (let i = 0; i < Lead_list.length; i++) {
              Lead_list[i]["SERIAL_NO"] = i;
            }
            // context.setState({Lead_listing:Lead_list});
            {Lead_list.map((item,key,event) => {
              data.push(item)
            })}
            _this.setState({Lead_listing: data})
            console.log("****API 79 WORKED")
        }else{
            console.log(xhr.responseText)
            _this.hideLoader();
            _this.enableModal(xhr.status, "079");
        }
        });
        xhr.open("POST", `${this.state.NextPage}`);
        xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);
        
        xhr.send(data);
    }


    Lead_list_down_last=async()=>{
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
            
            // context.setState({Lead_listing:Lead_list});
            {Lead_list.map((item,key,event) => {
              _this.state.Lead_listing.push(item)
            })}
            //console.log("json_obj",Lead_list)
        }
        else{
            console.log(xhr.responseText)
            _this.hideLoader();
            _this.enableModal(xhr.status, "080");
        }
        });
        xhr.open("POST", `${baseURL}/list-lead?page=8`);
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
        this.state.contentOffsetY < contentOffset ? this.Lead_list_down() : null
        // this.state.contentOffsetZ == contentOffset ? this.Lead_list_down() : null
        // this.state.contentOffsetA == contentOffset ? this.Lead_list_down() : null
        // this.state.contentOffsetB == contentOffset ? this.Lead_list_down() : null
        // this.state.contentOffsetC == contentOffset ? this.Lead_list_down() : null
        // this.state.contentOffsetZ == contentOffset ? this.Lead_list() : null
        
        console.log("contentOffset",contentOffset ,this.state.contentOffsetY)
    }

render (){
    const {errorCode, apiCode, slideAnimationDialog} = this.state;
    const context=this;
    console.log(this.state.lead_status)
    console.log(this.state.lead_type)
    console.log("this.state.user_id",this.state.user_id)
    if (this.state.user_id === MD_ID){
      var leadStatus = [{value: 'All',type:'all'}, {value: 'New',type:'1'}, {value: 'Open',type:'2'},{value: 'Complete',type:'3' },{value: "Rejected by Hod",type:'4'},{value: "Abandoned",type:'5'}];
    }else{
      var leadStatus = [{value: 'All',type:'all'}, {value: 'New',type:'1'}, {value: 'Open',type:'2'},{value: 'Lead For Recommendation',type:'3' },{value: "Lead For Approval",type:'4'}];
    }
    let leadType = [{value: 'All Leads',type:'all'}, {value: 'Created Leads',type:'created'}, {value: 'Assigned Leads',type:'assigned'},];
    console.log("leadListId",this.state.leadListId)
    const renderItem = ({ item }) => (
      <Item title={item.name_of_prospect} />
    );
    let gradient = ['#0E57CF', '#25A2F9'];
return (
        <View style={{height:viewportHeight,width:viewportWidth,backgroundColor:'#e6e6e6'}}>
            <IOS_StatusBar color={gradient} barStyle="light-content"/>
            {/* <WaveHeader
                wave={Platform.OS ==="ios" ? false : false} 
                //logo={require('../Image/Logo-164.png')}
                menu='white'
                title='List of Leads'
                //version={`Version ${this.state.deviceVersion}`}
            /> */}
                <Header 
                    titleFirstFloor='List Of' 
                    titleGroundFloor='Leads' 
                    onPress={() => Actions.drawerOpen()}
                    source={require('../Image/newManuIcon.png')}
                    style={{width: 35, height: 35, marginLeft: 10,top:0 }}
                />
                <TouchableOpacity style={{ left: '85%',bottom:70 }} onPress={() => Actions.CreateLead({employer: this.props.employer})}>
                    <Image
                        source={require('../Image/icons8-plus-64.png')}
                        style={{ width: 41.5, height: 35,}}
                    />
                </TouchableOpacity>
          
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                
                    <LeadInfoModal 
                        visible={slideAnimationDialog}
                        onBackdropPress={() => this.setState({slideAnimationDialog: false})}
                    />

                    <TouchableOpacity style={{marginVertical: 10}} onPress={() => {this.setState({slideAnimationDialog: true,})}}>
                        <Text style={{color:'#e5314e'}}>Click Here</Text>
                    </TouchableOpacity>

                    <Text>  For Information About Lead List</Text>

                </View>

              <View style={styles.MainContainer}> 
                  <View style={[{alignItems: 'center', justifyContent: 'space-evenly', borderWidth: 0, borderColor: 'black', marginTop: 10}, getWidthnHeight(100, 18)]}>
                      <View style={[{flexDirection: 'row', justifyContent: 'space-around'}, getWidthnHeight(90)]}>
                          <View style={styles.box}>
                              <Dropdown
                                  containerStyle={[{justifyContent: 'center', borderColor: 'grey', borderWidth: 1, paddingLeft: 10, borderRadius: 10}, getWidthnHeight(40, 7)]}
                                  maxLength = {12}
                                  inputContainerStyle={{borderBottomColor:"rgb(19,111,232)",fontSize:hp(2) }}
                                  label={'Lead Type'}
                                  data={leadType}
                                  valueExtractor={({type})=> type}
                                  labelExtractor={({value})=> value}
                                  onChangeText={lead_type => this.setState({ lead_type })}
                                  value={this.state.lead_type}
                                  //  baseColor = '#e5314e'
                                  baseColor = '#e5314e'
                                  //  selectedItemColor='#aaa'
                                  //  textColor='#aaa'
                                  //  itemColor='#aaa'
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
                                onChangeText={lead_status => this.setState({ lead_status })}
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
                          <ScrollView pagingEnabled={false} onScroll={this._onScroll}>
                              {
                              console.log("ITEMS: ", this.state.Lead_listing[0])
                              }
                          {this.state.Lead_listing.map((item,key,event) => {
                              if (item.priority == '0'){
                                var color = '#12bbcf'
                              }else{
                                var color = '#ee282c'
                              }
                              //  console.log("item.lead_executives.id",item.lead_executives.fullname)
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
                                      <Text style={{fontSize:12,width:'77%', marginTop: 5}} numberOfLines = {1}>  {item.name_of_prospect == null ? '--' : item.name_of_prospect } </Text>
                                      <TouchableOpacity style={{marginTop: 5}} onPress={() => {
                                      //context.props.navigation.navigate((this.state.user_id == 13 ? "MDViewLead" : "ViewLead"),{view_lead:item,canApprove:this.state.canApprove,hodId:this.state.hodId,userId:this.state.userId,employeeFullname:this.state.employeeFullname})
                                      Actions[(this.state.user_id === MD_ID) ? "MDViewLead" : "ViewLead"]({view_lead: item, canApprove: this.state.canApprove, hodId: this.state.hodId, userId: this.state.userId, employeeFullname: this.state.employeeFullname, screen: Actions.currentScene});
                                      }}>
                                        <View style={{borderRadius:35,borderColor:'#e5314e',width: 28, height: 27,borderWidth:1,justifyContent:'center',alignItems:'center'}}>
                                            <Image source={require('../Image/redEye.png')} style={{ width: 20, height: 13, }}/>
                                        </View>
                                      </TouchableOpacity>
                                  </View>

                                  <View style={{flexDirection:'row',borderLeftWidth:2,borderLeftColor:color,width:'100%',justifyContent: 'space-evenly', alignItems: 'center'}}>
                                      <View style={{alignItems: 'center',width:'30%',borderWidth:1,borderColor:'#e5314e', justifyContent: 'center'}}>
                                          <Text style={{textAlignVertical: 'center',fontSize:10,color:'black',height:18,paddingLeft:10,paddingRight:10}}>{item.lead_code}</Text>
                                      </View>

                                      <View style={{flexDirection:'row',alignItems:'center',justifyContent: 'flex-end',borderWidth:0,borderLeftColor:color, width:'30%'}}>
                                          <Image source={require('../Image/GrayBuilding.png')} style={{ width: 18, height: 18, }}/>
                                          <Text style={{fontSize:10,color:'#767576'}}>  {item.business_type=='1'?'Goverment':'Corporate'} </Text>
                                      </View>

                                        {this.state.user_id == item.executive_id && ((item.status == '1' ) || (item.status == '2')) ?
                                          <TouchableOpacity style={{width:'30%', alignItems: 'center'}} onPress={() => Actions.LeadEdit({view_lead:item})}>
                                              <View style={{borderRadius:35,borderColor:'#e5314e', height: 27,borderWidth:1,width: 28,justifyContent:'center',alignItems:'center'}}>
                                                  <Image source={require('../Image/redEditLead.png')} style={{ width: 16, height: 12, }}/> 
                                              </View>
                                          </TouchableOpacity>
                                        : 
                                        null
                                        }
                                        {this.state.canUnassigned == true && item.executive_id !== 0 ?
                                          <TouchableOpacity style={{width:'30%', alignItems: 'center'}} onPress={() => this.setState({leadListId:item.id}) || this.unassign_user()}> 
                                              <View style={{borderRadius:35,borderColor:'#e5314e',width: 28, height: 27,borderWidth:1,justifyContent:'center',alignItems:'center'}}>
                                                  <Image source={require('../Image/unassignUser.png')} style={{ width: 11, height: 12, }}/>
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
                                      <Text style={{fontSize:10,color:'#e5314e',width:'44%'}}>  {item.lead_executives !== null ? item.lead_executives.fullname : "--"} </Text>
                                      <Text style={{fontSize:18,color:'#767576'}}> | </Text>
                                      <View style={{borderRadius:35,borderColor:'#e5314e',width: 20, height: 19,borderWidth:1,justifyContent:'center',alignItems:'center',backgroundColor:'#e5314e'}}>
                                          <Image source={require('../Image/LeadMStatus.png')} style={{ width: 10, height: 9, }}/>
                                      </View>
                                      <Text style={{fontSize:10,width:'30%'}}>   {item.priority == '0' ? 'Low' : 'High'}</Text>
                                  </View>
                              </View>
                          )})}
                          </ScrollView>:
                          <View style={{justifyContent:'center',alignItems:'center', marginTop: 50}}>
                            <Text style={{color:'gray',fontSize:20}}>No Data Available</Text>
                          </View>
                      }
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
    onPopupEvent = (eventName, index) => {
          if (eventName !== 'itemSelected') return
          if (index === 0) this.onEdit()
          else this.onRemove()
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
      borderColor: 'red',
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
      height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 10,
      justifyContent: 'space-evenly'
  },
  triangle: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderTopWidth: 45,
      borderRightWidth: 45,
      borderBottomWidth: 10,
      borderLeftWidth: 0,
      borderTopColor: 'red',
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent',
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

export default withNavigation(Lead_List);
