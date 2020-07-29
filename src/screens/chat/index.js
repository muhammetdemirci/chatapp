import React from 'react';
import {
    SafeAreaView, KeyboardAvoidingView, TextInput,
    ScrollView, View, Text, Platform
} from 'react-native';
import { IconButton } from "../../components";
import firebase from '../../firebase';
import { connect } from "react-redux";
import * as MessageCard from "./messageCard";

class ChatScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.data.username,
        };
    };

    state = {
        chat_id: this.props.navigation.state.params.data.chat_id,
        messages: [],
    }

    componentDidMount() {
        try {
            firebase.ref.child(this.state.chat_id).on("value", snapshot => {
                var data = [];
                // const json = snap.toJSON()
                snapshot.forEach(ss => {
                    data.push({
                        date: ss.val().date,
                        from_username: ss.val().from_username,
                        message: ss.val().msg
                    })
                });
                this.setState({ messages: data })
            })
        } catch (error) {

        }

    }



    componentWillUnmount() {
        firebase.ref.child(this.state.chat_id).off()
    }


    async onSend(msg) {
        const { navigation, user_uid, from_username } = this.props;
        const { uid, username } = navigation.state.params.data
        const chat_id = await firebase.send_message(user_uid, from_username, uid, username, msg, this.state.chat_id)
        if (chat_id) {
            this.setState({ chat_id })
        }
        this.setState({ message: '' })
    }

    render() {
        console.warn('messages', this.state.messages)
        return (<SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: '#f4f4f4' }}
                behavior="padding"
                enabled
                keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
            >
                <ScrollView
                    ref={ref => { this.scrollView = ref }}
                    onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}
                    style={{ flex: 1 }}>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        {this.state.messages.map((message, index) => (
                            <MessageCard.Text key={index} message={message} />
                        ))}
                    </View>
                </ScrollView>

                <TextInput
                    autoCorrect={false}
                    returnKeyType={'send'}
                    onChangeText={(message) => this.setState({ message })}
                    onSubmitEditing={() => this.onSend(this.state.message)}
                    value={this.state.message}
                    style={{
                        height: 50, width: '100%',
                        backgroundColor: '#fff',
                        // marginBottom: 70,
                        paddingLeft: 10, justifySelf: 'flex-end', color: 'black'
                    }} placeholder={'Enter text here'} />
            </KeyboardAvoidingView>
        </SafeAreaView>);
    }
}

function mapStateToProps(state) {
    return {
        user_uid: state.auth.user_uid,
        from_username: state.auth.username,
    }
}


export default connect(mapStateToProps, {})(ChatScreen);