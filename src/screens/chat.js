import React from 'react';
import { View, Text } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import firebase from '../firebase';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { func } from 'prop-types';

class ChatScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.data.username,
        };
    };

    state = {
        key: ''
    }


    async onSend(msg) {
        const { navigation, user_uid, from_username } = this.props;
        const { uid, username } = navigation.state.params.data
        const key = await firebase.send_message(user_uid, from_username, uid, username, msg, this.state.key)
        if (key) {
            this.setState({ key })
        }
    }

    render() {
        return (<GiftedChat
            messages={[]}
            onSend={messages => this.onSend(messages)}
            user={{
                _id: 1,
            }}
        />);
    }
}

function mapStateToProps(state) {
    return {
        user_uid: state.auth.user_uid,
        from_username: state.auth.username,
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);