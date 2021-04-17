import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import ActionModal from 'react-native-modal';
import {getWidthnHeight} from './width';

class LeadInfoModal extends Component {
    render(){
        const {visible, onBackdropPress, color = '#E5314E'} = this.props;
        return (
            <>
                <ActionModal 
                    isVisible={visible}
                    style={{justifyContent: 'center', alignItems: 'center'}}
                    onBackdropPress={onBackdropPress}
                >
                  <View style={[{alignItems: 'center', backgroundColor: 'white', borderRadius: 10}, getWidthnHeight(85, 50)]}>
                      <View style={[{backgroundColor: color, justifyContent: 'center'}, getWidthnHeight(85, 7)]}>
                          <Text style={{textAlign: 'center', fontWeight: 'bold', textAlignVertical: 'center', color: 'white'}}>Information</Text>
                      </View>
                      <View style={[getWidthnHeight(80, 20)]}>
                          <Text style={{color: color,paddingTop:20,paddingBottom:10,borderBottomWidth:0.5,borderBottomColor:'gray'}}>LEAD PRIORITY COLORS</Text>
                          <View style={{alignItems: 'center'}}>
                              <View style={[{flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 20}, getWidthnHeight(70)]}>
                                  <View style={{alignItems: 'center'}}>
                                      <View style={{backgroundColor:'#ee282c',height:25,width:25}} />
                                      <Text>Critical</Text>
                                  </View>
                                  <View style={{alignItems: 'center'}}>
                                      <View style={{backgroundColor:'#f57f20',height:25,width:25}} />
                                      <Text>Normal</Text>
                                  </View>
                                  <View style={{alignItems: 'center'}}>
                                      <View style={{backgroundColor:'#3181c4',height:25,width:25}} />
                                      <Text>Low</Text>
                                  </View>
                              </View>
                          </View>
                      </View>
                      <View style={[getWidthnHeight(80, 20)]}>
                          <Text style={{color: color,paddingBottom:10,borderBottomWidth:0.5,borderBottomColor:'gray'}}>ICONS</Text>
                          <View style={{marginTop: 0, justifyContent: 'space-evenly', flex: 1}}>
                              <View style={{flexDirection:'row'}}>
                                  <View style={{borderRadius:35,borderColor:'#e5314e',width: 28, height: 27,borderWidth:1,justifyContent:'center',alignItems:'center'}}>
                                      <Image source={require('../../Image/redEye.png')} style={{ width: 20, height: 13, }}/>
                                  </View>
                                  <Text style={{textAlignVertical: 'center', paddingLeft: 10}}>Click To View The Lead</Text>
                              </View>

                              <View style={{flexDirection:'row'}}>
                                  <View style={{borderRadius:35,borderColor:'#e5314e',width: 28, height: 27,borderWidth:1,justifyContent:'center',alignItems:'center'}}>
                                      <Image source={require('../../Image/redEditLead.png')} style={{ width: 16, height: 12, }}/>
                                  </View>
                                  <Text style={{textAlignVertical: 'center', paddingLeft: 10}}>Click To Edit The Lead</Text>
                              </View>

                              <View style={{flexDirection:'row'}}>
                                  <View style={{borderRadius:35,borderColor:'#e5314e',width: 28, height: 27,borderWidth:1,justifyContent:'center',alignItems:'center'}}>
                                      <Image source={require('../../Image/redUnassign.png')} style={{ width: 11, height: 12, }}/>
                                  </View>
                                  <Text style={{textAlignVertical: 'center', paddingLeft: 10}}>Click To Unassign The Lead</Text>
                              </View>
                          </View>
                      </View>
                </View>
              </ActionModal>
            </>
        );
    }
}

export {LeadInfoModal};