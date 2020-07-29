import React from 'react';
import { View } from 'react-native'
import { UserCard } from '../components';

class UserListScreen extends React.Component {

    render() {
        return (<View style={{
            flex: 1,
            backgroundColor: '#f4f4f4'
        }} >
            <UserCard onPress={(username) => this.props.navigation.navigate('Chat', { username })}
                username={'Ali'} />
            <UserCard onPress={(username) => this.props.navigation.navigate('Chat', { username })}
                username={'At'} />
            <UserCard onPress={(username) => this.props.navigation.navigate('Chat', { username })}
                username={'Muhammet'} />
        </View>);
    }
}

export default UserListScreen;