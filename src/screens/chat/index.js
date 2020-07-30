import React from 'react';
import {
    SafeAreaView, KeyboardAvoidingView, TextInput,
    ScrollView, View, Platform, Dimensions, Image
} from 'react-native';
import { IconButton } from "../../components";
import firebase from '../../firebase';
import { connect } from "react-redux";
import MessageCard from "./messageCard";
import ImagePicker from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import firebaseApi from '../../firebase';
import { COLORS } from '../../color';

const width = Dimensions.get("window").width

const KEY_LOCATION = 'location'

class ChatScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.data.username,
        };
    };

    state = {
        chat_id: this.props.navigation.state.params.data.chat_id,
        messages: [],
        image: '',
        message: ''
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
                        message: ss.val().msg,
                        image: ss.val().image
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
        const image = this.state.image
        if (msg || image) {
            const { navigation, user_uid, from_username } = this.props;
            const { uid, username } = navigation.state.params.data
            this.setState({ message: '', image: '' })
            const chat_id = await firebase.send_message(user_uid, from_username, uid, username, msg, this.state.chat_id, image)
            if (chat_id) {
                this.setState({ chat_id })
            }
        }
    }

    share_location() {
        Geolocation.getCurrentPosition(
            position => {
                const initialPosition = JSON.stringify(position);
                const { from_username } = this.props;

                firebaseApi.shareLocation(this.state.chat_id, from_username, initialPosition)
                console.warn(initialPosition)
            },
            error => Alert.alert('Error', JSON.stringify(error)),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    handle_choose_image() {
        // More info on all the options is below in the API Reference... just some common use cases shown here
        const options = {
            title: '',
            customButtons: [{ name: KEY_LOCATION, title: 'Share Location' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info in the API Reference)
         */
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                if (response.customButton === KEY_LOCATION) {
                    this.share_location()
                }
            } else {
                // const source = { uri: response.uri };

                // You can also display the image using data:
                const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    image: source,
                });
            }
        });
    }

    render() {
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
                    {this.state.messages.map((message, index) => (
                        <MessageCard key={index} message={message} />
                    ))}
                </ScrollView>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor: 'white'
                }} >
                    {
                        this.state.image ? <Image
                            onLoadEnd={() => this.scrollView.scrollToEnd({ animated: true })}
                            source={this.state.image}
                            // source={{ uri: "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" }}
                            style={{ width: "100%", height: 200, resizeMode: 'contain' }}
                        /> : null
                    }

                </View>

                <View style={{ flexDirection: 'row' }} >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <IconButton
                            onPress={() => this.handle_choose_image()}
                            iconStyle={{ color: COLORS.BLUE }}
                            size={30} name={'add'} />
                    </View>
                    <TextInput
                        autoCorrect={false}
                        returnKeyType={'send'}
                        onChangeText={(message) => this.setState({ message })}
                        onSubmitEditing={() => this.onSend(this.state.message)}
                        value={this.state.message}
                        style={{
                            height: 50, width: width - 100,
                            backgroundColor: '#fff',
                            // marginBottom: 70,
                            paddingLeft: 10, justifySelf: 'flex-end', color: 'black'
                        }} placeholder={'Enter text here'} />
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <IconButton
                            onPress={() => this.onSend(this.state.message)}
                            iconStyle={{ color: COLORS.BLUE }}
                            size={30} name={'send'} />
                    </View>
                </View>
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