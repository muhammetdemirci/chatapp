import React from 'react';
import { View } from 'react-native'
import { UserCard } from '../components';
import firebaseApi from '../firebase';

class UserListScreen extends React.Component {
    state = {
        users: [],
    }

    componentDidMount() {
        this.fetch();
    }

    async fetch() {
        const res = await firebaseApi.getUsers();
        this.setState({ users: res });
    }

    render() {

        const { users } = this.state;
        console.warn('users', users)
        return (<View style={{
            flex: 1,
            backgroundColor: '#f4f4f4'
        }} >
            {
                this.state.users.map((data) =>
                    <UserCard key={data.uid} onPress={(username) => this.props.navigation.navigate('Chat', { username })}
                        username={data.username} />)
            }
        </View>);
    }
}

export default UserListScreen;