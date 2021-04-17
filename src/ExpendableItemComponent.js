import * as React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
  } from 'react-native';
import moment from "moment";

class ExpandableItemComponent extends React.Component {
    //Custom Component for the Expandable List
    constructor() {
      super();
      this.state = {
        layoutHeight: 0,
        image:'',
        date:'',
        wish:'',
        isExpanded:false,
        currentDate: new Date(),
        markedDate: moment(new Date()).format("YYYY-MM-DD")
      };
    }
   
    // value_sec=async()=>{
      
    //   var value= await AsyncStorage.getItem('userObj');
    //   var userObj = JSON.parse(value);
    //   var permission_value = userObj.success.user.permissions;
    //   {permission_value.map((item) => {
    //     this.setState({rendum_value:item})
    //   })}
    // }

    UNSAFE_componentWillReceiveProps(nextProps) {
      
      if (nextProps.item.isExpanded) {
        this.setState(() => {
          return {
            layoutHeight: null,
          };
        });
      } else {
        this.setState(() => {
          return {
            layoutHeight: 0,
          };
        });
      }
    }
  
    shouldComponentUpdate(nextProps, nextState) {
      // console.log("this.state.nextProps",nextProps)
      // console.log("nextState.nextState",nextState)
      if (this.state.layoutHeight !== nextState.layoutHeight) {
        
        return true;
      }
      if (this.state.rendum_value == nextState.rendum_value) {
        return true;
      }
     
      return false;

    }

    renderBullet() {
      switch(this.props.employer){
        case "Aarti Drugs Ltd":
          return <Image
                    source={require('../src/Image/orange.png')}
                    style={{ width: 15, height: 15, left:'15%',top:'0%' }}/>
        case "XEAMHO":
          return <Image
                    source={require('../src/Image/bluedott.png')}
                    style={{ width: 15, height: 15, left:'15%',top:'0%' }}/>
        default:
          return <Image
                    source={require('../src/Image/bluedott.png')}
                    style={{ width: 15, height: 15, left:'15%',top:'0%' }}/>
      }
    }

    render() {
        const context = this;
        console.log("*****USER IMAGE ", this.props.item)
      return (
        <View>

          {/*Header of the Expandable List Item*/}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this.props.onClickFunction}
            style={styles.header}>
            <Image
              source={this.props.item.image}
              style={{ width: 25, height: 25, left:'0%',top:'0%' }}
            />
           
            <Text style={[styles.headerText, this.props.textColor]}>  {this.props.item.category_name}</Text>
          </TouchableOpacity>

          <View
            style={{
              height: this.state.layoutHeight,
              overflow: 'hidden',
            }}>
            
            {/*Content under the header of the Expandable List Item*/}
            {this.props.item.subcategory.map((item, key) => (
              <TouchableOpacity
                key={key}
                style={styles.content}
                onPress={() =>
                  context.props.navObj.navigate(item.type)
                }>

                {this.renderBullet()}

                <Text style={[styles.text, this.props.textColor]}>
                  {item.val}
                </Text>
                <View style={styles.separator} />
              </TouchableOpacity>
            ))}

          </View>

        </View>

      );
    }
  }

const styles = StyleSheet.create({
    separator: {
        height: 0.5,
        backgroundColor: '#808080',
        width: '95%',
        marginLeft: 16,
        marginRight: 16,
        bottom:'40%'
      },
      text: {
        left:'25%',
        fontSize: 13,
        color: 'rgb(19,111,232)',
        padding: 5,
        bottom:'50%'
      },
      content: {
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
      },
      headerText: {
        fontSize: 13,
        fontWeight: 'bold',
        color:'rgb(19,111,232)',
        bottom:'50%',
        left:'15%',
        margin:'-4%'
      },
})

export default ExpandableItemComponent;