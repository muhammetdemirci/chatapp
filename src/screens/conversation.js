import React from 'react';
import { View, Text } from 'react-native'
import { IconButton, UserCard } from '../components';

class ConversationScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Chat App",
            headerLeft: () => (<IconButton
                onPress={() => navigation.navigate('Userlist')}
                name={"add"} size={36} iconStyle={{ color: 'blue' }} />)
        };
    };

    render() {
        return (<View style={{
            flex: 1,
            backgroundColor: '#f4f4f4'

        }} >
            {/* <UserCard onPress={(username) => this.props.navigation.navigate('Chat', { username })}
                username={'Ali'} />
            <UserCard onPress={(username) => this.props.navigation.navigate('Chat', { username })}
                username={'At'} />
            <UserCard onPress={(username) => this.props.navigation.navigate('Chat', { username })}
                username={'Muhammet'} /> */}
        </View>);
    }
}

export default ConversationScreen;