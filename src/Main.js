import React from 'react';
import { AppNavigator } from './navigator';
import { LoginScreen } from './screens';
import { connect } from "react-redux";

class MainScreen extends React.Component {

  render() {
    if (this.props.is_user_logged_in)
      return (<AppNavigator />);

    return (<LoginScreen />);
  }
}

function mapStateToProps(state) {
  return {
    is_user_logged_in: state.auth.is_user_logged_in
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);