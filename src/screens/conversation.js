import React from 'react';
import { View, Text } from 'react-native'
import { IconButton, UserCard } from '../components';

class ConversationScreen extends React.Component {

    render() {
        return (<View style={{
            flex: 1,
            justifyContent: 'center', alignItems: 'center',
            backgroundColor: '#f4f4f4'

        }} >
            <Text>ConversationScreen # TODO</Text>
            <IconButton
                onPress={() => this.props.navigation.navigate('Userlist')}
                name={"add"} size={50} iconStyle={{ color: 'blue' }} />

            <UserCard onPress={(username) => this.props.navigation.navigate('Chat', { username })}
                username={'Ali'} />
            <UserCard onPress={(username) => this.props.navigation.navigate('Chat', { username })}
                username={'At'} />
            <UserCard onPress={(username) => this.props.navigation.navigate('Chat', { username })}
                username={'Muhammet'} />
        </View>);
    }
}

export default ConversationScreen;