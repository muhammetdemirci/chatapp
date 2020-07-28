import React from 'react';
import { View, Text } from 'react-native'
import { AppNavigator } from './navigator';

class AppScreen extends React.Component {

  render() {
    return (<AppNavigator />);
  }
}

export default AppScreen;