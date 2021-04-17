import React, { Component } from "react";
import { View, DatePickerIOS, StyleSheet, Dimensions, TextInput, TouchableOpacity,Button} from "react-native";
import moment from "moment";
import Modal from "react-native-modal";
// import Button from "../Buttons/"

var minTime  = new Date();
minTime.setHours(9);
minTime.setMinutes(30);
minTime.setMilliseconds(0);

var maxTime = new Date();
maxTime.setHours(22);
maxTime.setMinutes(0);
maxTime.setMilliseconds(0);

export default class DateTimePicker extends Component {
    constructor(props) {
      super(props);
      this.state = {
        chosenDate: new Date(), 
        chosenTime: new Date(), 
        screenWidth: Dimensions.get("screen").width, 
        dateTime: "",
        toggleModal: false
      };
  
      this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
        this.setState({chosenDate: newDate});
    }

    setTime = (time) => {
        this.setState({chosenTime: time});
    }

    changeWidth = () => {
        this.setState({screenWidth: Dimensions.get("screen").width})
    }

    onToggleModal = () => {
      this.setState({toggleModal: !this.state.toggleModal})
    }

    handleSubmit = () => {
      const {chosenDate, chosenTime} = this.state;
      const nextDate = moment(chosenDate).format("DD-MM-YYYY");
      const nextTime = moment(chosenTime).format("hh:mm:ss a");
      const dateTime = moment(`${nextDate} ${nextTime}`, "DD-MM-YYYY hh:mm:ss a").format();
      this.setState({dateTime}, () => {
        this.props.getDateTime(dateTime);
        this.onToggleModal();
      });
    }
  
    render() {
      const { screenWidth, toggleModal, dateTime } = this.state;

      return (
        <View style={styles.container} onLayout={this.changeWidth}>
        <TouchableOpacity 
            onPress={this.onToggleModal}
        >
            <TextInput
                style={styles.input}
                pointerEvents="none"
                value={dateTime ? moment(dateTime).format("DD-MM-YYYY hh:mm A") : moment(new Date()).format("DD-MM-YYYY hh:mm A")}
            />
        </TouchableOpacity>
        <Modal
                isVisible={toggleModal}
                animationIn='slideInUp'
                animationInTiming={600}
                animationOutTiming={600}
                animationOut='slideOutDown'
                style={styles.bottomModal}
                avoidKeyboard
                propagateSwipe
            >
                <View style={styles.modalContent}>
                    <View style={{flexDirection: "row"}}>
                      <View style={{width: screenWidth/2}}>
                          <DatePickerIOS
                            date={this.state.chosenDate}
                            onDateChange={this.setDate}
                            mode="date"
                            minimumDate={new Date()}
                          />
                        </View>
                      <View style={{width: screenWidth/2}}>
                        <DatePickerIOS
                          date={this.state.chosenTime}
                          onDateChange={this.setTime}
                          mode="time"
                          minimumDate={minTime}
                          maximumDate={maxTime}
                          minuteInterval={30}
                        />
                      </View>
                    </View>
                    <View style={styles.actions}>
                      <View style={{width: 196, height: 56}}>
                        <Button
                          isActiveOpacity={true}
                          title={"Close"}
                          textColor={"#FFFFFF"}
                          variant={"outlined"}
                          backgroundColor={"#e76161"}
                          borderColor={"#e76161"}
                          onPress={this.onToggleModal}>
                        </Button>
                      </View>
                      <View style={{width: 196, height: 56}}>
                        <Button
                          isActiveOpacity={true}
                          title={"Done"}
                          textColor={"#FFFFFF"}
                          variant={"outlined"}
                          borderColor={"#ad6ef2"}
                          onPress={this.handleSubmit}>
                        </Button>
                      </View>
                    </View>
                </View>
            </Modal>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
    },
    bottomModal: {
      justifyContent: "flex-end",
      margin: 0
    },
    modalContent: {
      backgroundColor: "white",
      paddingBottom: 20,
      paddingTop: 20,
      justifyContent: "center",
      alignItems: "center",
      borderTopLeftRadius: 22,
      borderTopRightRadius: 22,
      borderColor: "rgba(0, 0, 0, 0.1)"
    },
    actions: {
      flexDirection: "row",
      paddingTop: 20
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        height: 44,
        padding: 5
    }
  });