import React, { Component } from 'react';
import { AppRegistry, FlatList,
    StyleSheet, Text, View,Alert } from 'react-native';

export default class FlatListBasics extends Component {
  constructor(props) {
    super(props)
    this.state = {

          abc:[],


    };
  }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    };
    //handling onPress action
    getListViewItem = (item) => {
        Alert.alert(item.key);
    }

    render() {
      const context=this;
      const card = {card: {width: '100%', height: '100%'}};
      var abc = JSON.parse(context.props.navigation.state.params.abc);
      var abc= abc.success.user.monthly_data;
      var date ="";
        for (i = 0; i < abc.length; i++) {
            date += abc[i].on_date;
        };
        var status ="";
          for (i = 0; i < abc.length; i++) {
              status += abc[i].status+'\n';
          };
          var first_punch ="";
            for (i = 0; i < abc.length; i++) {
                first_punch += abc[i].first_punch.split().join('')+'\n';
            };
            var last_punch ="";
              for (i = 0; i < abc.length; i++) {
                  last_punch += abc[i].last_punch.split().join('')+'\n';
              };
      // console.log(date);
        return (
            <View style={styles.container}>
                <FlatList
                    data={ date+'\n'
                    }
                    renderItem={({item}) =>
                        <Text style={styles.item} onPress={this.getListViewItem.bind(this, item)}>{date}</Text>

                      }
                    ItemSeparatorComponent={this.renderSeparator}
                />
                <FlatList
                    data={ date
                    }
                    renderItem={({item}) =>
                        <Text style={styles.item} onPress={this.getListViewItem.bind(this, item)}>{status}</Text>

                      }
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})


AppRegistry.registerComponent('AwesomeProject', () => FlatListBasics);
