import React from 'react';
import { View, Text } from 'react-native'
import { Button } from "../components";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { authActions } from "../actions";

class LoginScreen extends React.Component {

    render() {
        return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <Text>LoginScreen # TODO</Text>

            <Button
                onPress={() => this.props.register('username')}
                title={'Register'}
                containerStyle={{
                    backgroundColor: 'blue',
                    margin: 8, padding: 8, justifyContent: 'center', alignItems: 'center'
                }}
                titleStyle={{ color: 'white' }}
            />
        </View>);
    }
}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        register: bindActionCreators(authActions.register, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);