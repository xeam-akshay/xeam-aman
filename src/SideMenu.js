import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

class SideMenu extends Component {
  constructor() {
    super();
    /*Array of the sidebar navigation option with 
    Heading, Subheading and screen to navigate.*/
    //Sreen to navigate can be any screen defined in Drawer Navigator in App.js
    this.options = [
      {
        mainHeading: 'Main Heading 1',
        subOptions: [
          { secondaryHeading: 'First Screen', navigationPath: 'First' },
        ],
      },
      {
        mainHeading: 'Main Heading 2',
        subOptions: [
          { secondaryHeading: 'Second Screen', navigationPath: 'Second' },
          { secondaryHeading: 'Third Screen', navigationPath: 'Third' },
        ],
      },
    ];
  }

  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            {this.options.map((option, key) => (
              <View>
                <Text style={styles.mainHeading}>{option.mainHeading}</Text>
                {option.subOptions.map((item, key) => (
                  <View style={styles.secondaryHeading} key={key}>
                    <Text onPress={this.navigateToScreen(item.navigationPath)}>
                      {item.secondaryHeading}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text>This is my fixed footer</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
  },
  secondaryHeading: {
    padding: 10,
  },
  mainHeading: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: 'lightgrey',
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'lightgrey',
  },
});

export default SideMenu;