import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import firebase from '../firebase';
import { connect } from "react-redux";

class ChatScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.data.username,
        };
    };

    state = {
        chat_id: this.props.navigation.state.params.data.chat_id
    }


    async onSend(msg) {
        const { navigation, user_uid, from_username } = this.props;
        const { uid, username } = navigation.state.params.data
        console.warn(uid)
        const chat_id = await firebase.send_message(user_uid, from_username, uid, username, msg, this.state.chat_id)
        if (chat_id) {
            this.setState({ chat_id })
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


export default connect(mapStateToProps, {})(ChatScreen);