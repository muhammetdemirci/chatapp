import React from 'react';
import { View, Text, TextInput, Dimensions } from 'react-native'
import { Button } from "../components";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { authActions } from "../actions";
import { COLORS } from '../color';

const width = Dimensions.get("window").width

class LoginScreen extends React.Component {
    state = {
        username: '',
        error: false,
    }

    handle_register() {
        const { username } = this.state;
        if (username.length > 2) {
            this.props.register(username)
        }
        else
            this.setState({ error: true })
    }

    render() {
        return (<View style={{
            flex: 1, backgroundColor: '#f4f4f4',
            justifyContent: 'center', alignItems: 'center',
        }} >
            <TextInput
                style={{
                    margin: 8, padding: 12,
                    backgroundColor: COLORS.WHITE,
                    width: width - 24,
                    borderRadius: 6
                }}
                placeholder={'Write your username'}
                onChangeText={(value) => this.setState({ username: value })}
            />
            <Button
                onPress={() => this.handle_register()}
                title={'Register'}
                containerStyle={{
                    backgroundColor: COLORS.BLUE,
                    margin: 8, padding: 8, justifyContent: 'center', alignItems: 'center'
                }}
                titleStyle={{ color: 'white', fontSize: 16 }}
            />
            {
                this.state.error ? <Text> Your username should longer than 2 characters </Text> : null
            }
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