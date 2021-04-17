import * as React from 'react';
import {
    LayoutAnimation,
    StyleSheet,
    View,
    Text,
    ScrollView,
    UIManager,
    TouchableOpacity,
    Platform,
    Image,
    AsyncStorage,
    Alert,
  } from 'react-native';
import {connect} from 'react-redux';
import {ActionConst, Actions} from 'react-native-router-flux'; 
import { ListItem, Avatar } from 'react-native-elements'
import Gradient from 'react-native-linear-gradient';
import moment from "moment";
import TextTicker from 'react-native-text-ticker';
import {extractBaseURL} from './api/BaseURL';
import {getWidthnHeight, CommonModal, IOS_StatusBar} from './KulbirComponents/common';

var CustomAnimation = {
  duration: 800,
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 1.5
  }
}

class ExpandableItemComponent extends React.Component {
    //Custom Component for the Expandable List
    constructor() {
      super();
      this.state = {
        image:'',
        date:'',
        wish:'',
        isExpanded:false,
        currentDate: new Date(),
        markedDate: moment(new Date()).format("YYYY-MM-DD"),
        id: null,
        showSubCategory: false
      };
    }

    UNSAFE_componentWillUpdate(){
      LayoutAnimation.configureNext(CustomAnimation)
    }

    // componentDidUpdate(prevProps){
    //   if(prevProps.selectedID === this.props.selectedID){
    //     this.setState({showSubCategory: false})
    //   }
    // }

    showSubCategory(){
      //console.log("PROPS: ", this.props.selectedID)
      const { selectedID, item, employer } = this.props;
      let displayText = null;
      if(item.id === selectedID){
      const context = this;
      //console.log("SHOW SUB");
      
      displayText = this.props.item.subcategory.map((item, key) => {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
      return(
          <TouchableOpacity
            key={key}
            style={styles.content}
            onPress={() => {
              console.log("***CURRENT SCENE: ", Actions.currentScene, "\n", "ACCESSING: ", item.type)
              if(Actions.currentScene !== item.type){
                Actions[item.type]({employer});
              }else {
                Actions.drawerClose();
              }
              //context.props.navObj.navigate(item.type)
            }
            }>

            <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 10, borderColor: 'black', borderWidth: 0}}>
              <View style={{width: 35}}/>
              <View style={{borderColor: 'black', borderWidth: 0, flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                <View style={[{width: 8, height: 8, backgroundColor: 'transparent', borderColor: `rgb(${(red)}, ${green}, ${blue})`, borderWidth: 2,borderRadius: 8, marginHorizontal: 0},
                  {borderColor: 'black'}
                ]}/>
              </View>
              <View style={{width: 10}}/>
              <Text style={{fontSize: 13, marginBottom: 20}}>{item.val}</Text>
            </View>
          </TouchableOpacity>
        )})
      }
      return displayText;
    }

    render() {
        const context = this;
        //console.log("*****USER IMAGE ", this.props)
        const {item, drawerWidth} = this.props;
      return (
        <View>

          {/*Header of the Expandable List Item*/}
          <TouchableOpacity activeOpacity={0.8} onPress={this.props.onClick}>
            <ListItem>
              <Avatar containerStyle={{width: 20, height: 20, marginLeft: 5}} source={this.props.item.image}/>
              <ListItem.Content>
                <ListItem.Title style={[{fontSize: 13, fontWeight: 'bold', borderColor: 'black', borderWidth: 0}, this.props.textColor]}>{this.props.item.category_name}</ListItem.Title>
              </ListItem.Content>
            </ListItem>  
          </TouchableOpacity>

          <View>
              {this.showSubCategory()}
          </View>
          
          <View style={{height: 0.75, backgroundColor: 'rgba(177,174,174, 0.35)'}}/>
        </View>

      );
    }
  }

const menuLayout = getWidthnHeight(undefined, 100);

class ExpandableViewSeparate extends React.Component {
    //Main View defined under this Class
    constructor() {
      super();
      if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
      this.state = {
         listDataSource:[],
         permissions:[],
         abc:[],
         rendum_value:'',
         layoutValue:0,
         h: 0, 
         counter:0,
         emp:'4545345',
         emp_two:'873737388',
         data:[],
         project: null,
         token: null,
         show: 'false',
         baseURL: null,
         dimensions: undefined,
         selectedID: null,
         errorCode: null,
         apiCode: null,
         commonModal: false,
         projectType: null,
         touchCount: 0
        };
    }
   

    updateLayout = async(index, categories) => {
      console.log("PAYLOAD: ", index)
      if(index === categories[index]['id']){
            console.log("Selected: ", categories[index]['category_name'])
            this.setState({selectedID: categories[index]['id']})
      }
    };
   
    permission(){
      if(this.state.permissions==="apply-leave"){
        this.setState({abc:this.state.listDataSource})
      }if(this.state.permissions==="approve-leave"){
        this.setState({abc:this.state.listDataSource_sec})
      }
    }
    value=async()=>{
      console.log("Value function")
      const _this = this;
      await extractBaseURL().then((baseURL) => {
        _this.setState({baseURL}, () => console.log("EXTRACT LINK: ", _this.state.baseURL))
      })
      const {baseURL} = this.state;
      var value = await AsyncStorage.getItem('userObj');
      // var user_token= await AsyncStorage.getItem('user_token');
      // var permissions_fir= JSON.parse(user_token);
      // console.log("*****Base_URL: ", permissions_fir)
      var userObj = JSON.parse(value);
//       var userObj = JSON.parse(value);

      // console.log("userObj",userObj.success.user.employee_code)
      // emp = userObj.success.user.employee_code;
      // this.setState({emp:emp});
      // this.setState({emp_two:emp_two});
      
       if(userObj!==null){
        var tag_value = userObj.success.user;
        console.log("tag_value",tag_value)
      var permission_value = userObj.success.user.permissions;
      var token = userObj.success.secret_token;
      permission_value.map((item) => {
        this.setState({rendum_value:item})
      })
     }else(userObj===null)
      
      if(userObj!==null){
        var profile_picture={uri:userObj.success.user.employee.profile_picture};
        this.setState({image:profile_picture});
        console.log("IMAGE HERE: ", profile_picture, this.state.token)
      }else(userObj===null)
   const context=this;  
  //  var listDataSource = [];
  //  listDataSource.push(SALARYSLIP, HOLIDAYS)
  //   context.setState({listDataSource})
  //   context.setState({show: true})
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState !== 4) {
    console.log("FAILED")
    return;
  } 
  console.log("PASSED")
  if(this.readyState === 4){
    if(this.status === 200){

      //console.log("THIS IS IT: ",xhr.responseText);
      var json_obj = JSON.parse(xhr.responseText);
        
      var listDataSource = json_obj.data;
      if(_this.state.projectType === "Aarti Drugs Ltd"){
        listDataSource.push(HOLIDAYS, SALARYSLIP)
      }else{
        listDataSource.push(CONTENT, TRAVEL)
      }
        {/*KULBIR*/}
      //listDataSource.push(TestScreen)
      //listDataSource.push(SALARYSLIP, HOLIDAYS)
      
      context.setState({listDataSource:listDataSource})
      context.setState({show: true})
    }else {
      console.log('Error: ', xhr.status)
      _this.setState({errorCode: xhr.status})
      _this.setState({apiCode: "001"})
      _this.setState({commonModal: true})
      //Alert.alert("Error Occured");
    }
  }
});

xhr.open("GET", `${baseURL}/side-menu`);
xhr.setRequestHeader("Authorization", `Bearer ${token}`);

xhr.send();
      
    }

    onDecline(){
      this.setState({commonModal: false})
    }
    
    time(){
      var that = this;
      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds
    that.setState({
      //Setting the value of the date time
      date:
        date + '/' + month + '/' + year ,
    });
    }
    wish(){
      var currentHour = moment().format("HH");

      if (currentHour >= 3 && currentHour < 12){
          this.setState({wish:"Good Morning"});
      } else if (currentHour >= 12 && currentHour < 16){
        this.setState({wish:"Good Afternoon"});
      } else if (currentHour >= 16 && currentHour < 20){
        this.setState({wish:"Good Evening"})
      } else if (currentHour >= 20 && currentHour < 3){
        this.setState({wish:"Good Night"});
      } 
    }
    refresh(){
      //  this.dawer().done();
        this.value().done(); 
        this.time();
        this.wish();
        
    }
    componentDidMount(){
          // this.dawer();
        this.setState({selectedID: null})
        const drawerProps = JSON.parse(this.props.drawerProps) 
        this.setState({projectType: drawerProps.success.project})
        this.value().done(); 
        this.time();
        this.wish();
        //setInterval(() => this.wish(), 1000);
        this.setState({show: false})
    }

    // componentDidUpdate(prevProps, prevState){
    //   if(prevProps.code !== this.props.code){
    //     this.setState({selectedID: null}) 
    //     this.value().done(); 
    //     this.time();
    //     this.wish();
    //     this.setState({show: false})
    //   }
    // }

    onLayout = (event) => {
        if(this.state.dimensions){
            return;
        }
        let width = Math.round(event.nativeEvent.layout.width)
        let height = Math.round(event.nativeEvent.layout.height)
        let bubble = event.nativeEvent.layout
        this.setState({dimensions: {width, height}}, () => console.log("DRAWER DIMENSIONS: ", this.state.dimensions))
    }
   
    render() {
      console.log("DISABLE DRAWER: ", this.props.disableDrawer)
      // const extractProps = {...this.props.navigation.state.routes[0]};
      // const unParsedProps = extractProps.routes[0]['params'].drawerProps.userObj;
      const unParsedProps = this.props.drawerProps
      const drawerProps = JSON.parse(unParsedProps)
      const projectName = drawerProps.success.project
      //console.log("CHECKING PROPS: ", projectName, this.props.navigation.navigate);
      const {dimensions, errorCode, apiCode} = this.state;
      let categoryMargin = null;
      let drawerWidth = null;
      let menuHeight = null;
      let refreshButtonSize = null;
      if(dimensions){
          categoryMargin = {marginTop: dimensions.height}
          drawerWidth = {width: dimensions.width}
          menuHeight = {height: (menuLayout.height - categoryMargin.marginTop)}
          refreshButtonSize = {width: drawerWidth.width / 5}
      }
      const value= {image:require('../src/Image/atten.png')}
      const Manager = "apply-leave approve-leave approve-probation create-project view-attendance approve-travel change-attendance create-task assign-til-document create-jrf create-recruitment-task create-interviewer-detail jrf-menu approve-jrf-recruiter-hod approve-travel-claim";
      // console.log(this.state.listDataSource)
      const today = this.state.currentDate;
      const day = moment(today).format("ddd");
      const date = moment(today).format("MMMM D, YYYY");
      const pic=this.state.image;
      let newlistDataSource = [];
    if(this.state.show){
        newlistDataSource = this.state.listDataSource.map(el => (
        el.category_name === "Attendance Management"? {...el, image:require('../src/Image/atten.png')} : el
        &&
        el.category_name === "Leaves Management"? {...el, image:require('../src/Image/leave32.png')} : el
        &&
        el.category_name === "Task Management"? {...el, image:require('../src/Image/task_2.png')} : el
        &&
        el.category_name === "Target"? {...el, image:require('../src/Image/target.png')} : el
        &&
        el.category_name === "Lead Management"? {...el, image:require('../src/Image/lead.png')} : el
        &&
        el.category_name === "Location Tracker"? {...el, image:require('../src/Image/location32.png')} : el
        &&
        el.category_name === "Holidays"? {...el, image:require('../src/Image/tent.png')} : el
        &&
        el.category_name === "Salary Slip"? {...el, image:require('../src/Image/salary.png')} : el
      ))
      const displayCategories = newlistDataSource;
      newlistDataSource = displayCategories.map((category, index) => {
        const id = {id: index};
        return {...category, ...id}
      })
      console.log("DRAWER CONTENT: ", newlistDataSource)
    }
      let background = null;
      let gradient = null;
      let textColor = null;
      let buttonColor = ['#0E57CF', '#25A2F9'];
      let COLOR1 = "#0E57CF";
      let COLOR2 = "#25A2F9";

      if(projectName === "Aarti Drugs Ltd"){
        background = {backgroundColor: '#DF4214'}
        textColor = {color: '#DF4214'}
        gradient = {backgroundColor: '#F06130'}
        buttonColor = ['#F71A1A', '#E1721D']
        COLOR1 = "#F71A1A";
        COLOR2 = "#E1721D";
      }else{
        background = {backgroundColor:'rgb(19,111,232)'}
        textColor = {color: 'rgb(19,111,232)'}
        gradient = {backgroundColor: 'rgb(19,111,232)'}
        buttonColor = ['#0E57CF', '#25A2F9']
        COLOR1 = "#0E57CF";
        COLOR2 = "#25A2F9";
      }
        
      return (
        <View>
            <View onLayout={this.onLayout}>
            <IOS_StatusBar color={[COLOR1, COLOR2]} barStyle="light-content"/>
            <Gradient 
                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                colors={[COLOR1, COLOR2]}
                style={[drawerWidth]}>

                <ListItem containerStyle={{backgroundColor: 'transparent'}}>
                    <Avatar source={pic} containerStyle={{width: 80, height: 80}} avatarStyle={{borderRadius: 80}}/>
                    <ListItem.Content>
                        <ListItem.Title style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>{this.state.wish}</ListItem.Title>
                        <ListItem.Subtitle style={{color: 'white', fontSize: 12}}>{day}, {date}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>

                <View style={[{borderColor: 'black', borderWidth: 0, marginBottom: 5,justifyContent: 'space-evenly',flexDirection: 'row', alignItems: 'center'}, drawerWidth]}>
                    {/* {<TextTicker
                        style={{ fontSize: 12 ,color:'white', marginLeft: 15}}
                        duration={3000}
                        loop
                        bounce
                        repeatSpacer={50}
                        marqueeDelay={1000}>
                        Click Refresh, to reload Drawer Menu
                    </TextTicker>} */}
                    <Text style={{ fontSize: 12 ,color:'white'}}>
                        Click Refresh, to reload Drawer Menu
                    </Text>

                    <View style={[{backgroundColor: '#F1F1F1', borderRadius: 10}, refreshButtonSize]}>
                        <TouchableOpacity onPress={()=>this.refresh()}>
                            <Text style={{fontSize: 12, textAlign: 'center', marginLeft: 0}}>Refresh</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </Gradient>
            </View>

            {/* DRAWER MENU */}
            {(!this.props.disableDrawer) ?
            <View style={[{borderColor: 'black', borderBottomWidth: 0}, menuHeight]}>
                <ScrollView>
                <TouchableOpacity onPress={() => {
                  if(Actions.currentScene !== 'First'){
                    Actions.popTo('First');
                  }else {
                    Actions.drawerClose();
                  }
                  }}>
                    <ListItem bottomDivider>
                      <Avatar containerStyle={{width: 20, height: 20, marginLeft: 5}} source={require('../src/Image/home.png')}/>
                      <ListItem.Content>
                        <ListItem.Title style={[{fontSize: 13, fontWeight: 'bold'}, textColor]}>Home</ListItem.Title>
                      </ListItem.Content>
                    </ListItem>
                </TouchableOpacity>

                <View>
                    {newlistDataSource.map((item, key) => (
                      <ExpandableItemComponent
                          key={key}
                          item={item}
                          onClick={this.updateLayout.bind(this, key, newlistDataSource)}
                          textColor={textColor}
                          employer={projectName}
                          selectedID={this.state.selectedID}
                          drawerWidth={drawerWidth}
                          navigation={this.props.navigation}
                      />
                    ))}
                </View>  
                <TouchableOpacity
                    onPress={() => Actions.LogOutPage({user: projectName, button: gradient})}>
                    <ListItem bottomDivider>
                      <Avatar containerStyle={{width: 20, height: 20, marginLeft: 5}} source={require('../src/Image/log_out.png')}/>
                      <ListItem.Content>
                        <ListItem.Title style={[{fontSize: 13, fontWeight: 'bold'}, textColor]}>Log Out</ListItem.Title>
                      </ListItem.Content>
                    </ListItem>
                </TouchableOpacity>
                <Text style={{textAlign: 'center', marginVertical: 5, fontSize: 8}}>Xeam Ventures Pvt. Ltd.</Text>
                </ScrollView>
            </View>
            : null
            }
            <CommonModal 
                title="Something went wrong"
                subtitle= {`Error Code: ${errorCode}${apiCode}`}
                visible={this.state.commonModal}
                onDecline={this.onDecline.bind(this)}
                buttonColor={buttonColor}
            />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 0,
    },
    topHeading: {
      paddingLeft: 10,
      fontSize: 20,
    },
    header: {

      padding: 0,
    },
    headerText: {
      fontSize: 13,
      fontWeight: 'bold',
      color:'rgb(19,111,232)',
    },
    separator: {
      height: 0.5,
      backgroundColor: '#808080',
      width: '95%',
      marginLeft: 16,
      marginRight: 16,
    },
    text: {
      fontSize: 13,
      color: 'black',
      padding: 5,
    },
    content: {

      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: '#fff',
    },
  });

  const mapStateToProps = (state) => {
    //console.log("***Drawer***MAP STATE TO PROPS: ", state.enableDrawer.drawer, state.props)
    return {
      disableDrawer: state.enableDrawer.drawer,
      drawerProps: state.props.userObj
    }
  }

  export default connect(mapStateToProps)(ExpandableViewSeparate);

  //Dummy content to show
  //You can also use dynamic data by calling webservice
  const CONTENT = 
    {
      isExpanded: false,
      category_name: ' Lead Management',
      image:require('../src/Image/lead.png'),
      subcategory: [{ id: 1, val: 'Create New Lead',type:'CreateNewLead' },{ id: 1, val: 'Created Leads',type:'CreatedLeads' },{ id: 1, val: 'List of lead',type:'List of lead' },{ id: 1, val: 'Assigned Leads',type:'AssignedLeads' },{ id: 1, val: 'Unassigned Leads',type:'UnassignedLeads' },{ id: 1, val: 'Recommended Lead',type:'RecommendedLead' }], 
    }

  
  const TRAVEL = 
    {
      category_name: 'Manage Travel',
      image:require('../src/Image/lead.png'),
      subcategory: [{val: 'Pre Approval Form',type:'Pre_Approval_Form' },{val: 'Travel Approvals',type:'Travel_Approvals' },{val: 'Claim Requests',type:'Claim_Requests' },{val: 'Claim Form',type:'Claim_Form_Travel' },{val: 'View Claim',type:'View_claim'}], 
    }
    // {
    //   isExpanded: false,
    //   category_name: ' Lead Management',
    //   image:require('../src/Image/lead.png'),
    //   subcategory: [{ id: 1, val: 'Create New Lead',type:'CreateNewLead' },{ id: 1, val: 'Create lead',type:'CreateLead' },{ id: 1, val: 'List of lead',type:'List of lead' },{ id: 1, val: 'Created Leads',type:'CreatedLeads' },{ id: 1, val: 'Assigned Leads',type:'AssignedLeads' },{ id: 1, val: 'Unassigned Leads',type:'UnassignedLeads' },{ id: 1, val: 'Recommended Lead',type:'RecommendedLead' }], 
    // }
    
  const HOLIDAYS = {
    category_name: 'Holidays',
    image: require('../src/Image/tent.png'),
    subcategory: [{ permission: "", val: 'Holidays List', type: 'HolidaysList'}],
  }

  const SALARYSLIP = {
    category_name: 'Salary Slip',
    image: require('../src/Image/salary.png'),
    subcategory: [{ permission: "", val: 'Salary Slip', type: 'SalarySlip'}],
  }


  const CONTENT_SEC = {
    isExpanded: false,
    category_name: 'My Targets',
    image: require('../src/Image/target.png'),
    subcategory: [{ permission: "", val: 'Create Target', type: 'CreateTarget'}, { permission: "", val: 'Achieved Target', type: 'AchievedTarget'}, { permission: "", val: 'My Report', type: 'ReportLog'}, { permission: "", val: 'Team Report', type: 'TeamReport'}],
  }

  const LocationTracker = {
    isExpanded: false,
    category_name: 'Location Tracker',
    image: require('../src/Image/location32.png'),
    subcategory: [{ id: 1, val: 'Location Tracker', type: 'LocationTracker'}, { id: 1, val: 'Saved Locations', type: 'SavedLocations'}, { id: 1, val: 'Admin Tracker', type: 'AdminTracker'}],
  }

  const TestScreen = {
    isExpanded: false,
    category_name: 'Test Screen',
    image: require('../src/Image/test.png'),
    subcategory: [{ id: 1, val: 'Test Screen', type: 'TestScreen'}],
  }
